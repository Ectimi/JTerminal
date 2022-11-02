import { PropsWithChildren } from 'react';
import { Grid } from '@mantine/core';
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
    <Grid>
      <Grid.Col span={1}>[root]# </Grid.Col>
      <Grid.Col span={11}>
        <input type="text" />
      </Grid.Col>
    </Grid>
  );
};

function TerminalRow(props: PropsWithChildren<ITerminalRowProps>) {
  const { children, type = 'text' } = props;

  const RowContent = () => {
    switch (type) {
      case 'text':
        return children;
      case 'command':
    }
  };

  return <div className="terminal-row">{RowContent()}</div>;
}

export default TerminalRow;
