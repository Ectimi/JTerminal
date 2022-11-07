import { createContext, useRef, forwardRef, useEffect } from 'react';
import {
  useClickAway,
  useDynamicList,
  useEventListener,
  useKeyPress,
  useSafeState,
  useUpdateEffect,
} from 'ahooks';
import { Autocomplete, Group } from '@mantine/core';
import useHistory from './useHistory';
import { getUsageStr } from '../../core/commands/terminal/help/helpUtils';
import { commandList } from '../../core/commandRegister';
import { commandExecute } from '../../core/commandExecutor';
import TerminalRow from './TerminalRow';
import Datetime from '../Datetime';
import { Login } from '../../serve/user';
import './index.less';

type TerminalType = JTerminal.TerminalType;

interface ItemProps {
  name: string;
  desc: string;
}

const initialList: JTerminal.OutputType[] = [
  {
    type: 'text',
    text: 'Welcome to JIndex !',
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

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ desc, name, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others} className="tip-item">
      <div className="tip-name">{name}</div>
      <div className="tip-desc">{desc.replace(name, '')}</div>
    </div>
  )
);

function Terminal() {
  const ref = useRef<HTMLInputElement>(null);
  const [alwaysFocus, setAlwayFocus] = useSafeState(true);
  const [inputText, setInputText] = useSafeState('');

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

  useEventListener('blur', () => alwaysFocus && ref.current?.focus(), {
    target: ref,
  });

  useKeyPress('enter', (event: any) => excuteCommand(), {
    target: ref,
    exactMatch: true,
  });

  useKeyPress('tab', (event: any) => {
    event.preventDefault();
    if (inputTips.length > 0) {
      setInputText(inputTips[0].value);
      setInputTips([]);
    }
  });

  useKeyPress('uparrow', () => showPrevCommand());
  useKeyPress('downarrow', () => showNextCommand());

  useClickAway(() => {
    focusInput();
  }, ref);

  useUpdateEffect(() => {
    const text = inputText.trim().replace(/\s+/g, ' ').split(' ');

    if (text[0] && text.length === 1) {
      const arr = [...commandList];
      const result: any[] = [];
      arr.forEach((command) => {
        if (command.func.startsWith(text[0][0])) {
          result.push({
            value: command.func,
            name: command.func,
            desc: getUsageStr(command),
          });
        }
      });
      arr.forEach((command) => {
        if (
          command.func.includes(text[0]) &&
          !result.some((r) => r.value === command.func)
        ) {
          result.push({
            value: command.func,
            name: command.func,
            desc: getUsageStr(command),
          });
        }
      });
      setInputTips(result);
    } else {
      setInputTips([]);
    }
  }, [inputText]);

  useUpdateEffect(() => {
    setCommandHistoryPos(inputList.length);
  }, [inputList]);

  useUpdateEffect(() => {
    ref.current?.scrollIntoView();
  }, [outputList]);

  const onInputChange = (value: string) => {
    setInputText(value);
  };

  const focusInput: TerminalType['focusInput'] = () => {
    setAlwayFocus(true);
    ref.current?.focus();
  };

  const unfocusInput: TerminalType['unfocusInput'] = () => setAlwayFocus(false);

  const excuteCommand: TerminalType['excuteCommand'] = async () => {
    const command: JTerminal.CommandOutputType = {
      type: 'command',
      text: inputText,
    };
    if (inputText.trim()) {
      addInputList(command);
    }
    writeCommandOutput(inputText);
    await commandExecute(inputText, TerminalProvider);
    setInputText('');
  };

  const clear: TerminalType['clear'] = () => {
    resetList([]);
  };

  const reset: TerminalType['reset'] = () => {
    resetList(initialList);
  };

  const getAllOutput: TerminalType['getAllOutput'] = () => outputList;

  const getOutputLength: TerminalType['getOutputLength'] = () => outputList.length;

  const writeSuccessOutput: TerminalType['writeSuccessOutput'] = (
    text: string
  ) => {
    writeOutput({
      type: 'text',
      text: `[Success] ${text}`,
      status: 'success',
    });
  };

  const writeErrorOutput: TerminalType['writeErrorOutput'] = (text: string) => {
    writeOutput({
      type: 'text',
      text: `[Error] ${text}`,
      status: 'error',
    });
  };

  const writeComponentOutput: TerminalType['writeComponentOutput'] = (
    output
  ) => {
    writeOutput(output);
  };

  const writeCommandOutput: TerminalType['writeCommandOutput'] = (
    text: string
  ) => {
    writeOutput({
      type: 'command',
      text,
    });
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
    writeSuccessOutput,
    writeErrorOutput,
    removeOutput,
    excuteCommand,
  };

  return (
    <TerminalContext.Provider value={TerminalProvider}>
      <div className="terminal-view">
        {outputList.map((output, index) => (
          <TerminalRow key={output.componentName|| index} {...output} />
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
              />
            </Group>
          }
        />
      </div>
    </TerminalContext.Provider>
  );
}

export default Terminal;
