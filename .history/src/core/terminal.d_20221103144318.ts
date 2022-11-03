declare namespace JTerminal {
  type OutputStatus = 'success' | 'error' | 'warn' | 'info' | 'system';

  type OutputType = {
    type: 'empty' | 'text' | 'component' | 'command' | 'commandInput';
    text?: string;
    component?: any;
    resultList?: OutputType[];
    status?: OutputStatus;
    props?: any;
    collapsible?: boolean;
  };

  type CommandOutputType = OutputType & {
    type: 'command';
    text: string;
    resultList?: OutputType[];
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

    writeOutput: (output: OutputType) => void;

    focusInput: () => void;

    excuteCommand: () => void;
  };
}
