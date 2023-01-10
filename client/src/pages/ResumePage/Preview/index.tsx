import { Image, Paper } from '@mantine/core';
import HeaderImg from '@/assets/images/theme/01/header.png';

import './index.less';

interface IResumePreview {
  data: any;
}

export default function ResumePreview({ data }: IResumePreview) {
  return (
    <div className="ResumePreview">
      <Paper className="paper" shadow="xs" p="sm">
        <Image src={HeaderImg}/>
        preview
      </Paper>
    </div>
  );
}
