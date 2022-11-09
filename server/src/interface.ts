export interface IControllerReturn {
  success: boolean;
  message: string;
  data: any;
}

export type TTheme = 'light' | 'dark' | 'system';
export interface IUserSetting {
  theme: TTheme;
  labelsSort: number[];
  defaultExpandLabel: boolean;
  openInNewTab: boolean;
}
