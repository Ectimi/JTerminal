import { useRecoilValue } from 'recoil';
import { Grid } from '@mantine/core';
import { state, appGridSpanSelector } from './store';
import Terminal from './Terminal';
import Viewport from './Viewport';
import './App.css';

function App() {
  const isShowViewport = useRecoilValue(state);

  return (
    <Grid className="App">
      <Grid.Col span={6}>
        <Terminal />
      </Grid.Col>
      <Grid.Col span={6}>
        <Viewport />
      </Grid.Col>
    </Grid>
  );
}

export default App;
