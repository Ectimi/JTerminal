import { useRecoilValue } from 'recoil';
import { Grid } from '@mantine/core';
import { state, appGridSpanSelector } from './store';
import Terminal from './Terminal';
import Viewport from './Viewport';
import './App.css';

function App() {
  const { terminalSpan, viewportSpan } = useRecoilValue(appGridSpanSelector);

  return (
    <Grid className="App">
      <Grid.Col span={terminalSpan}>
        <Terminal />
      </Grid.Col>
      {viewportSpan === 0 ? null : (
        <Grid.Col span={viewportSpan}>
          <Viewport />
        </Grid.Col>
      )}
    </Grid>
  );
}

export default App;
