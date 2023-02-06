import { createPortal } from "react-dom";
import {
  Image,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import { Text as MantineText } from "@mantine/core";
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
  IResumeModule,
} from "../resumeModule";
import html2canvas from "html2canvas";
import cloneDeep from "lodash/cloneDeep";

import ListSignImg from "@/assets/images/theme/01/list_sign.png";

import AlibabaPuHuiTi_2_55_Regular from "@/assets/fonts/AlibabaPuHuiTi_2_55_Regular.ttf";
import HeaderBg from "@/assets/images/theme/01/header.png";
import HatImg from "@/assets/images/theme/01/hat.png";
import BagImg from "@/assets/images/theme/01/bag.png";
import PenImg from "@/assets/images/theme/01/pencil.png";

interface IModuleRenderer {
  moduleName: string;
  list: IResumeModuleItem[][];
}

Font.register({
  family: "AlibabaPuHuiTi_2_55_Regular",
  src: AlibabaPuHuiTi_2_55_Regular,
});

const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "100%",
    padding: 0,
  },
  page: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "100%",
    paddingTop: 12,
    fontFamily: "AlibabaPuHuiTi_2_55_Regular",
    fontSize: 12,
  },
  header: {
    position: "relative",
    width: "100%",
    height: 86,
  },
  headerIcon: {
    position: "absolute",
    top: 20,
    width: 35,
    height: 35,
    padding: 5,
    borderRadius: 27.5,
    backgroundColor: "#c19f67",
  },
  avatar: {
    position: "absolute",
    top: 10,
    right: 60,
    width: 80,
    height: 100,
    backgroundColor: "red",
  },
  main: {
    position: "absolute",
    left: 0,
    top: 120,
    width: "100%",
    padding: "0 30 0 30",
    zIndex: 1,
  },
  moduleBox: {
    position: "relative",
    width: "100%",
    padding: "10 20",
    borderTop: "1 solid #4e7282",
    borderLeft: "1.6 solid #4e7282",
    backgroundColor: "#fff",
    zIndex: 1,
  },
  moduleTittleWrapper: {
    position: "absolute",
    top: -25,
    left: -13,
    paddingRight: 40,
  },
  space: { width: 12, height: 0 },
  flexAlignCenter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "flex-start",
  },
  flexSpaceBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  circleIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
    backgroundColor: "#000",
  },

  listSign: { width: 20, height: 20, marginRight: 30 },
  basicInfoGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    width: 420,
  },
  infoLabel: { flex: "0 0 auto", width: 70, letterSpacing: 10 },
  flexItem: { display: "flex", alignItems: "center", marginTop: 10 },
});

const DimmedOrBlackText = ({
  value = "",
  placeholder = "未填写",
  type = "pdf",
}: {
  value?: string;
  placeholder?: string;
  type?: string;
}) => {
  const styles = StyleSheet.create({
    text: { color: value ? "black" : "dimmed" },
  });
  return type === "pdf" ? (
    <Text style={styles.text}>{value ? value : placeholder}</Text>
  ) : (
    <MantineText c={value ? "black" : "dimmed"}>
      {value ? value : placeholder}
    </MantineText>
  );
};

const ListSign = () => <Image src={ListSignImg} style={styles.listSign} />;

const GenerateRichTextImg = async (params: {
  placeholder: string;
  htmlText: string;
}) => {
  const id = "@@__RichText__Temp__@@";
  const { placeholder, htmlText } = params;

  const RichText = () =>
    createPortal(
      <div id={id} style={{ zIndex: 11 }}>
        {htmlText ? (
          <div dangerouslySetInnerHTML={{ __html: htmlText }}></div>
        ) : (
          <DimmedOrBlackText placeholder={placeholder} type="html" />
        )}
      </div>,
      document.body
    );

  RichText()
  const canvas = await html2canvas(document.getElementById(id)!);
  return canvas.toDataURL("image/png");
};

