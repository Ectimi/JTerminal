import { Image, Paper } from '@mantine/core';
import { IResumeModule } from '../resumeModule';
import HeaderImg from '@/assets/images/theme/01/header.png';

import './index.less';

interface IResumePreview {
  resumeData: IResumeModule[];
}

export default function ResumePreview({ resumeData }: IResumePreview) {
  return (
    <div className="ResumePreview">
      <Paper className="paper" shadow="xs" p="sm">
        {/* <Image src={HeaderImg}/> */}
        preview
      </Paper>
    </div>
  );
}
