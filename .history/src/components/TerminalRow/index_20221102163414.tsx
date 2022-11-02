import { PropsWithChildren } from 'react';
import './index.less';

interface IProps {
  /**
   * text: 纯文本
   * command: 命令输入
   */
  type?: 'text' | 'command';
}

function TerminalRow(props: PropsWithChildren<IProps>) {
  const { children, type = 'text' } = props;

  const RowContent = () => {
    switch (type) {
      case 'text':
        return children;
        
    }
  };

  return <div className="terminal-row">{RowContent()}</div>;
}

export default TerminalRow;
