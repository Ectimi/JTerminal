import { useState, useEffect, Fragment } from 'react';
import { useDynamicList } from 'ahooks';
import getopts from 'getopts';
import TerminalRow from './TerminalRow';
import Datetime from '../components/Datetime';

import './index.less';

const commandTextToArgs = (commandText: string) =>
  commandText.trim().replace(/\s+/g, ' ').split(' ');

function Terminal() {
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
  const { list, push, resetList, replace } =
    useDynamicList<JTerminal.OutputType>(initialList);

  const [command, setCommand] = useState('');

  const parseCommand: JTerminal.TerminalType['parseCommand'] = (
    commandText
  ) => {
    setCommand(commandText);

    replace(list.length - 1, {
      type: 'command',
      text: commandText,
    });

    push({
      type: 'commandInput',
    });

    const args = commandTextToArgs(commandText)
    const opts = getopts(args)
    console.log('opts==>',opts)
  };

  return (
    <div className="terminal-view">
      {list.map((output, index) => (
        <TerminalRow key={index} {...{ ...output, parseCommand }} />
      ))}
    </div>
  );
}

export default Terminal;
