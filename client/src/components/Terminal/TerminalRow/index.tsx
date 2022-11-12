import { PropsWithChildren } from 'react';
import { Group } from '@mantine/core';
import './index.less';
import { IUser } from '@/store';

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

  return <div className="terminal-row">{RowContent()}</div>;
}

export default TerminalRow;
