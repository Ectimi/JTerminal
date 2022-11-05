import { CommandType } from '../../../command';
import { Table } from '@mantine/core';

interface IProps {
  commandList: CommandType[];
}

export default function Help(props: IProps) {
  const { commandList = [] } = props;

  return (
    <Table>
      <tbody>
        <tr>
            <td>命令列表</td>
            <td></td>
            <td></td>
        </tr>
        {commandList.map((command) => (
          <tr key={command.func}>
            <td>{command.func}</td>
            <td>{command.name}</td>
            <td>{command.desc || ''}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
