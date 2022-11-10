import { PropsWithChildren, useRef, useContext } from 'react';
import { useClickAway, useEventListener } from 'ahooks';
import { TerminalContext } from '../Terminal';
import clsx from 'clsx';

export default function TerminalInnerWrapper(
  props: PropsWithChildren<{ stopPropagation?: boolean; className?: string }>
) {
  const { stopPropagation = false, className = '' } = props;
  const terminal = useContext(TerminalContext) as JTerminal.TerminalType;
  const ref = useRef(null);

  useClickAway(() => {
    terminal.focusInput();
  }, ref);

  useEventListener(
    'click',
    (event: any) => {
      stopPropagation && event.stopPropagation();
      const nodeName = event.target.nodeName;
      if (nodeName === 'INPUT') {
        terminal.unfocusInput();
        setTimeout(() => {
          event.target.focus();
        }, 0);
      } else {
        terminal.focusInput();
      }
    },
    { target: ref }
  );

  return (
    <div
      className={clsx('terminal-inner-wrapper', className || '')}
      ref={ref}
    >
      {props.children}
    </div>
  );
}
