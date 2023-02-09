import React, { cloneElement, createElement } from "react";
import { renderToString } from "react-dom/server";
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
import { Style } from "@react-pdf/types";
import Html from "react-pdf-html";
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
import { genUid, getByteLength, getFontWidth } from "@/lib/utils";

import ListSignImg from "@/assets/images/theme/01/list_sign.png";

import AlibabaPuHuiTi_2_35_Regular from "@/assets/fonts/AlibabaPuHuiTi_2_35_Thin.ttf";
import AlibabaPuHuiTi_2_45_Regular from "@/assets/fonts/AlibabaPuHuiTi_2_45_Light.ttf";
import AlibabaPuHuiTi_2_55_Regular from "@/assets/fonts/AlibabaPuHuiTi_2_55_Regular.ttf";
import AlibabaPuHuiTi_2_65_Regular from "@/assets/fonts/AlibabaPuHuiTi_2_65_Medium.ttf";
import AlibabaPuHuiTi_2_75_Regular from "@/assets/fonts/AlibabaPuHuiTi_2_75_SemiBold.ttf";
import AlibabaPuHuiTi_2_85_Regular from "@/assets/fonts/AlibabaPuHuiTi_2_85_Bold.ttf";

import HeaderBg from "@/assets/images/theme/01/header.png";
import HatImg from "@/assets/images/theme/01/hat.png";
import BagImg from "@/assets/images/theme/01/bag.png";
import PenImg from "@/assets/images/theme/01/pencil.png";
import TitleSign from "@/assets/images/theme/01/title2.png";

interface IModuleRenderer {
  moduleName: string;
  list: IResumeModuleItem[][];
}

Font.register({
  family: "AlibabaPuHuiTi",
  fonts: [
    {
      src: AlibabaPuHuiTi_2_35_Regular,
      fontWeight: 300,
    },
    {
      src: AlibabaPuHuiTi_2_45_Regular,
      fontWeight: 400,
    },
    {
      src: AlibabaPuHuiTi_2_55_Regular,
      fontWeight: 500,
    },
    {
      src: AlibabaPuHuiTi_2_65_Regular,
      fontWeight: 600,
    },
    {
      src: AlibabaPuHuiTi_2_75_Regular,
      fontWeight: 700,
    },
    {
      src: AlibabaPuHuiTi_2_85_Regular,
      fontWeight: 800,
    },
  ],
});
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  viewer: {
    width: "100%",
    height: "100%",
    padding: 0,
  },
  page: {
    // flexDirection: 'row',
    backgroundColor: "#fff",
    width: "100%",
    paddingTop: 12,
    fontFamily: "AlibabaPuHuiTi",
    fontSize: 12,
    fontWeight: 500,
  },
  header: {
    position: "relative",
    width: "100%",
    height: 76,
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
  profile: {
    position: "absolute",
    top: 30,
    right: 40,
    width: 80,
    height: 100,
  },
  main: {
    // position: 'absolute',
    left: 0,
    // top: 120,
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
    // backgroundColor: '#fff',
    zIndex: 1,
  },
  moduleTittleBox: {
    position: "absolute",
    top: -20,
    left: -14,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 23,
    backgroundColor: "#5a8599",
  },
  moduleTitleText: {
    color: "#fff",
    letterSpacing: 1,
    fontWeight: 500,
    fontSize: 14,
  },
  moduleTitleImage: {
    position: "absolute",
    top: 0,
    left: 102,
    width: 25,
    height: 19,
  },
  moduleTitleLeftAngle: {
    position: "absolute",
    top: 19,
    left: -1,
    borderTop: "4 solid #3c5f6f",
    borderRight: "7 solid #3c5f6f",
    borderBottom: "4 solid #fff",
    borderLeft: "7 solid #fff",
  },
  space: { width: 6, height: 0 },
  regular: { fontWeight: 500 },
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
    marginRight: 6,
    backgroundColor: "#000",
  },

  listSign: { width: 8, height: 7, marginRight: 10 },
  basicInfoGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 3,
    width: 520,
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

const TextOrNull = ({ value, style = {} }: { value: string; style?: Style }) =>
  value ? <Text style={style}>{value}</Text> : null;

const GenerateRichTextImg = async (params: {
  className: string;
  placeholder: string;
  htmlText: string;
}) => {
  const id = "@@__RichText__Temp__" + genUid(10);
  const { className, placeholder, htmlText } = params;
  const div = document.createElement("div");
  div.id = id;

  console.log("html", htmlText);

  const RichText = () =>
    htmlText ? (
      <div dangerouslySetInnerHTML={{ __html: htmlText }}></div>
    ) : (
      <DimmedOrBlackText placeholder={placeholder} type="html" />
    );

  div.innerHTML = renderToString(<RichText />);
  document.body.append(div);

  const fontSize = 16;
  const width = document
    .querySelector(`.moduleBox .${className}`)!
    .getBoundingClientRect().width;
  const height = div.getBoundingClientRect().height;
  div.style.fontSize = fontSize + "px";
  div.style.width = width + "px";

  const canvas = await html2canvas(document.getElementById(id)!, {
    width,
    height: height * 2.6,
  });
  div.remove();

  return canvas.toDataURL("image/png");
};

