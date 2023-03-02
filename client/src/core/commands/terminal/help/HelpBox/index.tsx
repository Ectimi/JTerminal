import { CommandType } from '@/core/command';
import { Table } from '@mantine/core';
import { useSafeState } from 'ahooks';
import { useEffect } from 'react';
import { getCommand } from '../../../../commandRegister';
import './index.less';

export default function Helpbox() {
  const [commandList, setCommandList] = useSafeState<CommandType[]>([]);
  useEffect(() => {
    getCommand().then(({ commandList }) => setCommandList(commandList));
  },[]);

  return (
    <Table className="command-list_table">
      <thead>
        <tr>
          <th>命令列表</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
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
