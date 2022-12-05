import { PropsWithChildren } from 'react';
import { Group } from '@mantine/core';
import { IUser } from '@/store';
import { useTerminal } from '../useTerminal';

import './index.less';

interface IProps extends JTerminal.OutputType {
  user: IUser | null;
}

function TerminalRow(props: PropsWithChildren<IProps>) {
  const {
    user,
    component,
    collapsible,
    status = 'common',
    type = 'text',
    text,
  } = props;
  const terminal = useTerminal();

  const RowContent = () => {
    switch (type) {
      case 'empty':
        return <br />;
      case 'text':
        return <div className={status}>{text}</div>;
      case 'command':
        return (
          <Group>
            <div>[{user ? user.username : 'local'}]# </div>
            <div>{text}</div>
          </Group>
        );
      case 'component':
        return typeof component === 'function' ? component() : component;
    }
  };

  const onDoubleClick = () => {
    if ((window as any).event.ctrlKey) {
      if (type === 'command') {
        terminal.excuteCommand(text);
      }
    }
  };

  return (
    <div className="terminal-row" onDoubleClick={onDoubleClick}>
      {RowContent()}
    </div>
  );
}

export default TerminalRow;
