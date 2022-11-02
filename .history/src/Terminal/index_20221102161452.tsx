import dayjs from 'dayjs'
import TerminalRow from '../components/TerminalRow'
import './index.less'

function Terminal(){
    return <div className='terminal-view'>
        <TerminalRow>Welcome to JIndex ! </TerminalRow>
        <TerminalRow>Please nput 'help' to enjoy </TerminalRow>
        <TerminalRow>{dayjs().format('YYYY-MM-DD HH:mm:ss')}</TerminalRow>
    </div>
}

export default Terminal