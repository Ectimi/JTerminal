import { CommandType } from '../../../command';
import { Table } from '@mantine/core';

interface IProps {
  commandList: CommandType[];
}

export default function Help(props: IProps) {
  const { commandList = [] } = props;

  return (
    <Table className='command-list_table'>
      <thead>
        <tr>
          <th style={{color:'#fff'}}>命令列表</th>
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
