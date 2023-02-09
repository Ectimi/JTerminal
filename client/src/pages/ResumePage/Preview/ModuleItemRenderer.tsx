import { Flex, Image, SimpleGrid, Space, Text } from '@mantine/core';
import {
  EResumeModuleType,
  EEducationProps,
  ECampusProps,
  EProfessionalProps,
  EJobProps,
  EProjectProps,
  EHonourProps,
  EEvaluateProps,
  IResumeModuleItem,
} from '../resumeModule';
import ListSignImg from '@/assets/images/theme/01/list_sign.png';

interface IModuleRenderer {
  moduleName: string;
  list: IResumeModuleItem[][];
}

const DimmedOrBlackText = ({
  value = '',
  placeholder = '未填写',
}: {
  value?: string;
  placeholder?: string;
}) => <Text c={value ? 'black' : 'dimmed'}>{value ? value : placeholder}</Text>;

const ListSign = () => (
  <Image
    src={ListSignImg}
    width={20}
    height={20}
    style={{ marginRight: '10px' }}
  />
);

const RichText = (props: { placeholder: string; htmlText: string }) => {
  const { placeholder, htmlText } = props;
  return (
    <div style={{ marginTop: '10px' }}>
      {htmlText ? (
        <div dangerouslySetInnerHTML={{ __html: htmlText }}></div>
      ) : (
        <DimmedOrBlackText placeholder={placeholder} />
      )}
    </div>
  );
};

