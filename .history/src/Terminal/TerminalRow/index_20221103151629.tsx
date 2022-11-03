import { PropsWithChildren, useRef } from 'react';
import { useEventListener } from 'ahooks';
import { Group } from '@mantine/core';
import './index.less';

const RowInput = (props: { readonly: boolean; alwaysFocus?: boolean }) => {
  const { readonly = true, alwaysFocus = false } = props;
  const ref = useRef<HTMLInputElement>(null);

  useEventListener(
    'blur',
    () => {
      if (alwaysFocus) {
        console.log(1)
        ref.current?.focus();
      }
    },
    { target: ref }
  );

  return (
    <Group>
      <div>[root]# </div>
      <input
        className="command-input"
        type="text"
        autoFocus
        readOnly={readonly}
        ref={ref}
      />
    </Group>
  );
};

function TerminalRow(props: PropsWithChildren<JTerminal.OutputType>) {
  const { children, type = 'text', text, component, collapsible } = props;

  const RowContent = () => {
    switch (type) {
      case 'empty':
        return <br />;
      case 'text':
        return text;
      case 'commandInput':
        return <RowInput readonly={false} />;
      case 'command':
        return <RowInput readonly={true} />;
      case 'component':
        return component;
    }
  };

  return <div className="terminal-row">{RowContent()}</div>;
}

export default TerminalRow;
