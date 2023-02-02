// import { Flex, Image, SimpleGrid, Space, Text } from '@mantine/core';
import { createPortal } from 'react-dom';
import {
  Image,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from '@react-pdf/renderer';
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
import html2canvas from 'html2canvas';
import ListSignImg from '@/assets/images/theme/01/list_sign.png';

interface IModuleRenderer {
  moduleName: string;
  list: IResumeModuleItem[][];
}

const styles = StyleSheet.create({
  space: { width: 12, height: 0 },
  flexAlignCenter: { display: 'flex', alignItems: 'center' },
  flexSpaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
    backgroundColor: '#000',
  },

  listSign: { width: 20, height: 20, marginRight: 30 },
  basicInfoGrid: { display: 'flex', gap: 12, width: 600 },
  infoLabel: { width: 70 },
  flexItem: { display: 'flex', alignItems: 'center', marginTop: 10 },
});

const DimmedOrBlackText = ({
  value = '',
  placeholder = '未填写',
}: {
  value?: string;
  placeholder?: string;
  className?: string;
}) => {
  const styles = StyleSheet.create({
    text: { color: value ? 'black' : 'dimmed' },
  });
  return <Text style={styles.text}>{value ? value : placeholder}</Text>;
};

const ListSign = () => <Image src={ListSignImg} style={styles.listSign} />;

const GenerateRichTextImg = async (params: {
  placeholder: string;
  htmlText: string;
}) => {
  const id = '@@__RichText__Temp__@@';
  const { placeholder, htmlText } = params;

  const RichText = () => (
    <div style={{ zIndex: -1 }}>
      {htmlText ? (
        <div dangerouslySetInnerHTML={{ __html: htmlText }}></div>
      ) : (
        <DimmedOrBlackText placeholder={placeholder} />
      )}
    </div>
  );

  createPortal(<RichText />, document.body);

  const canvas = await html2canvas(document.getElementById(id)!);
  return canvas.toDataURL();
};

