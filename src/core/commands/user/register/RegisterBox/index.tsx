import { useContext } from 'react';
import { useRequest } from 'ahooks';
import { useForm } from '@mantine/form';
import { TextInput, Button, Card, LoadingOverlay } from '@mantine/core';
import { localforage } from '@/lib/localForage';
import { Register } from '@/serve/user';
import { TerminalContext } from '@/components/Terminal';
import TerminalInnerWrapper from '@/components/TerminalnnerWrapper';
import './index.less';

export default function RegisterBox() {
  const terminal = useContext(TerminalContext) as JTerminal.TerminalType;

  const { loading, runAsync: doRegister } = useRequest(Register, {
    manual: true,
  });

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (value) => (value.trim() ? null : '请输入账号'),
      password: (value) => (value.trim() ? null : '请输入密码'),
    },
  });

  const onSubmit = async (submitData: any) => {
    try {
      console.log('submit',submitData)
      const data = await doRegister(submitData);
      if (data.success) {
        terminal.writeSuccessOutput('注册成功');
        console.log('register',data)
      } else {
        terminal.writeErrorOutput(data.message || '出错了');
      }
    } catch (err: any) {
      const { name, message } = err;
      terminal.writeErrorOutput(`${name}: ${message}`);
    }
  };

  return (
    <TerminalInnerWrapper className="register-box">
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <Card>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="usename："
            wrapperProps={{ labelElement: 'div' }}
            {...form.getInputProps('username')}
          />
          <TextInput
            label="password："
            type="password"
            wrapperProps={{ labelElement: 'div' }}
            {...form.getInputProps('password')}
          />
          <Button type="submit" mt="sm">
            Register
          </Button>
        </form>
      </Card>
    </TerminalInnerWrapper>
  );
}
