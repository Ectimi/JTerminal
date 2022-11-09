import { createContext, useRef, forwardRef, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  useAsyncEffect,
  useClickAway,
  useDynamicList,
  useEventListener,
  useKeyPress,
  useSafeState,
  useUpdateEffect,
} from "ahooks";
import { Autocomplete, Group } from "@mantine/core";
import {
  bookmarksState,
  viewportComponentListState,
  viewportVisibleState,
} from "@/store";
import uniqBy from "lodash/uniqBy";
import useHistory from "./useHistory";
import { localforage } from "@/lib/localForage";
import { getUsageStr } from "../../core/commands/terminal/help/helpUtils";
import { commandList } from "../../core/commandRegister";
import { commandExecute } from "../../core/commandExecutor";
import { initLocalforage } from "@/lib/localForage";
import TerminalRow from "./TerminalRow";
import Datetime from "../Datetime";
import "./index.less";

type TerminalType = JTerminal.TerminalType;

interface ItemProps {
  name: string;
  description: string;
}

type TMode = "common" | "query";

export interface IBookmarkItem {
  name: string;
  url: string;
  icon: string;
  label: string;
  description: string;
}

const initialList: JTerminal.OutputType[] = [
  {
    type: "text",
    text: "Welcome to JIndex !",
  },
  {
    type: "text",
    text: `Please input 'help' to enjoy`,
  },
  {
    type: "component",
    component: <Datetime />,
  },
  {
    type: "empty",
  },
];

export const TerminalContext = createContext<JTerminal.TerminalType | unknown>(
  {}
);

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ description, name, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <div className="tip-name">{name}</div>
      <div className="tip-desc">{description.replace(name, "")}</div>
    </div>
  )
);

const getInputTips = (word: string, originData: any[], filterKey: string) => {
  const arr = [...originData];
  const priority = [];
  const other: any = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const value = item[filterKey].toLocaleLowerCase();
    if (value === word) {
      priority.push({
        value: value,
        name: value,
        description: item.func ? getUsageStr(item) : item.description,
      });
      arr.splice(i, 1);
      break;
    }
  }
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const value = item[filterKey].toLocaleLowerCase();
    if (value === word || value.slice(0, word.length) === word) {
      other.unshift({
        value: value,
        name: value,
        description: item.func ? getUsageStr(item) : item.description,
      });
    } else if (
      value.startsWith(word[0]) ||
      (value.includes(word) && !other.some((r: any) => r.value === value))
    ) {
      other.push({
        value: value,
        name: value,
        description: item.func ? getUsageStr(item) : item.description,
      });
    }
    arr.splice(i, 1);
    i--;
  }
  return [...priority, ...other];
};

