import { useRecoilState, useRecoilValue } from 'recoil';
import { viewportVisibleState, viewportComponentListState } from '@/store';
import { Transition } from '@mantine/core';
import Terminal from '@/components/Terminal';
import Viewport from '@/components/Viewport';
import expandSvg from '@/assets/images/expand.svg';
import collapse from '@/assets/images/collapse.svg';
import './index.less';

const scaleX = {
  in: { opacity: 1, transform: 'scaleX(1)' },
  out: { opacity: 0, transform: 'scaleX(0)' },
  common: { transformOrigin: '100% 100%' },
  transitionProperty: 'transform, opacity',
};

function TerminalPage() {
  const [visible, setVisible] = useRecoilState(viewportVisibleState);
  const viewportComponentList = useRecoilValue(viewportComponentListState);

  return (
    <div className="terminal-page">
      <div className="terminal-container">
        <Terminal />
      </div>
      <Transition mounted={visible} transition={scaleX} duration={200} timingFunction="linear">
        {(styles) => (
          <div
            className="viewport-container"
            style={{ ...styles, width: '750px' }}
          >
            <Viewport />
          </div>
        )}
      </Transition>
      {viewportComponentList.length ? (
        <img
        src={visible ? collapse : expandSvg}
        className="switch-button"
        style={{transform:`translateX(${visible?'-750px':0})`}}
        onClick={() => {
          visible ? setVisible(false) : setVisible(true);
        }}
      />
      ) : null}
    </div>
  );
}

export default TerminalPage;