const sliceStringByWidth = (originString: string, width: number) => {
  if (getFontWidth(originString) <= width) return [originString];
  const res = [];
  let text = "";
  for (let i = 0; i < originString.length; i++) {
    text += originString[i];
    if (getFontWidth(text) >= width) {
      res.push(text);
      text = "";
    }
  }
  const str = text.substring(text.indexOf(res.join("")), text.length);
  if (str) {
    res.push(str);
  }
  return res;
};

const HTMLText = ({ htmlText }: { htmlText: string }) => {
  let finalText = "";
  const maxWidth = 400;
  const htmlStyle: Style = {
    display: "flex",
    fontSize: 12,
    padding: 0,
    margin: 0,
  };
  const styleSheet: Record<string, React.CSSProperties> = {
    p: {
      padding: 0,
      margin: 0,
    },
  };

  const texts: string[] = [];
  const div = document.createElement("div");
  div.innerHTML = htmlText;
  const paragraphs = div.querySelectorAll("p");
  paragraphs.forEach((p,) => {
    const text = p.innerText;
    const strs = sliceStringByWidth(text, maxWidth);
    strs.map((str) => `<p>${str}</p>`);
    texts.push(`<li style="padding-bottom:5px;padding-top:5px;">${ strs.map((str) => `<p>${str}</p>`).join('')}</li>`);
  });
  texts.forEach((text) => (finalText += text));

  if (htmlText.startsWith("<ol")) {
    finalText = `<ol>` + finalText + "</ol>";
  } else if (htmlText.startsWith("<ul")) {
    finalText = `<ul>` + finalText + "</ul>";
  }
  return (
    <View style={{ width: 500, marginTop: 0 }}>
      <Html
        style={htmlStyle}
        stylesheet={styleSheet}
        renderers={{
          ol: ({ children }) => (
            <View style={{ marginLeft: -15 }}>{children}</View>
          ),
          ul: ({ children }) => (
            <View style={{ marginLeft: -15 }}>{children}</View>
          ),
          p: ({ children }) => {
            return <Text>{children}</Text>;
          },
        }}
      >
        {finalText}
      </Html>
    </View>
  );
};

