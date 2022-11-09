import { useRecoilValue } from 'recoil';
import { Grid } from '@mantine/core';
import { appGridSpanState } from './store';
import Terminal from './components/Terminal';
import Viewport from './components/Viewport';
import './App.css';

function App() {
  const { terminalSpan, viewportSpan } = useRecoilValue(appGridSpanState);

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
