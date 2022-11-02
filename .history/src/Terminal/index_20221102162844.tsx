import { useState, useEffect, Fragment } from 'react';
import dayjs from 'dayjs';
import TerminalRow from '../components/TerminalRow';
import { parseDay } from '../lib/utils';
import './index.less';

const Datetime = () => {
  const [time, setTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    setTimeout(() => {
      setTime(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    }, 1000);
  });
  return <Fragment>{time}</Fragment>;
};

function Terminal() {
  return (
    <div className="terminal-view">
      <TerminalRow>Welcome to JIndex ! </TerminalRow>
      <TerminalRow>Please nput 'help' to enjoy </TerminalRow>
      <TerminalRow>
        {parseDay(dayjs().day())} <Datetime />{' '}
      </TerminalRow>
    </div>
  );
}

export default Terminal;
