import { useRecoilValue } from 'recoil';
import { Grid } from '@mantine/core';
import { appGridSpanState } from './store';
import Terminal from './components/Terminal';
import Viewport from './components/Viewport';
import './App.less';

function App() {
  const { terminalSpan, viewportSpan } = useRecoilValue(appGridSpanState);

  return (
    <Grid className="App">
      <Grid.Col span={terminalSpan} className='terminal-container'>
        <Terminal />
      </Grid.Col>
      {viewportSpan === 0 ? null : (
        <Grid.Col
          span={viewportSpan}
          className='viewport-container'
        >
          <Viewport />
        </Grid.Col>
      )}
    </Grid>
  );
}

export default App;

// import { useRecoilValue,useRecoilCallback } from 'recoil';
// import { viewportVisibleState } from './store';
// import Terminal from './components/Terminal';
// import Viewport from './components/Viewport';
// import './App.less';

// function App() {
//   const viewportVisible = useRecoilValue(viewportVisibleState);

//   return (
//     <div className="App">
//       <div className="terminal-container">
//         <Terminal />
//       </div>
//       <div
//         className="viewport-container"
//         style={{ width: viewportVisible ? '50%' : 0 }}
//       >
//         <Viewport />
//       </div>
//     </div>
//   );
// }

// export default App;
