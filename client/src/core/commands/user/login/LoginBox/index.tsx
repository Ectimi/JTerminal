import { useContext, useEffect, Fragment } from 'react';
import { useRequest, useSafeState } from 'ahooks';
import { useForm } from '@mantine/form';
import {
  Text,
  TextInput,
  PasswordInput,
  Button,
  Card,
  LoadingOverlay,
  Group,
} from '@mantine/core';
import { localforage,updateBookmarks } from '@/lib/localForage';
import { Login } from '@/serve/user';
import { TerminalContext } from '@/components/Terminal';
import TerminalInnerWrapper from '@/components/TerminalnnerWrapper';
import './index.less';

export default function LoginBox() {
  const terminal = useContext(TerminalContext) as JTerminal.TerminalType;
  const [status, setStatus] = useSafeState('unlogin');

  const { loading, runAsync: doLogin } = useRequest(Login, { manual: true });

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
      const data = await doLogin(submitData);
      if (data.success) {
        const outputs = terminal.getAllOutput()
        for(let i=0;i<outputs.length;i++){
          const output = outputs[i]
          if(output.componentName === 'loginBox'){
            terminal.removeOutput(i)
            break;
          }
        }
        terminal.writeSuccessOutput('登陆成功');
        await localforage.setItem('token', data.data.token);
        await localforage.setItem('user', data.data.user);
        await updateBookmarks()
      } else {
        terminal.writeErrorOutput(data.message || '出错了');
      }
    } catch (err: any) {
      const { name, message } = err;
      terminal.writeErrorOutput(`${name}: ${message}`);
    }
  };

  const relogin = () => {
    setStatus('unlogin');
  };

  useEffect(() => {
    localforage.getItem('token').then((token) => {
      if (token) {
        setStatus('login');
      }
    });
  }, []);

  return (
    <Fragment>
      {status === 'login' ? (
        <Group>
          <Text className='success-text'>成功登陆，</Text>
          <Text className='relogin-button' underline onClick={relogin}>若要重新登陆，请点击这里</Text>
        </Group>
      ) : (
        <TerminalInnerWrapper className="login-box">
          <LoadingOverlay visible={loading} overlayBlur={2} />
          <Card>
            <form onSubmit={form.onSubmit(onSubmit)}>
              <TextInput
                label="usename："
                wrapperProps={{ labelElement: 'div' }}
                {...form.getInputProps('username')}
              />
              <PasswordInput
                label="password："
                wrapperProps={{ labelElement: 'div' }}
                {...form.getInputProps('password')}
              />
              <Button type="submit" mt="sm">
                Login
              </Button>
            </form>
          </Card>
        </TerminalInnerWrapper>
      )}
    </Fragment>
  );
}
