import { CommandType } from "./command";
import { commandMap } from "./commandRegister";

const getCommand = (text: string, parentCommand?: CommandType): CommandType => {
  let func = text.split(' ', 1)[0];
  // 大小写无关
  func = func.toLowerCase();
  let commands:any = commandMap;
  // 有父命令，则从父命令中查找
  if (
    parentCommand &&
    parentCommand.subCommands &&
    Object.keys(parentCommand.subCommands).length > 0
  ) {
    commands = parentCommand.subCommands;
  }
  const command = commands[func];
  console.log('getCommand = ', command);
  return command;
};


export const commandExecute = ()=>{

}