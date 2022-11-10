import { useSafeState } from 'ahooks';
import { ActionIcon, Badge, Tabs } from '@mantine/core';
import { IconX } from '@tabler/icons';
import { useRecoilValue } from 'recoil';
import { viewportComponentListState } from '@/store';
import './index.less';

function Viewport() {
  const componentList = useRecoilValue(viewportComponentListState);
  const [activeTab, setActiveTab] = useSafeState(
    componentList[0].componentName
  );

  return (
    <div className="viewport-view">
      <Tabs
        className='compoent-tab'
        variant="pills"
        value={activeTab}
        onTabChange={(value: string) => setActiveTab(value)}
      >
        <Tabs.List className='component-tablist'>
          {componentList.map(({ componentName }) => (
            <Tabs.Tab
              value={componentName}
              key={componentName}
              className="component-tab-item"
            >
              <Badge
                color={componentName === activeTab ? 'blue' : 'dark'}
                component="div"
                variant="outline"
                sx={{ paddingRight: 6 }}
                rightSection={
                  <IconX size={10} />
                }
              >
                {componentName}
              </Badge>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        {componentList.map(({ component, componentName }) => (
          <Tabs.Panel value={componentName} pt="xs" key={componentName} className="component-tabpanel">
            {typeof component === 'function' ? component() : component}
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
}

export default Viewport;