export function PDFRenderer({ moduleName, list }: IModuleRenderer) {
  switch (moduleName) {
    case EResumeModuleType.basic:
      const arr = list[0];
      return (
        <View style={styles.basicInfoGrid}>
          {arr.map(({ label, value, required }) =>
            required ? (
              <View
                style={{ ...styles.flexAlignCenter, width: 200 }}
                key={label}
              >
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={{ marginLeft: 40 }}>：</Text>
                <DimmedOrBlackText value={value || " "} />
              </View>
            ) : null
          )}
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
              placeholder: "专业描述",
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
                      <Text>-</Text>
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
                    <Text>/</Text>
                    <DimmedOrBlackText
                      value={data.majorName}
                      placeholder="专业名称"
                    />
                  </View>
                </View>

                {/* <Image src={richTextImgUrl} /> */}
              </View>
            );
          })}
        </>
      );

    // case EResumeModuleType.campus:
    //   type CampusPropsKeys = keyof typeof ECampusProps;
    //   return (
    //     <>
    //       {list.map((items, index) => {
    //         const data: { [key in CampusPropsKeys]: any } = {} as any;
    //         items.map(
    //           ({ propName, value }) =>
    //             (data[propName as CampusPropsKeys] = value)
    //         );
    //         const richTextImgUrl = GenerateRichTextImg({
    //           placeholder: "经历描述",
    //           htmlText: data.detail,
    //         });
    //         return (
    //           <View key={index}>
    //             <View style={styles.flexSpaceBetween}>
    //               <View style={styles.flexAlignCenter}>
    //                 <View style={styles.circleIcon}></View>
    //                 <View style={styles.flexAlignCenter}>
    //                   <DimmedOrBlackText
    //                     value={data.startTime}
    //                     placeholder="开始时间"
    //                   />
    //                   <View style={styles.space} />
    //                   <Text>-</Text>
    //                   <View style={styles.space} />
    //                   <DimmedOrBlackText
    //                     value={data.endTime}
    //                     placeholder="结束时间"
    //                   />
    //                 </View>
    //               </View>
    //               <DimmedOrBlackText
    //                 value={data.schoolName}
    //                 placeholder="学校名称"
    //               />
    //               <DimmedOrBlackText
    //                 value={data.department}
    //                 placeholder="社团/部门名称"
    //               />
    //             </View>
    //             <Image src={richTextImgUrl} />
    //           </View>
    //         );
    //       })}
    //     </>
    //   );

    // case EResumeModuleType.professional:
    //   type ProfessionalPropsKeys = keyof typeof EProfessionalProps;
    //   return (
    //     <>
    //       {list.map((items, index) => {
    //         const data: { [key in ProfessionalPropsKeys]: any } = {} as any;
    //         items.map(
    //           ({ propName, value }) =>
    //             (data[propName as ProfessionalPropsKeys] = value)
    //         );
    //         const richTextImgUrl = GenerateRichTextImg({
    //           placeholder: "专业技能描述",
    //           htmlText: data.detail,
    //         });
    //         return <Image src={richTextImgUrl} key={index} />;
    //       })}
    //     </>
    //   );

    // case EResumeModuleType.job:
    //   type JobPropsKeys = keyof typeof EJobProps;
    //   return (
    //     <>
    //       {list.map((items, index) => {
    //         const data: { [key in JobPropsKeys]: string } = {} as any;
    //         items.map(
    //           ({ propName, value }) => (data[propName as JobPropsKeys] = value)
    //         );
    //         const richTextImgUrl = GenerateRichTextImg({
    //           placeholder: "岗位职责描述",
    //           htmlText: data.detail,
    //         });
    //         return (
    //           <View key={index}>
    //             <View style={styles.flexSpaceBetween}>
    //               <View style={styles.flexAlignCenter}>
    //                 <View style={styles.circleIcon} />
    //                 <View style={styles.flexAlignCenter}>
    //                   <DimmedOrBlackText
    //                     value={data.startTime}
    //                     placeholder="入职时间"
    //                   />
    //                   <View style={styles.space} />
    //                   <Text>-</Text>
    //                   <View style={styles.space} />
    //                   <DimmedOrBlackText
    //                     value={data.endTime}
    //                     placeholder="离职时间"
    //                   />
    //                 </View>
    //               </View>
    //               <DimmedOrBlackText
    //                 value={data.company}
    //                 placeholder="公司名称"
    //               />
    //               <DimmedOrBlackText value={data.post} placeholder="岗位" />
    //             </View>
    //             <Image src={richTextImgUrl} key={index} />
    //           </View>
    //         );
    //       })}
    //     </>
    //   );

    // case EResumeModuleType.project:
    //   type ProjectPropsKeys = keyof typeof EProjectProps;
    //   return (
    //     <>
    //       {list.map((items, index) => {
    //         const data: { [key in ProjectPropsKeys]: string } = {} as any;
    //         items.map(
    //           ({ propName, value }) =>
    //             (data[propName as ProjectPropsKeys] = value)
    //         );
    //         const describeRichTextImgUrl = GenerateRichTextImg({
    //           placeholder: "项目描述",
    //           htmlText: data.describe,
    //         });
    //         const frameworkRichTextImgUrl = GenerateRichTextImg({
    //           placeholder: "项目框架描述",
    //           htmlText: data.framework,
    //         });
    //         const responsibilityRichTextImgUrl = GenerateRichTextImg({
    //           placeholder: "项目职责描述",
    //           htmlText: data.responsibility,
    //         });
    //         return (
    //           <div className="educationItem" key={index}>
    //             <View style={styles.flexAlignCenter}>
    //               <ListSign />
    //               <Text>所属公司：</Text>
    //               <DimmedOrBlackText
    //                 value={data.company}
    //                 placeholder="所属公司"
    //               />
    //             </View>

    //             <View style={styles.flexItem}>
    //               <ListSign />
    //               <Text>项目名称：</Text>
    //               <DimmedOrBlackText value={data.name} placeholder="项目名称" />
    //             </View>

    //             <View style={styles.flexItem}>
    //               <ListSign />
    //               <Text>项目时间：</Text>
    //               <View style={styles.flexAlignCenter}>
    //                 <DimmedOrBlackText
    //                   value={data.startTime}
    //                   placeholder="开始时间"
    //                 />
    //                 <View style={styles.space} />
    //                 <Text>-</Text>
    //                 <View style={styles.space} />
    //                 <DimmedOrBlackText
    //                   value={data.endTime}
    //                   placeholder="结束时间"
    //                 />
    //               </View>
    //             </View>

    //             <View style={styles.flexItem}>
    //               <ListSign />
    //               <Text>项目描述：</Text>
    //             </View>

    //             <Image src={describeRichTextImgUrl} />

    //             <View style={styles.flexItem}>
    //               <ListSign />
    //               <Text>项目架构：</Text>
    //             </View>

    //             <Image src={frameworkRichTextImgUrl} />

    //             <View style={styles.flexItem}>
    //               <ListSign />
    //               <Text>项目职责：</Text>
    //             </View>

    //             <Image src={responsibilityRichTextImgUrl} />
    //           </div>
    //         );
    //       })}
    //     </>
    //   );

    // case EResumeModuleType.honour:
    //   type HonourPropsKeys = keyof typeof EHonourProps;
    //   return (
    //     <>
    //       {list.map((items, index) => {
    //         const data: { [key in HonourPropsKeys]: string } = {} as any;
    //         items.map(
    //           ({ propName, value }) =>
    //             (data[propName as HonourPropsKeys] = value)
    //         );
    //         const richTextImgUrl = GenerateRichTextImg({
    //           placeholder: "荣誉奖励描述",
    //           htmlText: data.detail,
    //         });
    //         return <Image src={richTextImgUrl} key={index} />;
    //       })}
    //     </>
    //   );

    // case EResumeModuleType.evaluate:
    //   type EvaluatePropsKeys = keyof typeof EEvaluateProps;
    //   return (
    //     <>
    //       {list.map((items, index) => {
    //         const data: { [key in EvaluatePropsKeys]: string } = {} as any;
    //         items.map(
    //           ({ propName, value }) =>
    //             (data[propName as EvaluatePropsKeys] = value)
    //         );
    //         const richTextImgUrl = GenerateRichTextImg({
    //           placeholder: "自我评价描述",
    //           htmlText: data.detail,
    //         });
    //         return <Image src={richTextImgUrl} key={index} />;
    //       })}
    //     </>
    //   );

    default:
      return <></>;
  }
}

export const PDFPreview = ({ resumeData }: { resumeData: IResumeModule[] }) => {
  const data = cloneDeep(resumeData);
  data.forEach(({ list }) => {
    list.forEach((arr) =>
      arr.forEach((item) => (item.value = item.value ? item.value : " "))
    );
  });

  return (
    <PDFViewer style={styles.viewer} showToolbar={false}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Image src={HeaderBg} style={styles.header} />
          <Image src={HatImg} style={{ ...styles.headerIcon, right: 20 }} />
          <Image src={BagImg} style={{ ...styles.headerIcon, right: 80 }} />
          <Image src={PenImg} style={{ ...styles.headerIcon, right: 140 }} />

          <View style={styles.main}>
            <Image src={PenImg} style={styles.avatar} />
            {data.map(
              ({ moduleLabel, moduleName, list, visible }) =>
                visible && (
                  <View debug style={styles.moduleBox} key={moduleName}>
                    <View>
                      <Text>{moduleLabel}</Text>
                    </View>
                    <PDFRenderer moduleName={moduleName} list={list} />
                  </View>
                )
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};