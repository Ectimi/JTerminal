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
                <Text>{param.key}</Text>
                <Space w="xs" />
                <Text>{param.required ? '必填' : '可选'}</Text>
                <Space w="xs" />
                <Text>
                  {param.defaultValue ? `默认：${param.defaultValue}` : ''}
                </Text>
                <Space w="xs" />
                <Text>{param.desc}</Text>
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
                <Text>{getOptionKeyList(option).join(', ')}</Text>{' '}
                <Space w="xs" />
                <Text>{option.required ? '必填' : '可选'}</Text>{' '}
                <Space w="xs" />
                <Text>
                  {option.defaultValue ? `默认：${option.defaultValue}` : ''}
                </Text>{' '}
                <Space w="xs" />
                <Text>{option.desc}</Text> <Space w="xs" />
              </li>
            ))}
          </ul>
        </Fragment>
      ) : null}
    </div>
  );
}
