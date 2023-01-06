import { Grid } from '@mantine/core';
import ResumeEditor from './Editor';
import ResumePreview from './Preview';

export default function ResumePage() {
  return (
    <Grid sx={{ margin: 0 }}>
      <Grid.Col span={6}>
        <ResumeEditor />
      </Grid.Col>
      <Grid.Col span={6}>
        <ResumePreview />
      </Grid.Col>
    </Grid>
  );
}
