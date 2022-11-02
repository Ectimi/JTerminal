import parser from 'yargs-parser';

export interface CommandOption {
  name: string;
  alias: string[];
  shortcut: string[];
}

export interface CommandParam {
  key: string;
  desc: string;
  required: boolean;
}

export interface CommandType {
  func: string;
  name: string;
  desc?: string;
  alias?: string[];
  params: CommandParam[];
  options: CommandOption[];
}
