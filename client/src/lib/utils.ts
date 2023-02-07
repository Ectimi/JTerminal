export const parseDay = (num: number) => {
  const dayMap = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  return (dayMap as any)[num];
};

export const getType = (obj: any) => {
  const class2type = {} as any;

  // 生成class2type映射
  'Boolean Number String Function Array Date RegExp Object Error'
    .split(' ')
    .map((item) => (class2type['[object ' + item + ']'] = item.toLowerCase()));

  if (obj == null) {
    return obj + '';
  }

  return typeof obj === 'object' || typeof obj === 'function'
    ? class2type[Object.prototype.toString.call(obj)] || 'object'
    : typeof obj;
};

export const isDate = (obj: any) => getType(obj) === 'date';

export const genUid = (length = 20) => {
  const soupLength = genUid.soup_.length;
  const id = [];
  for (let i = 0; i < length; i++) {
    id[i] = genUid.soup_.charAt(Math.random() * soupLength);
  }
  return id.join('');
};
genUid.soup_ =
  '!#$%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
