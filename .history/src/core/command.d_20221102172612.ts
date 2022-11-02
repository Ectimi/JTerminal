import parser from 'yargs-parser';

export interface ICommandOption {
  name: string;
  alias:string[];
  shortcut: string[];
}

export interface ICommandParam {
  key: string;
  value: any;
}

export interface ICommand {
  func: string;
  name: string;
  description?: string;
  alias?: string[];
  params: ICommandParam[];
  options: ICommandOption[];
}
