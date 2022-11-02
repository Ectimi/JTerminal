import { PropsWithChildren } from 'react';
import './index.less';

function TerminalRow(props: PropsWithChildren<any>) {
  return <div className="terminal-row">{props.children}</div>;
}

export default TerminalRow;
