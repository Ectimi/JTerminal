import parser from 'yargs-parser';

export interface CommandOption {
  name: string;
  alias:string[];
  shortcut: string[];
}

export interface CommandParam {
  key: string;
  value: any;
}

export interface CommandType {
  func: string;
  name: string;
  description?: string;
  alias?: string[];
  params: ICommandParam[];
  options: ICommandOption[];
}
