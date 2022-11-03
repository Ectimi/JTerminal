import { PropsWithChildren, useRef } from 'react';
import { useEventListener } from 'ahooks';
import { Group } from '@mantine/core';
import './index.less';

const RowInput = (props: { excuteCommand: (value: any) => void }) => {
  const ref = useRef<HTMLInputElement>(null);

  useEventListener(
    'blur',
    () => {
      ref.current?.focus();
    },
    { target: ref }
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
    JTerminal.OutputType & { excuteCommand: (value: any) => void }
  >
) {
  const { component, collapsible, type = 'text', text, excuteCommand } = props;

  const RowContent = () => {
    switch (type) {
      case 'empty':
        return <br />;
      case 'text':
        return text;
      case 'commandInput':
        return <RowInput excuteCommand={excuteCommand} />;
      case 'command':
        return text;
      case 'component':
        return component;
    }
  };

  return <div className="terminal-row">{RowContent()}</div>;
}

export default TerminalRow;
