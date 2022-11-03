import { PropsWithChildren } from 'react';
import { Group } from '@mantine/core';
import './index.less';

interface TerminalRendererProps {
  /**
   * empty：空
   * text: 纯文本
   * command: 命令输入
   */
  type?: 'empty' | 'text' | 'commandInput';
}

const RowInput = () => {
  return (
    <Group>
      <div>[root]# </div>
      <input className="command-input" type="text" autoFocus />
    </Group>
  );
};

function TerminalRenderer(props: PropsWithChildren<TerminalRendererProps>) {
  const { children, type = 'text' } = props;

  const RowContent = () => {
    switch (type) {
      case 'empty':
        return <br />;
      case 'text':
        return children;
      case 'commandInput':
        return <RowInput />;
    }
  };

  return <div className="terminal-row">{RowContent()}</div>;
}

export default TerminalRenderer;
