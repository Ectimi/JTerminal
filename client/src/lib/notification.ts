import { NotificationProps, showNotification } from '@mantine/notifications';

export enum ENotificationType {
  'success',
  'error',
  'wran',
}

const defaultStyle: React.CSSProperties = {
  position: 'fixed',
  top: '10px',
  right: '10px',
  width: '300px',
};

const color: any = {
  success: 'blue',
  wran: 'yellow',
  error: 'red',
};

export const ShowNotification = ({
  type = 'success',
  message = '',
  title = '',
  style = {},
}: NotificationProps & { type?: 'success' | 'error' | 'warn' }) => {
  showNotification({
    color: color[type],
    title,
    message,
    style: { ...defaultStyle, ...style },
  });
};
