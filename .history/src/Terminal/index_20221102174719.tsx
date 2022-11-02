import { useState, useEffect, Fragment } from 'react';
import { useQueue } from '@mantine/hooks';
import parser from 'yargs-parser';
import dayjs from 'dayjs';
import TerminalRow from '../components/TerminalRow';
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
  return <Fragment>{time}</Fragment>;
};

function Terminal() {
  const argv = parser('--foo=99 --bar=9987930', {
    string: ['bar'],
  });
  console.log(argv);
  
  return (
    <div className="terminal-view">
      <TerminalRow>Welcome to JIndex ! </TerminalRow>
      <TerminalRow>Please nput 'help' to enjoy </TerminalRow>
      <TerminalRow>
        {parseDay(dayjs().day())} <Datetime />
      </TerminalRow>
      <TerminalRow type="command" />
    </div>
  );
}

export default Terminal;
