import { Dispatch, SetStateAction, useState } from "react";

export default function useHistory(
  commandList: JTerminal.CommandOutputType[],
  setIputText: Dispatch<SetStateAction<string>>
) {
  const [commandHistoryPos, setCommandHistoryPos] = useState(
    commandList.length - 1
  );

  const listCommandHistory = () => commandList;

  const showNextCommand = () => {
    if (commandList.length) {
      let pos = commandHistoryPos + 1;
      if (pos >= commandList.length) {
        pos = commandList.length;
        setCommandHistoryPos(pos);
        setIputText("");
      } else {
        pos = commandHistoryPos + 1;
        setCommandHistoryPos(pos);
        setIputText(commandList[pos].text);
      }
    }
  };

  const showPrevCommand = () => {
    if (commandList.length) {
      let pos = commandHistoryPos - 1;
      if (pos <= 0) {
        pos = 0;
      } else {
        pos = commandHistoryPos - 1;
      }
      setCommandHistoryPos(pos);
      setIputText(commandList[pos].text);
    }
  };

  return {
    commandHistoryPos,
    setCommandHistoryPos,
    listCommandHistory,
    showNextCommand,
    showPrevCommand,
  };
}
