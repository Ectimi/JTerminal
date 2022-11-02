export const parseDay = (num: number) => {
  const dayMap = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
  };
  return (dayMap as any)[num];
};
