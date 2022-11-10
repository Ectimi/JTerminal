import { useRecoilValue } from "recoil";
import { viewportVisibleState } from "./store";
import { Transition } from "@mantine/core";
import Terminal from "./components/Terminal";
import Viewport from "./components/Viewport";
import "./App.less";

const scaleX = {
  in: { opacity: 1, transform: 'scaleX(1)' },
  out: { opacity: 0, transform: 'scaleX(0)' },
  common: { transformOrigin: '100% 100%' },
  transitionProperty: 'transform, opacity',
};

function App() {
  const visible = useRecoilValue(viewportVisibleState);

  return (
    <div className="App">
      <div className="terminal-container">
        <Terminal />
      </div>
      <Transition
        mounted={visible}
        transition={scaleX}
        duration={200}
        timingFunction="ease-in"
      >
        {(styles) => (
          <div
            className="viewport-container"
            style={{...styles, width: visible ? "830px" : 0 }}
          >
            <Viewport />
          </div>
        )}
      </Transition>
    </div>
  );
}

export default App;
