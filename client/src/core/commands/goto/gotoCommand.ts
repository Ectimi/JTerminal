import { CommandType } from "../../command";

const gotoCommand: CommandType = {
    func: "goto",
    name: "网页跳转",
    alias: ["to", "open","jump"],
    params: [
      {
        key: "link",
        desc: "目标链接",
        required: true,
      },
    ],
    options: [
      {
        key: "self",
        desc: "是否当前页面打开",
        alias: ["s"],
        type: "boolean",
        defaultValue: false,
      },
    ],
    action(options, terminal): void {
      const { _, self } = options;
      if (_.length < 1) {
        terminal.writeErrorOutput("参数不足");
        return;
      }
      let link = _[0];
      if (self) {
        window.location.href = link;
      } else {
        window.open(link);
      }
    },
};

export default gotoCommand;
