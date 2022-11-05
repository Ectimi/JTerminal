import { createContext, useRef, Fragment } from 'react';
import { useDynamicList, useEventListener, useKeyPress } from 'ahooks';
import { Group } from '@mantine/core';
import { commandExecute } from '../core/commandExecutor';
import TerminalRow from './TerminalRow';
import Datetime from '../components/Datetime';
import './index.less';

const initialList: JTerminal.OutputType[] = [
  {
    type: 'text',
    text: 'Welcome to JIndex !',
  },
  {
    type: 'text',
    text: `Please nput 'help' to enjoy`,
  },
  {
    type: 'component',
    component: <Datetime />,
  },
  {
    type: 'empty',
  },
];

export const TerminalContext = createContext<JTerminal.TerminalType | {}>({});

function Terminal() {
  const ref = useRef<HTMLInputElement>(null);
  const {
    list,
    push: writeOutput,
    resetList,
    replace,
  } = useDynamicList<JTerminal.OutputType>(initialList);

  useEventListener('blur', () => ref.current?.focus(), { target: ref });

  useKeyPress('enter', (event: any) => excuteCommand(), {
    target: ref,
    exactMatch: true,
  });

  const focusInput = () => ref.current?.focus();

  const excuteCommand: JTerminal.TerminalType['excuteCommand'] = async () => {
    const inputValue = ref.current?.value || '';
    writeOutput({
      type: 'command',
      text: inputValue,
    });
    await commandExecute(inputValue, TerminalProvider);
    ref.current!.value = '';
  };

  const clear: JTerminal.TerminalType['clear'] = () => {};

  const reset: JTerminal.TerminalType['reset'] = () => {
    resetList(initialList);
  };

  const writeErrorOutput:JTerminal.TerminalType['writeErrorOutput'] = (text:string)=>{
    writeOutput({
      type:"text",
      text,
      status:'error'
    })
  }

  const TerminalProvider: JTerminal.TerminalType = {
    clear,
    focusInput,
    reset,
    writeOutput,
    writeErrorOutput,
    excuteCommand,
  };

  return (
    <TerminalContext.Provider value={TerminalProvider}>
      <div className="terminal-view">
        {list.map((output, index) => (
          <TerminalRow key={index} {...output} />
        ))}
        <TerminalRow
          type="component"
          component={
            <Group>
              <div>[root]# </div>
              <input
                className="command-input"
                type="text"
                autoFocus
                ref={ref}
              />
            </Group>
          }
        />
      </div>
    </TerminalContext.Provider>
  );
}

export default Terminal;