function Terminal() {
  const setViewportVisible = useSetRecoilState(viewportVisibleState);
  const [viewportComponentsList, setViewportComponentsList] = useRecoilState(
    viewportComponentListState
  );
  // const { bookmarks } = useRecoilValue(bookmarksState);
  const [{ bookmarks }, setBookmarkState] = useRecoilState(bookmarksState);
  const ref = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useSafeState<TMode>("common");
  const [alwaysFocus, setAlwayFocus] = useSafeState(true);
  const [inputText, setInputText] = useSafeState("");
  const queryModeActiveKey = "'";

  const {
    list: outputList,
    push: writeOutput,
    replace: rewriteOutput,
    remove: removeOutput,
    resetList,
  } = useDynamicList<JTerminal.OutputType>(initialList);

  const { list: inputList, push: addInputList } =
    useDynamicList<JTerminal.CommandOutputType>([]);

  const { setCommandHistoryPos, showNextCommand, showPrevCommand } = useHistory(
    inputList,
    setInputText
  );

  const [inputTips, setInputTips] = useSafeState<any[]>([]);

  useEventListener("blur", () => alwaysFocus && ref.current?.focus(), {
    target: ref,
  });

  useKeyPress(
    "enter",
    (event: any) => {
      if (inputTips.length === 0) {
        excuteCommand();
      }
    },
    {
      target: ref,
      exactMatch: true,
    }
  );

  useKeyPress("tab", (event: any) => {
    event.preventDefault();
    if (inputTips.length > 0) {
      setInputText(inputTips[0].value);
      setTimeout(() => {
        setInputTips([]);
      }, 0);
    }
  });

  useKeyPress("uparrow", () => {
    if (inputTips.length === 0) {
      showPrevCommand();
    }
  });
  useKeyPress("downarrow", () => {
    if (inputTips.length === 0) {
      showNextCommand();
    }
  });

  useClickAway(() => {
    focusInput();
  }, ref);

  useAsyncEffect(async () => {
    initLocalforage();
  }, []);

  useUpdateEffect(() => {
    const text = inputText.trimStart().replace(/\s+/g, " ").split(" ");
    let word = text[0].toLocaleLowerCase();
    if (word && text.length === 1) {
      if (word.startsWith(queryModeActiveKey)) {
        word = word.split(queryModeActiveKey)[1];
        mode !== "query" && setMode("query");
        if (word) {
          const tips = getInputTips(word, [...bookmarks], "name");
          setInputTips(tips);
        }
      } else {
        mode !== "common" && setMode("common");
        const tips = getInputTips(word, [...commandList], "func");
        setInputTips(tips);
      }
    } else {
      setMode("common");
      setInputTips([]);
    }
  }, [inputText]);

  useUpdateEffect(() => {
    setCommandHistoryPos(inputList.length);
  }, [inputList]);

  useUpdateEffect(() => {
    ref.current?.scrollIntoView();
  }, [outputList]);

  const setState: TerminalType["setState"] = async () => {
    const user_bookmarks: any = (await localforage.getItem("bookmarks")) || [];
    const user_labels: any = (await localforage.getItem("labels")) || [];
    setBookmarkState((cur) => ({
      bookmarks: uniqBy([...user_bookmarks, ...cur.bookmarks],'name'),
      labels: uniqBy([...user_labels, ...cur.labels],'label'),
    }));
  };

  const onInputChange = (value: string) => {
    setInputText(value);
  };

  const focusInput: TerminalType["focusInput"] = () => {
    setAlwayFocus(true);
    ref.current?.focus();
  };

  const unfocusInput: TerminalType["unfocusInput"] = () => setAlwayFocus(false);

  const excuteCommand: TerminalType["excuteCommand"] = async () => {
    const command: JTerminal.CommandOutputType = {
      type: "command",
      text: inputText,
    };

    if (inputText.trim()) {
      addInputList(command);
    }

    writeCommandOutput(inputText);

    if (mode === "query") {
      const name = inputText.trim().split(queryModeActiveKey)[1];
      const bookmarkItem =
        bookmarks!.filter((bookmark) => bookmark.name === name)[0] || {};
      const url = bookmarkItem.url;
      if (url) {
        const commandText = `goto ${url}`;
        await commandExecute(commandText, TerminalProvider);
      } else {
        writeErrorOutput(`名为 ${name} 的书签不存在`);
      }
    } else {
      await commandExecute(inputText, TerminalProvider);
    }

    setInputText("");
  };

  const clear: TerminalType["clear"] = () => {
    resetList([]);
  };

  const reset: TerminalType["reset"] = () => {
    resetList(initialList);
  };

  const getAllOutput: TerminalType["getAllOutput"] = () => outputList;

  const getOutputLength: TerminalType["getOutputLength"] = () =>
    outputList.length;

  const writeInfoOutput: TerminalType["writeInfoOutput"] = (text: string) => {
    writeOutput({
      type: "text",
      text: `[Info] ${text}`,
      status: "info",
    });
  };

  const writeSuccessOutput: TerminalType["writeSuccessOutput"] = (
    text: string
  ) => {
    writeOutput({
      type: "text",
      text: `[Success] ${text}`,
      status: "success",
    });
  };

  const writeErrorOutput: TerminalType["writeErrorOutput"] = (text: string) => {
    writeOutput({
      type: "text",
      text: `[Error] ${text}`,
      status: "error",
    });
  };

  const writeComponentOutput: TerminalType["writeComponentOutput"] = (
    output
  ) => {
    if (output.onlyOne) {
      for (let i = 0; i < outputList.length; i++) {
        const item = outputList[i];
        if (item.type === "component") {
          if (item.componentName === output.componentName) {
            removeOutput(i);
            break;
          }
        }
      }
    }
    writeOutput(output);
  };

  const writeCommandOutput: TerminalType["writeCommandOutput"] = (
    text: string
  ) => {
    writeOutput({
      type: "command",
      text,
    });
  };

  const writeComponentToViewport: TerminalType["writeComponentToViewport"] = (
    output
  ) => {
    setViewportVisible(true);
    if (output.onlyOne) {
      for (let i = 0; i < viewportComponentsList.length; i++) {
        if (viewportComponentsList[i].componentName === output.componentName) {
          writeInfoOutput("该组件已打开");
          return;
        }
      }
    }
    setViewportComponentsList((cur) => [
      {
        type: "component",
        component: output.component,
        componentName: output.componentName,
        onlyOne: true,
      },
      ...cur,
    ]);
  };

  const TerminalProvider: TerminalType = {
    clear,
    focusInput,
    unfocusInput,
    getAllOutput,
    getOutputLength,
    reset,
    rewriteOutput,
    writeOutput,
    writeCommandOutput,
    writeComponentOutput,
    writeInfoOutput,
    writeSuccessOutput,
    writeErrorOutput,
    writeComponentToViewport,
    removeOutput,
    excuteCommand,
    setState,
  };

  return (
    <TerminalContext.Provider value={TerminalProvider}>
      <div className="terminal-view">
        {outputList.map((output, index) => (
          <TerminalRow
            key={
              (output.componentName && output.componentName + index) || index
            }
            {...output}
          />
        ))}
        <TerminalRow
          type="component"
          component={
            <Group>
              <div>[root]# </div>
              <Autocomplete
                ref={ref}
                data={inputTips}
                autoFocus
                value={inputText}
                onChange={onInputChange}
                itemComponent={AutoCompleteItem}
                filter={() => true}
                onDropdownClose={() => {
                  setInputTips([]);
                }}
                onItemSubmit={(item) => {
                  setInputText(item.value);
                  setTimeout(() => {
                    setInputTips([]);
                  }, 0);
                }}
              />
            </Group>
          }
        />
        {mode === "query" ? (
          <div className="mode-text">当前为书签检索模式</div>
        ) : null}
      </div>
    </TerminalContext.Provider>
  );
}

export default Terminal;
