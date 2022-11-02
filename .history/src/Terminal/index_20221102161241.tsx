import TerminalRow from '../components/TerminalRow'
import './index.less'

function Terminal(){
    return <div className='terminal-view'>
        <TerminalRow>Welcome to JIndex ! Please nput 'help' to enjoy</TerminalRow>
        <TerminalRow>Author j : </TerminalRow>
    </div>
}

export default Terminal