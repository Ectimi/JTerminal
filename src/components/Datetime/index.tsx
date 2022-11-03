import { Fragment, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { parseDay } from '../../lib/utils';

const Datetime = () => {
  const [time, setTime] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    }, 1000);

    return () => clearTimeout(timer);
  });
  return (
    <Fragment>
      {parseDay(dayjs().day())} {time}
    </Fragment>
  );
};

export default Datetime