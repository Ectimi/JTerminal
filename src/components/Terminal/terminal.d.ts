declare namespace JTerminal {
  type OutputStatus = "success" | "error" | "warn" | "info" | "system";

  type OutputType = {
    type: "empty" | "text" | "component" | "command";
    text?: string;
    component?: any;
    componentName?: string;
    resultList?: OutputType[];
    status?: OutputStatus;
    props?: any;
    collapsible?: boolean;
    alwaysFocus?: boolean;
    onlyOne?: boolean;
  };

  type EmptyOutputType = OutputType & {
    type: "empty";
  };

  type CommandOutputType = OutputType & {
    type: "command";
    text: string;
    resultList?: OutputType[];
  };

  type CommandInputOutputType = OutputType & {
    type: "commandInput";
    alwaysFocus: boolean;
  };

  type TextOutputType = OutputType & {
    type: "text";
    text: string;
  };

  type ComponentOutputType = OutputType & {
    type: "component";
    component: any;
    componentName: string;
  };

  type TerminalType = {
    clear: () => void;

    reset: () => void;

    getAllOutput: () => OutputType[];

    getOutputLength: () => number;

    rewriteOutput: (index: number, output: OutputType) => void;

    writeOutput: (output: OutputType) => void;

    writeSuccessOutput: (text: string) => void;

    writeErrorOutput: (text: string) => void;

    writeComponentOutput: (component: ComponentOutputType) => void;

    writeCommandOutput: (text: string) => void;

    removeOutput: (index: number) => void;

    focusInput: () => void;

    unfocusInput: () => void;

    excuteCommand: () => void;
  };
}
