import { Flex, Image, Paper, SimpleGrid, Space, Text } from '@mantine/core';
import {
  EResumeModuleType,
  TEducationProps,
  IResumeModule,
  IResumeModuleItem,
} from '../resumeModule';
import HeaderImg from '@/assets/images/theme/01/header.png';
import HatImg from '@/assets/images/theme/01/hat.png';
import BagImg from '@/assets/images/theme/01/bag.png';
import PenImg from '@/assets/images/theme/01/pencil.png';

import './index.less';

interface IModuleRenderer {
  moduleName: string;
  list: IResumeModuleItem[][];
}

export const BasicThemeResume = ({
  resumeData,
}: {
  resumeData: IResumeModule[];
}) => {
  return (
    <Paper className="BasicThemeResume" shadow="xs" pt="12px">
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
        <div>
          {resumeData.map(({ moduleLabel, moduleName, list }) => (
            <div className="moduleBox">
              <div className="moduleTitle">
                <span className="nameText">{moduleLabel}</span>
              </div>
              <ModuleItemRenderer moduleName={moduleName} list={list} />
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
};

const DimmedOrBlackText = ({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) => (
  <Text className={className} c={text ? 'black' : 'dimmed'}>
    {text ? text : '未填写'}
  </Text>
);

function ModuleItemRenderer({ moduleName, list }: IModuleRenderer) {
  switch (moduleName) {
    case EResumeModuleType.basic:
      const arr = list[0];
      return (
        <SimpleGrid className="basicInfoBox" cols={2} spacing="sm">
          {arr.map(({ label, value }) => (
            <Flex align="center" sx={{ marginTop: '0px' }}>
              <Text className="infoLabel">{label}</Text>：
              <DimmedOrBlackText text={value} />
            </Flex>
          ))}
        </SimpleGrid>
      );

    case EResumeModuleType.education:
      type keys = keyof typeof TEducationProps;
      return (
        <>
          {list.map((items) => {
            const data: { [key in keys]: any } = {} as any;
            items.map(
              ({ propName, value }) => (data[propName as keys] = value)
            );

            return (
              <div className="educationItem">
                <Flex align="center" justify="space-between">
                  <Flex className="timeWrapper" align="center">
                    <div className="circle"></div>
                    <Flex className="time" align="center">
                      <DimmedOrBlackText text={data.startTime} />
                      <Space w="sm" />
                      -
                      <Space w="sm" />
                      <DimmedOrBlackText text={data.endTime} />
                    </Flex>
                  </Flex>
                  <DimmedOrBlackText text={data.schoolName} />
                  <Flex align="center">
                    <DimmedOrBlackText text={data.highestEducation} />
                    /
                    <DimmedOrBlackText text={data.majorName} />
                  </Flex>
                </Flex>
                {data.detail && <div className="detail" dangerouslySetInnerHTML={{__html:data.detail}}></div>}
              </div>
            );
          })}
        </>
      );
    default:
      return <></>;
  }
}