export function ModuleItemRenderer({ moduleName, list }: IModuleRenderer) {
  switch (moduleName) {
    case EResumeModuleType.profile:
      const url = list[0][0].value;
      return (
        url && (
          <Image
            src={url}
            width={125}
            height={130}
            // fit="contain"
            sx={{
              position: 'absolute',
              top: '90px',
              right: '20px',
              backgroundColor: '#fafafa',
              borderRadius: '4px',
              border: '1px solid #d9d9d9',
              zIndex:100
            }}
          />
        )
      );
    case EResumeModuleType.basic:
      const arr = list[0];
      return (
        <SimpleGrid className="basicInfoBox" cols={2} spacing="sm">
          {arr.map(({ label, value },index) => (
            <Flex align="center" sx={{ marginTop: '0px' }} key={label}>
              <Text className="infoLabel">{label}</Text>：
              <DimmedOrBlackText value={value} />
            </Flex>
          ))}
        </SimpleGrid>
      );

    case EResumeModuleType.education:
      type EducationPropsKeys = keyof typeof EEducationProps;
      return (
        <>
          {list.map((items, index) => {
            const data: { [key in EducationPropsKeys]: string } = {} as any;
            items.map(
              ({ propName, value }) =>
                (data[propName as EducationPropsKeys] = value)
            );
            return (
              <div className="educationItem" key={index}>
                <Flex align="center" justify="space-between">
                  <Flex className="timeWrapper" align="center">
                    <div className="circleIcon"></div>
                    <Flex className="time" align="center">
                      <DimmedOrBlackText
                        value={data.startTime}
                        placeholder="入学时间"
                      />
                      <Space w="sm" />
                      -
                      <Space w="sm" />
                      <DimmedOrBlackText
                        value={data.endTime}
                        placeholder="毕业时间"
                      />
                    </Flex>
                  </Flex>
                  <DimmedOrBlackText
                    value={data.schoolName}
                    placeholder="学校名称"
                  />
                  <Flex align="center">
                    <DimmedOrBlackText
                      value={data.highestEducation}
                      placeholder="最高学历"
                    />
                    /
                    <DimmedOrBlackText
                      value={data.majorName}
                      placeholder="专业名称"
                    />
                  </Flex>
                </Flex>
                <RichText placeholder="专业描述" htmlText={data.detail} />
              </div>
            );
          })}
        </>
      );

    case EResumeModuleType.campus:
      type CampusPropsKeys = keyof typeof ECampusProps;
      return (
        <>
          {list.map((items, index) => {
            const data: { [key in CampusPropsKeys]: any } = {} as any;
            items.map(
              ({ propName, value }) =>
                (data[propName as CampusPropsKeys] = value)
            );
            return (
              <div className="campusItem" key={index}>
                <Flex align="center" justify="space-between">
                  <Flex className="timeWrapper" align="center">
                    <div className="circleIcon"></div>
                    <Flex className="time" align="center">
                      <DimmedOrBlackText
                        value={data.startTime}
                        placeholder="开始时间"
                      />
                      <Space w="sm" />
                      -
                      <Space w="sm" />
                      <DimmedOrBlackText
                        value={data.endTime}
                        placeholder="结束时间"
                      />
                    </Flex>
                  </Flex>
                  <DimmedOrBlackText
                    value={data.schoolName}
                    placeholder="学校名称"
                  />
                  <DimmedOrBlackText
                    value={data.department}
                    placeholder="社团/部门名称"
                  />
                </Flex>
                <RichText placeholder="经历描述" htmlText={data.detail} />
              </div>
            );
          })}
        </>
      );

    case EResumeModuleType.professional:
      type ProfessionalPropsKeys = keyof typeof EProfessionalProps;
      return (
        <>
          {list.map((items, index) => {
            const data: { [key in ProfessionalPropsKeys]: any } = {} as any;
            items.map(
              ({ propName, value }) =>
                (data[propName as ProfessionalPropsKeys] = value)
            );
            return (
              <div className="professionalItem" key={index}>
                <RichText placeholder="专业技能描述" htmlText={data.detail} />
              </div>
            );
          })}
        </>
      );

    case EResumeModuleType.job:
      type JobPropsKeys = keyof typeof EJobProps;
      return (
        <>
          {list.map((items, index) => {
            const data: { [key in JobPropsKeys]: string } = {} as any;
            items.map(
              ({ propName, value }) => (data[propName as JobPropsKeys] = value)
            );
            return (
              <div className="jobItem" key={index}>
                <Flex align="center" justify="space-between">
                  <Flex className="timeWrapper" align="center">
                    <div className="circleIcon"></div>
                    <Flex className="time" align="center">
                      <DimmedOrBlackText
                        value={data.startTime}
                        placeholder="入职时间"
                      />
                      <Space w="sm" />
                      -
                      <Space w="sm" />
                      <DimmedOrBlackText
                        value={data.endTime}
                        placeholder="离职时间"
                      />
                    </Flex>
                  </Flex>
                  <DimmedOrBlackText
                    value={data.company}
                    placeholder="公司名称"
                  />
                  <DimmedOrBlackText value={data.post} placeholder="岗位" />
                </Flex>
                <RichText placeholder="岗位职责描述" htmlText={data.detail} />
              </div>
            );
          })}
        </>
      );

    case EResumeModuleType.project:
      type ProjectPropsKeys = keyof typeof EProjectProps;
      return (
        <>
          {list.map((items, index) => {
            const data: { [key in ProjectPropsKeys]: string } = {} as any;
            items.map(
              ({ propName, value }) =>
                (data[propName as ProjectPropsKeys] = value)
            );
            return (
              <div className="projectItem" key={index}>
                <Flex align="center">
                  <ListSign />
                  <Text>所属公司：</Text>
                  <DimmedOrBlackText
                    value={data.company}
                    placeholder="所属公司"
                  />
                </Flex>

                <Flex align="center" sx={{ marginTop: '10px' }}>
                  <ListSign />
                  <Text>项目名称：</Text>
                  <DimmedOrBlackText value={data.name} placeholder="项目名称" />
                </Flex>

                <Flex align="center" sx={{ marginTop: '10px' }}>
                  <ListSign />
                  <Text>项目时间：</Text>
                  <Flex className="time" align="center">
                    <DimmedOrBlackText
                      value={data.startTime}
                      placeholder="开始时间"
                    />
                    <Space w="sm" />
                    -
                    <Space w="sm" />
                    <DimmedOrBlackText
                      value={data.endTime}
                      placeholder="结束时间"
                    />
                  </Flex>
                </Flex>

                <Flex align="center" sx={{ marginTop: '10px' }}>
                  <ListSign />
                  <Text>项目描述：</Text>
                </Flex>

                <RichText placeholder="项目描述" htmlText={data.describe} />

                <Flex align="center" sx={{ marginTop: '10px' }}>
                  <ListSign />
                  <Text>项目架构：</Text>
                </Flex>

                <RichText placeholder="项目架构" htmlText={data.framework} />

                <Flex align="center" sx={{ marginTop: '10px' }}>
                  <ListSign />
                  <Text>项目职责：</Text>
                </Flex>

                <RichText
                  placeholder="项目职责描述"
                  htmlText={data.responsibility}
                />
              </div>
            );
          })}
        </>
      );

    case EResumeModuleType.honour:
      type HonourPropsKeys = keyof typeof EHonourProps;
      return (
        <>
          {list.map((items, index) => {
            const data: { [key in HonourPropsKeys]: string } = {} as any;
            items.map(
              ({ propName, value }) =>
                (data[propName as HonourPropsKeys] = value)
            );
            return (
              <div className="honourItem" key={index}>
                <RichText placeholder="荣誉奖励描述" htmlText={data.detail} />
              </div>
            );
          })}
        </>
      );

    case EResumeModuleType.evaluate:
      type EvaluatePropsKeys = keyof typeof EEvaluateProps;
      return (
        <>
          {list.map((items, index) => {
            const data: { [key in EvaluatePropsKeys]: string } = {} as any;
            items.map(
              ({ propName, value }) =>
                (data[propName as EvaluatePropsKeys] = value)
            );
            return (
              <div className="evaluateItem" key={index}>
                <RichText placeholder="自我评价描述" htmlText={data.detail} />
              </div>
            );
          })}
        </>
      );

    default:
      return <></>;
  }
}
