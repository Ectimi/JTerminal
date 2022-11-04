declare namespace JTerminal {
  type OutputStatus = 'success' | 'error' | 'warn' | 'info' | 'system';

  type OutputType = {
    type: 'empty' | 'text' | 'component' | 'command';
    text?: string;
    component?: any;
    resultList?: OutputType[];
    status?: OutputStatus;
    props?: any;
    collapsible?: boolean;
    alwaysFocus?: boolean;
  };

  type EmptyOutputType = OutputType & {
    type: 'empty';
  };

  type CommandOutputType = OutputType & {
    type: 'command';
    text: string;
    resultList?: OutputType[];
  };

  type CommandInputOutputType = OutputType & {
    type: 'commandInput';
    alwaysFocus: boolean;
  };

  type TextOutputType = OutputType & {
    type: 'text';
    text: string;
  };

  type ComponentOutputType = OutputType & {
    type: 'component';
    component?: any;
  };

  type TerminalType = {
    clear: () => void;

    reset:()=>void;

    writeOutput: (output: OutputType) => void;

    focusInput: () => void;

    parseCommandInput:(commandInput:string) => void;

    excuteCommand: (command:string) => void;
  };
}
