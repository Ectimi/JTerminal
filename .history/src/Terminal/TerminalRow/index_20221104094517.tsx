import { PropsWithChildren, useRef } from 'react';
import { useEventListener, useKeyPress } from 'ahooks';
import { Group } from '@mantine/core';
import './index.less';

function TerminalRow(
  props: PropsWithChildren<
    JTerminal.OutputType 
  >
) {
  const { component, collapsible, type = 'text', text } = props;

  const RowContent = () => {
    switch (type) {
      case 'empty':
        return <br />;
      case 'text':
        return text;
      case 'command':
        return (
          <Group>
            <div>[root]# </div>
            <div>{text}</div>
          </Group>
        );
      case 'component':
        return component;
    }
  };

  return <div className="terminal-row">{RowContent()}</div>;
}

export default TerminalRow;
