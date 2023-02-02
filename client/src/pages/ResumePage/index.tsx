import { Grid } from '@mantine/core';
import { useImmer } from "use-immer";
import ResumeEditor from './Editor';
import ResumePreview from './Preview';
import cloneDeep from 'lodash/cloneDeep';
import { defaultResumeModule } from './resumeModule';


export default function ResumePage() {
  const [resumeData, setResumeData] = useImmer(cloneDeep(defaultResumeModule));

  return (
    <Grid sx={{ margin: 0, height: '100%', backgroundColor: '#f1f3f5' }}>
      <Grid.Col span={6} sx={{ height: '100%' }}>
        <ResumeEditor resumeData={resumeData} setResumeData={setResumeData} />
      </Grid.Col>
      <Grid.Col span={6} sx={{ height: '100%', overflowY: 'hidden' }}>
        <ResumePreview resumeData={resumeData} />
      </Grid.Col>
    </Grid>
  );
}
