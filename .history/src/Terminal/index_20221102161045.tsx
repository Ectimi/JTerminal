import TerminalRow from '../components/TerminalRow'
import './index.less'

function Terminal(){
    return <div className='terminal-view'>
        <TerminalRow>Welcome to JIndex！</TerminalRow>
        <TerminalRow>Author j : please nput 'help' to enjoy</TerminalRow>
    </div>
}

export default Terminal