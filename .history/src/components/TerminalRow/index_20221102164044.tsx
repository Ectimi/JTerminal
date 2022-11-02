import { PropsWithChildren } from 'react';
import { Group } from '@mantine/core';
import './index.less';

interface ITerminalRowProps {
  /**
   * text: 纯文本
   * command: 命令输入
   */
  type?: 'text' | 'command';
}

const RowInput = () => {
  return (
    <Group>
      <div>[root]# </div>
      <input type="text" />
    </Group>
  );
};

function TerminalRow(props: PropsWithChildren<ITerminalRowProps>) {
  const { children, type = 'text' } = props;

  const RowContent = () => {
    switch (type) {
      case 'text':
        return children;
      case 'command':
        return <RowInput />;
    }
  };

  return <div className="terminal-row">{RowContent()}</div>;
}

export default TerminalRow;
