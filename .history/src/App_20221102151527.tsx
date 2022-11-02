import { Routes, Route } from 'react-router-dom';
import { Grid } from '@mantine/core';
import Terminal from './Terminal';
import Viewport from './Viewport';
import './App.css';

function App() {
  return (
    <div className="App">
      <Grid>
        <Grid.Col span={6}>
          <Terminal />
        </Grid.Col>
        <Grid.Col span={6}>
          <Viewport />
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default App;
