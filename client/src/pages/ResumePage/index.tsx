import { Grid } from '@mantine/core';
import ResumeEditor from './Editor';
import ResumePreview from './Preview';

export default function ResumePage() {
  return (
    <Grid sx={{ margin: 0 ,height:'100%'}}>
      <Grid.Col span={6} sx={{height:'100%',overflowY:'auto'}}>
        <ResumeEditor />
      </Grid.Col>
      <Grid.Col span={6} sx={{height:'100%',overflowY:'auto'}}>
        <ResumePreview />
      </Grid.Col>
    </Grid>
  );
}
