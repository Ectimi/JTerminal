import {
  Dispatch,
  createContext,
  useState,
  useRef,
  useEffect,
  useReducer,
  useContext,
  Fragment,
} from 'react';
import { useDynamicList, useEventListener, useKeyPress } from 'ahooks';
import { Group } from '@mantine/core';
import getopts from 'getopts';
import TerminalRow from './TerminalRow';
import Datetime from '../components/Datetime';
import './index.less';

interface IState {
  list: JTerminal.OutputType[];
}

const commandTextToArgs = (commandText: string) =>
  commandText.trim().replace(/\s+/g, ' ').split(' ');

const initialList: IState['list'] = [
  {
    type: 'text',
    text: 'Welcome to JIndex !',
  },
  {
    type: 'text',
    text: `Please nput 'help' to enjoy`,
  },
  {
    type: 'component',
    component: <Datetime />,
  },
  {
    type: 'empty',
  },
];

const TerminalContext = createContext<JTerminal.TerminalType | {}>({});

function Terminal() {
  const ref = useRef<HTMLInputElement>(null);
  const {
    list,
    push: writeOutput,
    resetList: reset,
    replace,
  } = useDynamicList<JTerminal.OutputType>(initialList);

  const focusInput = () => ref.current?.focus();

  const parseCommandInput: JTerminal.TerminalType['parseCommandInput'] = (
    commandInput
  ) => {
    replace(list.length - 1, {
      type: 'command',
      text: commandInput,
    });

    const args = commandTextToArgs(commandInput);
    const opts = getopts(args);
    console.log('opts==>', opts);
  };

  const excuteCommand: JTerminal.TerminalType['excuteCommand'] = (
    command
  ) => {};

  const clear: JTerminal.TerminalType['clear'] = () => {};

  useEventListener(
    'blur',
    () => {
      ref.current?.focus();
    },
    { target: ref }
  );

  useKeyPress(
    'enter',
    (event: any) => {
      const { value } = event.target;
      parseCommandInput(value);
    },
    {
      target: ref,
      exactMatch: true,
    }
  );

  const TerminalProvider = {
    clear,
    focusInput,
    reset,
    writeOutput,
    parseCommandInput,
  };

  return (
    <TerminalContext.Provider value={TerminalProvider}>
      <div className="terminal-view">
        {list.map((output, index) => (
          <TerminalRow key={index} {...output} />
        ))}
        <Group>
          <div>[root]# </div>
          <input className="command-input" type="text" autoFocus ref={ref} />
        </Group>
      </div>
    </TerminalContext.Provider>
  );
}

export default Terminal;
