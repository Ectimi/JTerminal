import { useRecoilState, useRecoilValue } from "recoil";
import { viewportVisibleState, viewportComponentListState } from "./store";
import { Transition } from "@mantine/core";
import Terminal from "./components/Terminal";
import Viewport from "./components/Viewport";
import expandSvg from "@/assets/images/expand.svg";
import collapse from "@/assets/images/collapse.svg";
import "./App.less";

const scaleX = {
  in: { opacity: 1, transform: "scaleX(1)" },
  out: { opacity: 0, transform: "scaleX(0)" },
  common: { transformOrigin: "100% 100%" },
  transitionProperty: "transform, opacity",
};
const slide = {
  in: { opacity: 1, right:'840px'},
  out: { opacity: 0, right:0 },
  transitionProperty: "right, opacity",
};

function App() {
  const [visible, setVisible] = useRecoilState(viewportVisibleState);
  const viewportComponentList = useRecoilValue(viewportComponentListState);

  return (
    <div className="App">
      <div className="terminal-container">
        <Terminal />
      </div>
      <Transition
        mounted={visible}
        transition={scaleX}
        duration={200}
      >
        {(styles) => (
          <div
            className="viewport-container"
            style={{ ...styles, width: visible ? "830px" : 0 }}
          >
            <Viewport />
          </div>
        )}
      </Transition>
      {viewportComponentList.length ? (
        <Transition
          mounted={viewportComponentList.length > 0}
          transition={slide}
          duration={200}
        >
          {(styles) => (
            <img
              src={visible ? collapse : expandSvg}
              className="switch-button"
              style={{ ...styles, right: visible ? "830px" : 0 }}
              onClick={() => {
                visible ? setVisible(false) : setVisible(true);
              }}
            />
          )}
        </Transition>
      ) : null}
    </div>
  );
}

export default App;
