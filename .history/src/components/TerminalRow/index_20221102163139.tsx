import { PropsWithChildren } from 'react';
import './index.less';

interface IProps {
  /**
   * text: 纯文本
   * command: 命令输入
   */
  type: 'text' | 'command';
}

function TerminalRow(props: PropsWithChildren<any>) {
  return <div className="terminal-row">{props.children}</div>;
}

export default TerminalRow;
