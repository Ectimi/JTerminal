import { CommandType } from '../../../../command';
import './index.less';

interface IProps {
  commad: CommandType;
  parentCommand: CommandType;
}

export default function CommandHelpBox() {
  return <div className="command-help-box"></div>;
}