export function ModuleItemRenderer({ moduleName, list }: IModuleRenderer) {
  switch (moduleName) {
    case EResumeModuleType.basic:
      const arr = list[0];
      return (
        <View style={styles.basicInfoGrid}>
          {arr.map(({ label, value }) => (
            <View style={styles.flexAlignCenter} key={label}>
              <Text style={styles.infoLabel}>{label}</Text>：
              <DimmedOrBlackText value={value} />
            </View>
          ))}
        </View>
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
            const richTextImgUrl = GenerateRichTextImg({
              placeholder: '专业描述',
              htmlText: data.detail,
            });
            return (
              <View key={index}>
                <View style={styles.flexSpaceBetween}>
                  <View style={styles.flexAlignCenter}>
                    <View style={styles.circleIcon}></View>
                    <View style={styles.flexAlignCenter}>
                      <DimmedOrBlackText
                        value={data.startTime}
                        placeholder="入学时间"
                      />
                      <View style={styles.space} />
                      -
                      <View style={styles.space} />
                      <DimmedOrBlackText
                        value={data.endTime}
                        placeholder="毕业时间"
                      />
                    </View>
                  </View>
                  <DimmedOrBlackText
                    value={data.schoolName}
                    placeholder="学校名称"
                  />
                  <View style={styles.flexAlignCenter}>
                    <DimmedOrBlackText
                      value={data.highestEducation}
                      placeholder="最高学历"
                    />
                    /
                    <DimmedOrBlackText
                      value={data.majorName}
                      placeholder="专业名称"
                    />
                  </View>
                </View>

                <Image src={richTextImgUrl} />
              </View>
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
            const richTextImgUrl = GenerateRichTextImg({
              placeholder: '经历描述',
              htmlText: data.detail,
            });
            return (
              <View key={index}>
                <View style={styles.flexSpaceBetween}>
                  <View style={styles.flexAlignCenter}>
                    <View style={styles.circleIcon}></View>
                    <View style={styles.flexAlignCenter}>
                      <DimmedOrBlackText
                        value={data.startTime}
                        placeholder="开始时间"
                      />
                      <View style={styles.space} />
                      -
                      <View style={styles.space} />
                      <DimmedOrBlackText
                        value={data.endTime}
                        placeholder="结束时间"
                      />
                    </View>
                  </View>
                  <DimmedOrBlackText
                    value={data.schoolName}
                    placeholder="学校名称"
                  />
                  <DimmedOrBlackText
                    value={data.department}
                    placeholder="社团/部门名称"
                  />
                </View>
                <Image src={richTextImgUrl} />
              </View>
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
            const richTextImgUrl = GenerateRichTextImg({
              placeholder: '专业技能描述',
              htmlText: data.detail,
            });
            return <Image src={richTextImgUrl} key={index} />;
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
            const richTextImgUrl = GenerateRichTextImg({
              placeholder: '岗位职责描述',
              htmlText: data.detail,
            });
            return (
              <View key={index}>
                <View style={styles.flexSpaceBetween}>
                  <View style={styles.flexAlignCenter}>
                    <View style={styles.circleIcon} />
                    <View style={styles.flexAlignCenter}>
                      <DimmedOrBlackText
                        value={data.startTime}
                        placeholder="入职时间"
                      />
                      <View style={styles.space} />
                      -
                      <View style={styles.space} />
                      <DimmedOrBlackText
                        value={data.endTime}
                        placeholder="离职时间"
                      />
                    </View>
                  </View>
                  <DimmedOrBlackText
                    value={data.company}
                    placeholder="公司名称"
                  />
                  <DimmedOrBlackText value={data.post} placeholder="岗位" />
                </View>
                <Image src={richTextImgUrl} key={index} />
              </View>
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
            const describeRichTextImgUrl = GenerateRichTextImg({
              placeholder: '项目描述',
              htmlText: data.describe,
            });
            const frameworkRichTextImgUrl = GenerateRichTextImg({
              placeholder: '项目框架描述',
              htmlText: data.framework,
            });
            const responsibilityRichTextImgUrl = GenerateRichTextImg({
              placeholder: '项目职责描述',
              htmlText: data.responsibility,
            });
            return (
              <div className="educationItem" key={index}>
                <View style={styles.flexAlignCenter}>
                  <ListSign />
                  <Text>所属公司：</Text>
                  <DimmedOrBlackText
                    value={data.company}
                    placeholder="所属公司"
                  />
                </View>

                <View style={styles.flexItem}>
                  <ListSign />
                  <Text>项目名称：</Text>
                  <DimmedOrBlackText value={data.name} placeholder="项目名称" />
                </View>

                <View style={styles.flexItem}>
                  <ListSign />
                  <Text>项目时间：</Text>
                  <View style={styles.flexAlignCenter}>
                    <DimmedOrBlackText
                      value={data.startTime}
                      placeholder="开始时间"
                    />
                    <View style={styles.space} />
                    -
                    <View style={styles.space} />
                    <DimmedOrBlackText
                      value={data.endTime}
                      placeholder="结束时间"
                    />
                  </View>
                </View>

                <View style={styles.flexItem}>
                  <ListSign />
                  <Text>项目描述：</Text>
                </View>

                <Image src={describeRichTextImgUrl} />

                <View style={styles.flexItem}>
                  <ListSign />
                  <Text>项目架构：</Text>
                </View>

                <Image src={frameworkRichTextImgUrl} />

                <View style={styles.flexItem}>
                  <ListSign />
                  <Text>项目职责：</Text>
                </View>

                <Image src={responsibilityRichTextImgUrl} />
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
            const richTextImgUrl = GenerateRichTextImg({
              placeholder: '荣誉奖励描述',
              htmlText: data.detail,
            });
            return <Image src={richTextImgUrl} key={index} />;
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
            const richTextImgUrl = GenerateRichTextImg({
              placeholder: '自我评价描述',
              htmlText: data.detail,
            });
            return <Image src={richTextImgUrl} key={index} />;
          })}
        </>
      );
  }
}
