import * as os from 'os';

export function getIpAddress(): string {
  const ifaces = os.networkInterfaces();

  for (const dev in ifaces) {
    const iface = ifaces[dev];

    for (let i = 0; i < iface.length; i++) {
      const { family, address, internal } = iface[i];

      if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
        return address;
      }
    }
  }
}
