import { CommandType } from '../../command';

const pingCommand: CommandType = {
  func: 'ping',
  name: 'ping',
  desc: '检测某个地址是否存活',
  alias: [],
  params: [
    {
      key: 'dest',
      desc: '目标地址',
      required: true,
    },
  ],
  options: [
    {
      key: 'timeout',
      desc: '请求超时时间(单位:毫秒)',
      alias: ['t'],
      type: 'string',
      defaultValue: '3000',
    },
  ],
  async action(options, terminal, parentCommand) {
    const { _ } = options;
    const { timeout = '3000' } = options;
    if (_.length < 1) {
      terminal.writeErrorOutput('参数不足');
      return;
    }
    var dest = _[0];
    if (
      !dest.toLowerCase().startsWith('http://') &&
      !dest.toLowerCase().startsWith('https://')
    ) {
      dest = 'https://' + dest;
    }
    if (dest.toLowerCase().startsWith('http://')) {
      dest = dest.replace('http://', 'https://');
    }
    const startTime = new Date().getTime();
    const res = await Promise.race([
      new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('timeout')), Number(timeout));
      }),
      fetch(dest, { mode: 'no-cors', cache: 'reload' }),
    ])
      .then((resp: any) => {
        if (resp.ok || resp.status == 200 || resp.type == 'opaque') {
          console.log(resp);
          const finishTime = new Date().getTime();
          terminal.writeSuccessOutput('目标地址正常');
          terminal.writeInfoOutput(
            `延迟=${(finishTime - startTime).toString()}ms`
          );
        } else {
          terminal.writeErrorOutput('ping 不通！');
        }
      })
      .catch((error) => {
        console.log(error);
        terminal.writeErrorOutput('ping 不通！');
      });
  },
};

export default pingCommand;
