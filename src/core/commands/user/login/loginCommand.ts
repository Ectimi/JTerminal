import { CommandType } from "../../../command";
import { Login } from "@/serve/user";
import { localforage } from '@/lib/localForage';

const loginCommand: CommandType = {
  func: "login",
  name: "登陆",
  alias: [],
  params: [],
  options: [
    {
      key: "username",
      alias: ["u"],
      desc: "用户名",
      type: "string",
    },
    {
      key: "password",
      desc: "密码",
      alias: ["p"],
      type: "string",
    },
  ],
  async action(options, terminal, parentCommand) {
    try {
      const { username, password } = options;
      if (username && password) {
        const data = await Login({ username, password });
        if (data.success) {
          await localforage.setItem("token", data.data.token);
          terminal.removeOutput(terminal.getOutputLength.length - 1);
          terminal.writeSuccessOutput("登陆成功");
        } else {
          terminal.writeErrorOutput("登陆错误");
        }
        console.log("login", data);
      } else if (username && !password) {
        terminal.writeErrorOutput("缺少密码");
      } else if (password && !username) {
        terminal.writeErrorOutput("缺少账号");
      } else {
        const outputs = terminal.getAllOutput();
        const LoginBoxComponent = await import("../login/LoginBox");
        for (let i = 0; i < outputs.length; i++) {
          const output = outputs[i];
          if (output.type === "component") {
            if (output.componentName === "loginBox") {
              terminal.removeOutput(i);
              break;
            }
          }
        }
        terminal.unfocusInput();
        terminal.writeComponentOutput({
          type: "component",
          component: LoginBoxComponent.default,
          componentName: "loginBox",
          onlyOne: true,
        });
      }
      console.log(options);
    } catch (error) {
      console.log("err", error);
      terminal.writeErrorOutput("登陆出错了");
    }
  },
};

export default loginCommand;
