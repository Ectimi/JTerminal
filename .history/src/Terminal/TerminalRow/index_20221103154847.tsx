import { PropsWithChildren, useRef } from 'react';
import { useEventListener, useKeyPress } from 'ahooks';
import { Group } from '@mantine/core';
import './index.less';

const RowInput = (props: { parseCommand: (value: any) => void }) => {
  const { parseCommand } = props;
  const ref = useRef<HTMLInputElement>(null);

  useEventListener(
    'blur',
    () => {
      ref.current?.focus();
    },
    { target: ref }
  );

  useKeyPress(
    'enter',
    (event: any) => {
      const { value } = event.target;
      parseCommand(value);
    },
    {
      target: ref,
      exactMatch: true,
    }
  );

  return (
    <Group>
      <div>[root]# </div>
      <input className="command-input" type="text" autoFocus ref={ref} />
    </Group>
  );
};

function TerminalRow(
  props: PropsWithChildren<
    JTerminal.OutputType & { parseCommand: (value: any) => void }
  >
) {
  const { component, collapsible, type = 'text', text, parseCommand } = props;

  const RowContent = () => {
    switch (type) {
      case 'empty':
        return <br />;
      case 'text':
        return text;
      case 'commandInput':
        return <RowInput parseCommand={parseCommand} />;
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
