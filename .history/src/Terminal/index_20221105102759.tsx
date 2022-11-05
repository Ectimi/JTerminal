import { createContext, useRef } from 'react';
import { useDynamicList, useEventListener, useKeyPress } from 'ahooks';
import { Group } from '@mantine/core';
import getopts from 'getopts';
import TerminalRow from './TerminalRow';
import Datetime from '../components/Datetime';
import './index.less';

const commandTextToArgs = (commandText: string) =>
  commandText.trim().replace(/\s+/g, ' ').split(' ');

const initialList: JTerminal.OutputType[] = [
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

export const TerminalContext = createContext<JTerminal.TerminalType | {}>({});

function Terminal() {
  const ref = useRef<HTMLInputElement>(null);
  const {
    list,
    push: writeOutput,
    resetList,
    replace,
  } = useDynamicList<JTerminal.OutputType>(initialList);

  const focusInput = () => ref.current?.focus();

  const parseCommandInput: JTerminal.TerminalType['parseCommandInput'] = () => {
    const inputValue = ref.current?.value;
    if (!inputValue?.trim()) return;

    const args = commandTextToArgs(inputValue.trim());
    const opts = getopts(args);
    console.log('opts==>', opts);
  };

  const excuteCommand: JTerminal.TerminalType['excuteCommand'] = () => {
    const inputValue = ref.current?.value;
    replace(list.length - 1, {
      type: 'command',
      text: inputValue,
    });
  };

  const clear: JTerminal.TerminalType['clear'] = () => {};

  const reset: JTerminal.TerminalType['reset'] = () => {
    resetList(initialList);
  };

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
      excuteCommand();
    },
    {
      target: ref,
      exactMatch: true,
    }
  );

  const TerminalProvider: JTerminal.TerminalType = {
    clear,
    focusInput,
    reset,
    writeOutput,
    parseCommandInput,
    excuteCommand,
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
