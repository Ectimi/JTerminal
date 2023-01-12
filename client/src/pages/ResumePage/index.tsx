import { Grid } from '@mantine/core';
import { useSafeState } from 'ahooks';
import ResumeEditor from './Editor';
import ResumePreview from './Preview';
import { defaultResumeModule } from './resumeModule';

const initialFormData = defaultResumeModule.reduce((prev, cur) => {
  prev[cur.moduleName] =[]
  cur.list.map((arr) => {
    const obj = {} as any;
    arr.map((subitem) => {
      obj[subitem.propName] = subitem.defaultValue;
    });
    prev[cur.moduleName].push(obj);
  });
  return prev;
}, {} as Record<string, any>);

export default function ResumePage() {
  const [formData, setFormData] = useSafeState(initialFormData);

  return (
    <Grid sx={{ margin: 0, height: '100%', backgroundColor: '#f1f3f5' }}>
      <Grid.Col span={6} sx={{ height: '100%' }}>
        <ResumeEditor formData={formData} setFormData={setFormData} />
      </Grid.Col>
      <Grid.Col span={6} sx={{ height: '100%', overflowY: 'auto' }}>
        <ResumePreview data={formData} />
      </Grid.Col>
    </Grid>
  );
}