export function PDFRenderer({ moduleName, list }: IModuleRenderer) {
  switch (moduleName) {
    case EResumeModuleType.profile:
      const url = list[0][0].value;
      return url && <Image src={url} style={styles.profile} />;

    case EResumeModuleType.basic:
      const arr = list[0];
      return (
        <View style={styles.basicInfoGrid}>
          {arr.map(({ label, value, required }) =>
            required ? (
              <View
                style={{ ...styles.flexAlignCenter, width: 250 }}
                key={label}
              >
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={{ marginLeft: 40 }}>：</Text>
                <Text>{value}</Text>
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

            return (
              <View key={index}>
                <View style={styles.flexSpaceBetween}>
                  <View style={styles.flexAlignCenter}>
                    <View style={styles.circleIcon}></View>
                    <View style={styles.flexAlignCenter}>
                      <TextOrNull value={data.startTime} />
                      <View style={styles.space} />
                      <Text>-</Text>
                      <View style={styles.space} />
                      <TextOrNull value={data.endTime} />
                    </View>
                  </View>
                  <Text>{data.schoolName}</Text>
                  <View style={styles.flexAlignCenter}>
                    <TextOrNull value={data.highestEducation} />
                    <Text>/</Text>
                    <TextOrNull value={data.majorName} />
                  </View>
                </View>
                <HTMLText htmlText={data.detail} key={index} />
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
            return (
              <View key={index}>
                <View style={styles.flexSpaceBetween}>
                  <View style={styles.flexAlignCenter}>
                    <View style={styles.circleIcon}></View>
                    <View style={styles.flexAlignCenter}>
                      <TextOrNull
                        style={styles.regular}
                        value={data.startTime}
                      />
                      <View style={styles.space} />
                      <Text>-</Text>
                      <View style={styles.space} />
                      <TextOrNull style={styles.regular} value={data.endTime} />
                    </View>
                  </View>
                  <TextOrNull style={styles.regular} value={data.schoolName} />
                  <TextOrNull style={styles.regular} value={data.department} />
                </View>
                <HTMLText htmlText={data.detail} key={index} />
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

            return <HTMLText htmlText={data.detail} key={index} />;
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
              <View key={index} style={{ marginTop: index !== 0 ? 10 : 0 }}>
                <View style={styles.flexSpaceBetween}>
                  <View style={styles.flexAlignCenter}>
                    <View style={styles.circleIcon} />
                    <View style={styles.flexAlignCenter}>
                      <TextOrNull
                        style={styles.regular}
                        value={data.startTime}
                      />
                      <View style={styles.space} />
                      <Text>-</Text>
                      <View style={styles.space} />
                      <TextOrNull style={styles.regular} value={data.endTime} />
                    </View>
                  </View>
                  <TextOrNull style={styles.regular} value={data.company} />
                  <TextOrNull style={styles.regular} value={data.post} />
                </View>
                <HTMLText htmlText={data.detail} key={index} />
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

            return (
              <View key={index} style={{ marginTop: index !== 0 ? 10 : 0 }}>
                <View style={styles.flexAlignCenter}>
                  <ListSign />
                  <Text style={styles.regular}>所属公司：</Text>
                  <TextOrNull value={data.company} />
                </View>

                <View style={{ ...styles.flexAlignCenter, marginTop: 5 }}>
                  <ListSign />
                  <Text style={styles.regular}>项目名称：</Text>
                  <TextOrNull value={data.name} />
                </View>

                <View style={{ ...styles.flexAlignCenter, marginTop: 5 }}>
                  <ListSign />
                  <Text style={styles.regular}>项目时间：</Text>
                  <View style={styles.flexAlignCenter}>
                    <TextOrNull value={data.startTime} />
                    <View style={styles.space} />
                    <Text>-</Text>
                    <View style={styles.space} />
                    <TextOrNull value={data.endTime} />
                  </View>
                </View>

                <View style={{ ...styles.flexAlignCenter, marginTop: 5 }}>
                  <ListSign />
                  <Text style={styles.regular}>项目描述：</Text>
                </View>

                <HTMLText htmlText={data.describe} key={index} />

                <View style={{ ...styles.flexAlignCenter, marginTop: 5 }}>
                  <ListSign />
                  <Text style={styles.regular}>项目架构：</Text>
                </View>

                <HTMLText htmlText={data.framework} key={index} />

                <View style={{ ...styles.flexAlignCenter, marginTop: 5 }}>
                  <ListSign />
                  <Text style={styles.regular}>项目职责：</Text>
                </View>

                <HTMLText htmlText={data.responsibility} key={index} />
              </View>
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

            return <HTMLText htmlText={data.detail} key={index} />;
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

            return <HTMLText htmlText={data.detail} key={index} />;
          })}
        </>
      );

    default:
      return <></>;
  }
}

export const PDFDocument = ({
  resumeData,
}: {
  resumeData: IResumeModule[];
}) => {
  const data = cloneDeep(resumeData);
  data.forEach(({ list }) => {
    list.forEach((arr) =>
      arr.forEach((item) => (item.value = item.value ? item.value : " "))
    );
  });

  const Header = () => (
    <>
      <Image src={HeaderBg} style={styles.header} fixed />
      <Image src={HatImg} style={{ ...styles.headerIcon, right: 20 }} fixed />
      <Image src={BagImg} style={{ ...styles.headerIcon, right: 80 }} fixed />
      <Image src={PenImg} style={{ ...styles.headerIcon, right: 140 }} fixed />
      <View style={{ height: 10 }} fixed></View>
    </>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={true}>
        <Header />
        {/* <View
          render={({ pageNumber }) =>
            pageNumber === 1 && <View style={{ height: 10 }}></View> 
          }
        /> */}

        <View style={{ ...styles.main, top: 0 }}>
          {data.map(({ moduleLabel, moduleName, list, visible }, index) =>
            visible ? (
              moduleName === EResumeModuleType.profile ? (
                <PDFRenderer moduleName={moduleName} list={list} />
              ) : (
                <View
                  style={{
                    ...styles.moduleBox,
                    marginTop: index !== 0 ? 20 : 0,
                  }}
                  key={moduleName}
                >
                  <View style={styles.moduleTittleBox}>
                    <Text style={styles.moduleTitleText}>{moduleLabel}</Text>
                    <Image src={TitleSign} style={styles.moduleTitleImage} />
                    <View style={styles.moduleTitleLeftAngle}></View>
                  </View>
                  <PDFRenderer moduleName={moduleName} list={list} />
                </View>
              )
            ) : null
          )}
        </View>
      </Page>
    </Document>
  );
};

export const PDFPreview = ({ resumeData }: { resumeData: IResumeModule[] }) => {
  const data = cloneDeep(resumeData);
  data.forEach(({ list }) => {
    list.forEach((arr) =>
      arr.forEach((item) => (item.value = item.value ? item.value : " "))
    );
  });

  return (
    <PDFViewer style={styles.viewer} showToolbar={false}>
      <PDFDocument resumeData={resumeData} />
    </PDFViewer>
  );
};
