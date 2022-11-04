import { ParsedOptions } from 'getopts';
import parser from 'yargs-parser';

export interface CommandOption {
  name: string;
  alias: string[];
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
