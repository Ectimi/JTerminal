import { useState, useRef, useEffect, Fragment } from 'react';
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
  {
    type: 'commandInput',
  },
];

function Terminal() {
  const ref = useRef<HTMLInputElement>(null);
  const { list, push, resetList, replace } =
    useDynamicList<JTerminal.OutputType>(initialList);

  const parseCommandInput: JTerminal.TerminalType['parseCommandInput'] = (
    commandInput
  ) => {
    replace(list.length - 1, {
      type: 'command',
      text: commandInput,
    });

    push({
      type: 'commandInput',
    });

    const args = commandTextToArgs(commandInput);
    const opts = getopts(args);
    console.log('opts==>', opts);
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
      const { value } = event.target;
      parseCommandInput(value);
    },
    {
      target: ref,
      exactMatch: true,
    }
  );

  return (
    <div className="terminal-view">
      {list.map((output, index) => (
        <TerminalRow key={index} {...output} />
      ))}
      <Group>
        <div>[root]# </div>
        <input className="command-input" type="text" autoFocus ref={ref} />
      </Group>
    </div>
  );
}

export default Terminal;
