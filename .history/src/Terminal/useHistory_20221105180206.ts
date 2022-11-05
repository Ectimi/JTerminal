import { useSafeState } from 'ahooks';
import { RefObject } from 'react';

export default function useHistory(
  commandList: JTerminal.CommandOutputType[],
  commandInputRef: RefObject<HTMLInputElement>
) {
  const [commandHistoryPos, setCommandHistoryPos] = useSafeState(commandList.length - 1);

  const listCommandHistory = () => commandList;

  const showNextCommand = () => {
    setCommandHistoryPos(commandHistoryPos + 1);
    if (commandHistoryPos < commandList.length - 1) {
      commandInputRef.current!.value = commandList[commandHistoryPos].text;
    } else if (commandHistoryPos === commandList.length - 1) {
      commandInputRef.current!.value = '';
    }
  };

  const showPrevCommand = ()=>{
    if(commandList.length >= 1){
        setCommandHistoryPos(commandHistoryPos - 1)
        commandInputRef.current!.value = commandList[commandHistoryPos].text
    }
  }

  return {
    commandHistoryPos,
    setCommandHistoryPos,
    listCommandHistory,
    showNextCommand,
    showPrevCommand
  }
}
