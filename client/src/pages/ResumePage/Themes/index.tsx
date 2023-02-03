import { Flex, Paper } from '@mantine/core';
import { IResumeModule } from '../resumeModule';
import { ModuleItemRenderer } from './ModuleItemRenderer';
import {PDFRenderer} from './PDFRenderer'
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  PDFViewer,
  usePDF,
} from '@react-pdf/renderer';

import HeaderBg from '@/assets/images/theme/01/header.png';
import HatImg from '@/assets/images/theme/01/hat.png';
import BagImg from '@/assets/images/theme/01/bag.png';
import PenImg from '@/assets/images/theme/01/pencil.png';

import './index.less';
import { useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';

const PDFStyles = StyleSheet.create({
  viewer: {
    width: '100%',
    height: '100%',
  },
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
  },
  header: {
    position: 'relative',
    width: '100%',
    height: 86,
  },
  headerIcon: {
    position: 'absolute',
    top: 20,
    width: 35,
    height: 35,
    padding: 5,
    borderRadius: 27.5,
    backgroundColor: '#c19f67',
  },
  main:{
    position:'absolute',
    left:0,
    top:146,
    width:'100%',
    padding:'0 30 0 30'
  },
  flexAlignCenter: { display: 'flex', alignItems: 'center' },
  moduleBox: {
    position: 'relative',
    width:'100%',
    padding: 20,
    borderTop: '1 solid #4e7282',
    borderLeft: '2 solid #4e7282',
    backgroundColor: '#fff',
  },
});

export const BasicThemeResume = ({
  resumeData,
}: {
  resumeData: IResumeModule[];
}) => {
  const Preview = () => (
    <PDFViewer style={PDFStyles.viewer}>
      <Document>
        <Page size="A4" style={PDFStyles.page}>
          <Image src={HeaderBg} style={PDFStyles.header} />
          <Image src={HatImg} style={{ ...PDFStyles.headerIcon, right: 20 }} />
          <Image src={BagImg} style={{ ...PDFStyles.headerIcon, right: 100 }} />
          <Image src={PenImg} style={{ ...PDFStyles.headerIcon, right: 180 }} />
          <View style={PDFStyles.main}>
            {resumeData.map(
              ({ moduleLabel, moduleName, list, visible }) =>
                visible && (
                  <View style={PDFStyles.moduleBox} key={moduleName}>
                    {/* <PDFRenderer moduleName={moduleName} list={list} /> */}
                  </View>
                )
            )}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );

  return (
    <Paper className="BasicThemeResume" shadow="xs" pt="12px">
      <Preview />
      {/* <div className="header">
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
        {resumeData.map(
          ({ moduleLabel, moduleName, list, visible }) =>
            visible && (
              <div className="moduleBox" key={moduleName}>
                <div className="moduleTitle">
                  <span className="nameText">{moduleLabel}</span>
                </div>
                <ModuleItemRenderer moduleName={moduleName} list={list} />
              </div>
            )
        )}
      </div> */}
    </Paper>
  );
};
