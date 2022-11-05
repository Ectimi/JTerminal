import { CommandType } from '../../../command';
import { Table } from '@mantine/core';

interface IProps {
  commands: CommandType[];
}

export default function Help(props: IProps) {
  const { commands = [] } = props;

  return (
    <Table>
      <thead>
        <tr>
          <th>命令列表</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {commands.map((command) => (
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
