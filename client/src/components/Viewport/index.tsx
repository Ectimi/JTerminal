import { useRecoilValue } from 'recoil';
import { viewportComponentListState } from '@/store';
import './index.less';
import { Fragment } from 'react';

function Viewport() {
  const componentList = useRecoilValue(viewportComponentListState);
  return (
    <div className="viewport-view">
      {componentList.map(({ component, componentName }) => (
        <Fragment key={componentName}>
          {typeof component === 'function' ? component() : component}
        </Fragment>
      ))}
    </div>
  );
}

export default Viewport;
