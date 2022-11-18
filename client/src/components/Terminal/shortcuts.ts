interface ShortcutType {
  code: string; // 按键码
  desc?: string; // 功能描述
  keyDesc?: string; // 按键描述
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  action: (e: Event, terminal: JTerminal.TerminalType) => void;
}

export const shortcutList: ShortcutType[] = [
  {
    desc: '清屏',
    code: 'KeyL',
    keyDesc: 'Ctrl + L',
    ctrlKey: true,
    action(e, terminal) {
      e.preventDefault();
      terminal.clear();
    },
  },
];

export const registerShortcuts = (terminal: JTerminal.TerminalType) => {
  document.onkeydown = (e) => {
    // console.log(e);
    let key = e.key;
    // 自动聚焦输入框
    if (key >= 'a' && key <= 'z' && !e.metaKey && !e.shiftKey && !e.ctrlKey) {
      terminal.focusInput();
      return;
    }
    // 匹配快捷键
    let code = e.code;
    for (const shortcut of shortcutList) {
      if (
        code === shortcut.code &&
        e.ctrlKey == !!shortcut.ctrlKey &&
        e.metaKey == !!shortcut.metaKey &&
        e.shiftKey == !!shortcut.shiftKey
      ) {
        shortcut.action(e, terminal);
      }
    }
  };
};
