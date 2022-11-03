import { PropsWithChildren } from 'react';
import { Group } from '@mantine/core';
import './index.less';

const RowInput = () => {
  return (
    <Group>
      <div>[root]# </div>
      <input className="command-input" type="text" autoFocus />
    </Group>
  );
};

function TerminalRow(props: PropsWithChildren<JTerminal.OutputType>) {
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

export default TerminalRow;
