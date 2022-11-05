import { CommandType } from "../../../command";

const helpCommand: CommandType = {
    func:'help',
    name:'查看命令帮助',
    alias:[],
    params:[],
    options:[],
    async action(options,terminal){
        const HelpComponent = await import('./help')
        console.log('help',HelpComponent)
        terminal.writeComponentOutput(HelpComponent.Help)
    }
}

export default helpCommand