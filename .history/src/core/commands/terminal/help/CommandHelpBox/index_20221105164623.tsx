import { CommandType } from '../../../../command';
import './index.less';

interface IProps {
  command: CommandType;
  parentCommand: CommandType | undefined;
}

export default function CommandHelpBox(props:IProps) {
  return <div className="command-help-box"></div>;
}
