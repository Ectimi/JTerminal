import { PropsWithChildren, useMemo, memo } from 'react';
import { Group } from '@mantine/core';
import { IUser } from '@/store';
import { useTerminal } from '../useTerminal';

import './index.less';

interface IProps extends JTerminal.OutputType {
  user: IUser | null;
}

export const FormatCommandOutputLine = memo(
  ({ text = '' }: { text: string | undefined }) => {
    if (text) {
      const textArray = text?.split(' ');
      return (
        <>
          <span className="command-name">{textArray[0]} </span>
          <span>{textArray.splice(0, 1) && textArray.join(' ')}</span>
        </>
      );
    }
    return null;
  }
);

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
          <Group sx={{ alignItems: 'flex-start', flexWrap: 'nowrap' }}>
            <div className="username">[{user ? user.username : 'local'}]# </div>
            <div>
              <FormatCommandOutputLine text={text} />
            </div>
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
