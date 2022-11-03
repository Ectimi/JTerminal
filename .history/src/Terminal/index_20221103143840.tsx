import { useState, useEffect, Fragment } from 'react';
import { useDynamicList } from 'ahooks';
import getopts from 'getopts';
import dayjs from 'dayjs';
import TerminalRow from './TerminalRow';
import { parseDay } from '../lib/utils';
import './index.less';

const Datetime = () => {
  const [time, setTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    }, 1000);

    return () => clearTimeout(timer);
  });
  return (
    <Fragment>
      {parseDay(dayjs().day())} {time}
    </Fragment>
  );
};

function Terminal() {
  const outputList = useDynamicList<JTerminal.OutputType>([
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
      component:<Datetime/>,
    },
  ]);
  const command = useState('');
  const writeText: JTerminal.TerminalType['writeOutput'] = (output) => (
    <TerminalRow>{output.text}</TerminalRow>
  );

  console.log(getopts(['-a', 'bbb', '-u', 'acc', '--t', 'abfd']));
  return (
    <div className="terminal-view">
     
    </div>
  );
}

export default Terminal;
