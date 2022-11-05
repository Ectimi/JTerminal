import { CommandType } from '../../../command';
import { Table } from '@mantine/core';

interface IProps {
  commandList: CommandType[];
}

export default function Help(props: IProps) {
  const { commandList = [] } = props;

  return (
    <Table>
      <thead>
        <tr style={{color:'#fff'}}>
          <th>命令列表</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {commandList.map((command) => (
          <tr key={command.func}  style={{color:'#fff'}}>
            <td>{command.func}</td>
            <td>{command.name}</td>
            <td>{command.desc || ''}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
