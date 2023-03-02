import { createContext, useRef, forwardRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  useAsyncEffect,
  useClickAway,
  useDynamicList,
  useEventListener,
  useKeyPress,
  useSafeState,
  useUpdateEffect,
} from 'ahooks';
import { Autocomplete, AutocompleteItem, Group } from '@mantine/core';
import {
  userState,
  bookmarksState,
  viewportComponentListState,
  viewportVisibleState,
} from '@/store';
import { GetSearchSuggest, SearchSuggestController } from '@/serve/api';
import useHistory from './useHistory';
import searchCommand from '@/core/commands/search/searchCommand';
import { getUsageStr } from '@/core/commands/terminal/help/helpUtils';
import { getCommand } from '@/core/commandRegister';
import { commandExecute } from '@/core/commandExecutor';
import { initLocalforage } from '@/lib/localForage';
import { registerShortcuts } from './shortcuts';
import TerminalRow from './TerminalRow';
import Datetime from '../Datetime';
import './index.less';

type TerminalType = JTerminal.TerminalType;

interface ItemProps {
  name: string;
  description: string;
}

type TMode = 'common' | 'query' | 'history';

export interface IBookmarkItem {
  name: string;
  url: string;
  icon: string;
  label: string;
  description: string;
}

const initialList: JTerminal.OutputType[] = [
  {
    type: 'text',
    text: 'Welcome To JTerminal Index !',
  },
  {
    type: 'text',
    text: `Please input 'help' to enjoy`,
  },
  {
    type: 'component',
    component: <Datetime />,
  },
  {
    type: 'empty',
  },
];

