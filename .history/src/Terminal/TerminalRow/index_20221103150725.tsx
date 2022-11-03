import { PropsWithChildren, useRef } from 'react';
import { Group } from '@mantine/core';
import './index.less';

const RowInput = (props: { readonly: boolean; alwaysFocus?: boolean }) => {
  const { readonly = true, alwaysFocus } = props;
  const ref = useRef(null);

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
