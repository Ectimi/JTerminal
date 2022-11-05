import { CommandType } from '../../../command';
import { Table } from '@mantine/core';
import { commandList,commandMap } from '../../../commandRegister';
import './help.less'

interface IProps {
  type: 'all'| 'specific';
}

export default function Help(props: IProps) {
  const { type } = props;

  return (
    <Table className='command-list_table'>
      <thead>
        <tr>
          <th>命令列表</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {commandList.map((command) => (
          <tr key={command.func} >
            <td>{command.func}</td>
            <td>{command.name}</td>
            <td>{command.desc || ''}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
