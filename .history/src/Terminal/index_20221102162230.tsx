import dayjs from 'dayjs';
import TerminalRow from '../components/TerminalRow';
import { parseDay } from '../lib/utils';
import './index.less';

function Terminal() {
  return (
    <div className="terminal-view">
      <TerminalRow>Welcome to JIndex ! </TerminalRow>
      <TerminalRow>Please nput 'help' to enjoy </TerminalRow>
      <TerminalRow>
        星期{parseDay(dayjs().day())} {dayjs().format('YYYY-MM-DD HH:mm:ss')}
      </TerminalRow>
    </div>
  );
}

export default Terminal;
