import { PropsWithChildren, useRef, useContext } from 'react';
import { useClickAway, useEventListener } from 'ahooks';
import { TerminalContext } from '../Terminal';
import clsx from 'clsx';

export default function TerminalInnerWrapper(props: PropsWithChildren<any>) {
  const terminal = useContext(TerminalContext) as JTerminal.TerminalType;
  const ref = useRef(null);

  useClickAway(() => {
    terminal.focusInput();
  }, ref);

  useEventListener(
    'click',
    (event: any) => {
      event.stopPropagation();
      const nodeName = event.target.nodeName;
      if (nodeName === 'INPUT') {
        terminal.unfocusInput();
        setTimeout(() => {
          event.target.focus();
        }, 0);
      }else{
        terminal.focusInput()
      }
    },
    { target: ref }
  );

  return (
    <div
      {...props}
      className={clsx('terminal-inner-wrapper',props.className || '')}
      ref={ref}
    >
      {props.children}
    </div>
  );
}
