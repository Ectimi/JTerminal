import { Grid } from '@mantine/core';
import { useSafeState } from 'ahooks';
import ResumeEditor from './Editor';
import ResumePreview from './Preview';
import { resumeModule } from './resumeModule';

const initialFormData = resumeModule.reduce((prev, cur) => {
  prev[cur.moduleName] = {};
  cur.list.map((item) => {
    prev[cur.moduleName][item.propName] = item.defaultValue || '';
  });
  return prev;
}, {} as Record<string, any>);

export default function ResumePage() {
  const [formData,setFormData] = useSafeState(initialFormData)

  return (
    <Grid sx={{ margin: 0, height: '100%' }}>
      <Grid.Col span={6} sx={{ height: '100%' }}>
        <ResumeEditor formData={formData} setFormData={setFormData} />
      </Grid.Col>
      <Grid.Col span={6} sx={{ height: '100%', overflowY: 'auto' }}>
        <ResumePreview data={formData} />
      </Grid.Col>
    </Grid>
  );
}
