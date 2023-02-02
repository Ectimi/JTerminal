import { Flex, Image, Paper } from '@mantine/core';
import { IResumeModule } from '../resumeModule';
import { ModuleItemRenderer } from './ModuleItemRenderer';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';

import HatImg from '@/assets/images/theme/01/hat.png';
import BagImg from '@/assets/images/theme/01/bag.png';
import PenImg from '@/assets/images/theme/01/pencil.png';

import './index.less';

const PDFStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  moduleBox: {
    position: 'relative',
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
    <PDFViewer>
      <Document>
        <Page size="A4" style={PDFStyles.page}>
          {resumeData.map(
            ({ moduleLabel, moduleName, list, visible }) =>
              visible && (
                <View style={PDFStyles.moduleBox} key={moduleName}>
                  <ModuleItemRenderer moduleName={moduleName} list={list} />
                </View>
              )
          )}
        </Page>
      </Document>
    </PDFViewer>
  );

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
      </div>
      <div id="contentBox"></div>
    </Paper>
  );
};
