import { Fragment } from 'react';
import { Text, Space } from '@mantine/core';
import { CommandType } from '../../../../command';
import { getUsageStr, getOptionKeyList } from '../helpUtils';
import './index.less';

interface IProps {
  command: CommandType;
  parentCommand: CommandType | undefined;
}

export default function CommandHelpBox(props: IProps) {
  const { command, parentCommand } = props;
  return (
    <div className="command-help-box">
      <div>命令：{command.name}</div>
      <div>用法：{getUsageStr(command, parentCommand)}</div>

      {command.subCommands?.length ? (
        <Fragment>
          <div>子命令：</div>
          <ul>
            {command.subCommands.map((subCommand) => (
              <li>
                <Text>{subCommand.func}</Text>
                <Space w="xs" />
                <Text>{subCommand.name}</Text>
                <Space w="xs" />
                <Text>{subCommand.desc}</Text>
                <Space w="xs" />
              </li>
            ))}
          </ul>
        </Fragment>
      ) : null}

      {command.params.length ? (
        <Fragment>
          <div>参数：</div>
          <ul>
            {command.params.map((param) => (
              <li>
                {param.key}
                {param.required ? '必填' : '可选'}
                {param.defaultValue ? `默认：${param.defaultValue}` : ''}
                {param.desc}
              </li>
            ))}
          </ul>
        </Fragment>
      ) : null}

      {command.options.length ? (
        <Fragment>
          <div>选项：</div>
          <ul>
            {command.options.map((option) => (
              <li>
                {getOptionKeyList(option).join(', ')}
                {option.required ? '必填' : '可选'}
                {option.defaultValue ? `默认：${option.defaultValue}` : ''}
                {option.desc}
              </li>
            ))}
          </ul>
        </Fragment>
      ) : null}
    </div>
  );
}
