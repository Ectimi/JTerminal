import { useState, useEffect, Fragment } from 'react';
import { useDynamicList } from 'ahooks';
import getopts from 'getopts';
import TerminalRow from './TerminalRow';
import Datetime from '../components/Datetime';
import './index.less';

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
      alwaysFocus:true
    },
  ];
  const { list, push, resetList, replace } =
    useDynamicList<JTerminal.OutputType>(initialList);

  const command = useState('');

  console.log(getopts(['-a', 'bbb', '-u', 'acc', '--t', 'abfd']));
  return (
    <div className="terminal-view">
      {list.map((output, index) => (
        <TerminalRow key={index} {...output} />
      ))}
    </div>
  );
}

export default Terminal;
