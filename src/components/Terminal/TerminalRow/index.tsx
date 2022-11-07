import { PropsWithChildren } from "react";
import { Group } from "@mantine/core";
import "./index.less";

function TerminalRow(props: PropsWithChildren<JTerminal.OutputType>) {
  const {
    component,
    collapsible,
    status = "info",
    type = "text",
    text,
  } = props;

  const RowContent = () => {
    switch (type) {
      case "empty":
        return <br />;
      case "text":
        return <div className={status}>{text}</div>;
      case "command":
        return (
          <Group>
            <div>[root]# </div>
            <div>{text}</div>
          </Group>
        );
      case "component":
        return typeof component === "function" ? component() : component;
    }
  };

  return <div className="terminal-row">{RowContent()}</div>;
}

export default TerminalRow;