export const TerminalContext = createContext<JTerminal.TerminalType | unknown>(
  {}
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
  const [user, setUser] = useRecoilState(userState);
  const setViewportVisible = useSetRecoilState(viewportVisibleState);
  const [viewportComponentsList, setViewportComponentsList] = useRecoilState(
    viewportComponentListState
  );
  const [{ bookmarks }, setBookmarkState] = useRecoilState(bookmarksState);
  const ref = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useSafeState<TMode>('common');
  const [alwaysFocus, setAlwayFocus] = useSafeState(true);
  const [inputText, setInputText] = useSafeState('');
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

  useEventListener(
    'blur',
    (event: any) => {
      const excludeNodes = ['INPUT', 'TEXTAREA'];
      if (
        event.relatedTarget &&
        excludeNodes.includes(event.relatedTarget.nodeName)
      )
        return;
      alwaysFocus && ref.current?.focus();
    },
    {
      target: ref,
    }
  );

  // 按下 enter 时，会先走 submit，再走这里
  useKeyPress('enter', () => {
    if (SearchSuggestController) {
      SearchSuggestController.abort();
    }
    setInputTips([]);
    excuteCommand();
  });

  useKeyPress('tab', (event: any) => {
    event.preventDefault();
    if (inputTips.length > 0) {
      if (getSearchWord()) {
        const command = inputText
          .trimStart()
          .replace(/\s+/g, ' ')
          .split(' ')[0];
        setInputText(command + ' ' + inputTips[0].value);
      } else {
        const text =
          mode === 'query'
            ? queryModeActiveKey + inputTips[0].value
            : inputTips[0].value;
        setInputText(text);
      }

      setTimeout(() => {
        setInputTips([]);
      }, 0);
    }
  });

  useKeyPress('uparrow', () => {
    if (mode !== 'history') {
      if (!inputText) {
        setMode('history');
        showPrevCommand();
      }
    } else if (mode === 'history') {
      showPrevCommand();
    }
  });

  useKeyPress('downarrow', () => {
    if (mode == 'history') {
      showNextCommand();
    }
  });

  useClickAway((event: any) => focusInput(), ref);

  useAsyncEffect(async () => {
    initLocalforage();
    registerShortcuts(TerminalProvider);
  }, []);

  useUpdateEffect(() => {
    registerShortcuts(TerminalProvider);
  }, [viewportComponentsList]);

  useAsyncEffect(async () => {
    const { commandList } = await getCommand();
    const text = inputText.trimStart().replace(/\s+/g, ' ').split(' ');
    let word = text[0].toLocaleLowerCase();

    if (word && text.length === 1) {
      if (word.startsWith(queryModeActiveKey)) {
        word = word.split(queryModeActiveKey)[1];
        if (mode === 'common') {
          setMode('query');
        }
        if (word) {
          const tips = getInputTips(word, [...bookmarks], 'name');
          setInputTips(tips);
        }
      } else {
        if (mode !== 'history' && mode !== 'common') {
          setMode('common');
        }
        const tips = getInputTips(word, [...commandList], 'func');
        setInputTips(tips);
      }
    } else {
      if (!word.startsWith(queryModeActiveKey) && mode !== 'history') {
        setMode('common');
      }
      const searchWord = getSearchWord();
      if (searchWord) {
        if (SearchSuggestController) {
          SearchSuggestController.abort();
        }
        GetSearchSuggest(searchWord)
          .then((res) => {
            if (res.success) {
              setInputTips(
                res.data.map((value: string) => ({
                  value,
                  name: value,
                }))
              );
            }
          })
          .catch((err) => {
            console.log('err==>', err);
          });
      } else {
        setInputTips([]);
      }
    }
  }, [inputText]);

  useUpdateEffect(() => setCommandHistoryPos(inputList.length), [inputList]);

  useUpdateEffect(() => ref.current?.scrollIntoView(), [outputList]);

  const shortcutExcuteCommand: TerminalType['shortcutExcuteCommand'] = (
    command
  ) => {
    if (command === 'bookmark') {
      if (
        viewportComponentsList.find(
          (component) => component.componentName === 'bookmarkList'
        )
      ) {
        setViewportVisible((prev) => !prev);
        return;
      }
      excuteCommand(command);
    }
  };

  const getSearchWord = () => {
    const text = inputText.trimStart().replace(/\s+/g, ' ').split(' ');
    const word = text[0].toLocaleLowerCase();
    const searchFuncs: string[] = [];
    searchCommand.forEach((command) => {
      searchFuncs.push(command.func, ...command.alias!);
    });
    if (searchFuncs.includes(word) && text.length > 1) {
      return [...text].splice(1, text.length - 1).join(' ');
    }
    return '';
  };

  const onItemSubmit = (item: AutocompleteItem, trigger: string = 'enter') => {
    const searchWord = getSearchWord();
    if (trigger === 'enter' && !(window as any).event.altKey) {
      if (searchWord) {
        const command = inputText
          .trimStart()
          .replace(/\s+/g, ' ')
          .split(' ')[0];
        setInputText(command + ' ' + searchWord);
      } else {
        setInputText(inputText);
      }
      return;
    }
    if (searchWord) {
      const command = inputText.trimStart().replace(/\s+/g, ' ').split(' ')[0];
      setInputText(command + ' ' + item.value);
    } else {
      const text =
        mode === 'query' ? queryModeActiveKey + item.value : item.value;
      setInputText(text);
    }

    setTimeout(() => {
      setInputTips([]);
    }, 0);
  };

  const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ description, name, ...others }: ItemProps, ref) => {
      return (
        <div
          ref={ref}
          {...others}
          onMouseDown={() => {
            onItemSubmit({ value: name, name, description }, 'click');
          }}
        >
          <div className="tip-name">{name}</div>
          {description ? (
            <div className="tip-desc">{description.replace(name, '')}</div>
          ) : null}
        </div>
      );
    }
  );

  const onInputChange = (value: string) => setInputText(value);

  const focusInput: TerminalType['focusInput'] = () => {
    setAlwayFocus(true);
    ref.current?.focus();
  };

  const unfocusInput: TerminalType['unfocusInput'] = () => setAlwayFocus(false);

  const excuteCommand: TerminalType['excuteCommand'] = async (
    commandStr?: string
  ) => {
    const commandText = commandStr || inputText;
    const command: JTerminal.CommandOutputType = {
      type: 'command',
      text: commandText,
    };

    if (commandText.trim()) {
      addInputList(command);
    }

    writeCommandOutput(commandText);
    setInputText('');
    setInputTips([]);

    if (commandText.startsWith(queryModeActiveKey)) {
      const name = commandText.trim().split(queryModeActiveKey)[1];
      const bookmarkItem =
        bookmarks!.filter(
          (bookmark) => bookmark.name.toLocaleLowerCase() === name
        )[0] || {};
      const url = bookmarkItem.url;

      if (url) {
        const commandText = `goto ${url}`;
        await commandExecute(commandText, TerminalProvider);
      } else {
        writeInfoOutput(`书签 "${name}" 不存在`);
      }
    } else {
      await commandExecute(commandText, TerminalProvider);
    }

    setMode('common');
  };

  const clear: TerminalType['clear'] = () => resetList([]);

  const reset: TerminalType['reset'] = () => resetList(initialList);

  const getAllOutput: TerminalType['getAllOutput'] = () => outputList;

  const getOutputLength: TerminalType['getOutputLength'] = () =>
    outputList.length;

  const writeInfoOutput: TerminalType['writeInfoOutput'] = (text) => {
    writeOutput({
      type: 'text',
      text: `[Info] ${text}`,
      status: 'info',
    });
  };

  const writeSuccessOutput: TerminalType['writeSuccessOutput'] = (text) => {
    writeOutput({
      type: 'text',
      text: `[Success] ${text}`,
      status: 'success',
    });
  };

  const writeErrorOutput: TerminalType['writeErrorOutput'] = (text) => {
    writeOutput({
      type: 'text',
      text: `[Error] ${text}`,
      status: 'error',
    });
  };

  const writeComponentOutput: TerminalType['writeComponentOutput'] = (
    output
  ) => {
    if (output.onlyOne) {
      for (let i = 0; i < outputList.length; i++) {
        const item = outputList[i];
        if (item.type === 'component') {
          if (item.componentName === output.componentName) {
            removeOutput(i);
            break;
          }
        }
      }
    }
    writeOutput(output);
  };

  const writeCommandOutput: TerminalType['writeCommandOutput'] = (text) => {
    writeOutput({
      type: 'command',
      text,
    });
  };

  const writeComponentToViewport: TerminalType['writeComponentToViewport'] = (
    output
  ) => {
    setViewportVisible(true);
    if (output.onlyOne) {
      for (let i = 0; i < viewportComponentsList.length; i++) {
        if (viewportComponentsList[i].componentName === output.componentName) {
          writeInfoOutput('该组件已打开');
          return;
        }
      }
    }

    setViewportComponentsList((cur) => [
      {
        type: 'component',
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
    shortcutExcuteCommand,
  };

  return (
    <TerminalContext.Provider value={TerminalProvider}>
      <div className="terminal-view">
        {outputList.map((output, index) => (
          <TerminalRow
            key={
              (output.componentName && output.componentName + index) || index
            }
            user={user}
            {...output}
          />
        ))}
        <TerminalRow
          user={user}
          type="component"
          component={
            <Group>
              <div>[{user ? user.username : 'local'}]# </div>
              <Autocomplete
                ref={ref}
                data={inputTips}
                autoFocus
                value={inputText}
                itemComponent={AutoCompleteItem}
                filter={() => true}
                onChange={onInputChange}
                onDropdownClose={() => {
                  setInputTips([]);
                }}
                onItemSubmit={(item) => onItemSubmit(item)}
              />
            </Group>
          }
        />
        {mode === 'query' ? (
          <div className="mode-text">当前为书签检索模式</div>
        ) : null}
      </div>
    </TerminalContext.Provider>
  );
}

export default Terminal;
