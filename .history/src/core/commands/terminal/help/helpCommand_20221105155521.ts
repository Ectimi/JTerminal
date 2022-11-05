import { CommandType } from "../../../command";

const helpCommand: CommandType = {
    func:'help',
    name:'查看命令帮助',
    alias:[],
    async action(options,terminal){
        const HelpComponent = await import('./help')
        terminal.writeComponentOutput(HelpComponent)
    }
}

export default helpCommand