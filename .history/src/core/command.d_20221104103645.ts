import { ParsedOptions } from 'getopts';
import parser from 'yargs-parser';

export interface CommandOption {
  key: string;
  desc:string;
  alias: string[];
  type:"string" | "boolean";
  defaultValue?:any;
}

export interface CommandParam {
  key: string;
  desc: string;
  required: boolean;
}

export type Action = (
  options: ParsedOptions,
  terminal: JTerminal.TerminalType
) => void;

export interface CommandType {
  func: string;
  name: string;
  desc?: string;
  alias?: string[];
  params: CommandParam[];
  options: CommandOption[];
  actions: Actions[] | Action;
}
