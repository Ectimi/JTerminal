import { createContext, useRef, Fragment } from 'react';
import {
  useDynamicList,
  useEventListener,
  useKeyPress,
  useLatest,
} from 'ahooks';
import { Group } from '@mantine/core';
import useHistory from './useHistory';
import { commandExecute } from '../core/commandExecutor';
import TerminalRow from './TerminalRow';
import Datetime from '../components/Datetime';
import './index.less';

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

export const TerminalContext = createContext<JTerminal.TerminalType | {}>({});

function Terminal() {
  const ref = useRef<HTMLInputElement>(null);
  const {
    list: outputList,
    push: writeOutput,
    resetList,
    replace,
  } = useDynamicList<JTerminal.OutputType>(initialList);
  const { list: commandList, push: addCommand } =
    useDynamicList<JTerminal.CommandOutputType>([]);
  const {
    commandHistoryPos,
    setCommandHistoryPos,
    listCommandHistory,
    showNextCommand,
    showPrevCommand,
  } = useHistory(commandList, ref);

  useEventListener('blur', () => ref.current?.focus(), { target: ref });

  useKeyPress('enter', (event: any) => excuteCommand(), {
    target: ref,
    exactMatch: true,
  });

  const focusInput = () => ref.current?.focus();

  const excuteCommand: JTerminal.TerminalType['excuteCommand'] = async () => {
    const inputValue = ref.current?.value || '';
    const command:JTerminal.CommandOutputType = {
      type: 'command',
      text: inputValue,
    }
    writeOutput(command);
    addCommand(command)
    await commandExecute(inputValue, TerminalProvider);
    ref.current!.value = '';
  };

  const clear: JTerminal.TerminalType['clear'] = () => {};

  const reset: JTerminal.TerminalType['reset'] = () => {
    resetList(initialList);
  };

  const writeErrorOutput: JTerminal.TerminalType['writeErrorOutput'] = (
    text: string
  ) => {
    writeOutput({
      type: 'text',
      text,
      status: 'error',
    });
  };

  const writeComponentOutput: JTerminal.TerminalType['writeComponentOutput'] = (
    component: any
  ) => {
    writeOutput({
      type: 'component',
      component,
    });
  };

  const TerminalProvider: JTerminal.TerminalType = {
    clear,
    focusInput,
    reset,
    writeOutput,
    writeComponentOutput,
    writeErrorOutput,
    excuteCommand,
  };

  return (
    <TerminalContext.Provider value={TerminalProvider}>
      <div className="terminal-view">
        {outputList.map((output, index) => (
          <TerminalRow key={index} {...output} />
        ))}
        <TerminalRow
          type="component"
          component={
            <Group>
              <div>[root]# </div>
              <input
                className="command-input"
                type="text"
                autoFocus
                ref={ref}
              />
            </Group>
          }
        />
      </div>
    </TerminalContext.Provider>
  );
}

export default Terminal;
