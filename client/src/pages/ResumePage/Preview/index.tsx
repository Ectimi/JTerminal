import { Flex, Image, Paper } from '@mantine/core';
import { EResumeModuleType, IResumeModule } from '../resumeModule';

import HatImg from '@/assets/images/theme/01/hat.png';
import BagImg from '@/assets/images/theme/01/bag.png';
import PenImg from '@/assets/images/theme/01/pencil.png';
import { ModuleItemRenderer } from './ModuleItemRenderer';

import './index.less';

interface IResumePreview {
  resumeData: IResumeModule[];
}

export default function ResumePreview({ resumeData }: IResumePreview) {
  return (
    <Flex className="ResumePreview" justify="center" sx={{ height: '100%' }}>
      <Paper className="resume" shadow="xs" pt="12px">
        <div className="header">
          <Flex className="icon" align="center" justify="center">
            <Image src={HatImg} />
          </Flex>
          <Flex className="icon" align="center" justify="center">
            <Image src={BagImg} />
          </Flex>
          <Flex className="icon" align="center" justify="center">
            <Image src={PenImg} />
          </Flex>
        </div>

        <div className="contentBox">
          {resumeData.map(({ moduleLabel, moduleName, list, visible }) =>
            visible ? (
              moduleName === EResumeModuleType.profile ? (
                <ModuleItemRenderer moduleName={moduleName} list={list} key={moduleName} />
              ) : (
                <div className="moduleBox" key={moduleName} >
                  <div className="moduleTitle">
                    <span className="nameText">{moduleLabel}</span>
                  </div>
                  <ModuleItemRenderer moduleName={moduleName} list={list} />
                </div>
              )
            ) : null
          )}
        </div>
      </Paper>
    </Flex>
  );
}
