import { Flex, Image, SimpleGrid, Paper, Text } from '@mantine/core';
import {
  IResumeModule,
  IResumeModuleItem,
  EResumeModuleType,
} from '../resumeModule';
import { BasicThemeResume } from '../Themes';

interface IResumePreview {
  resumeData: IResumeModule[];
}

export default function ResumePreview({ resumeData }: IResumePreview) {
  return (
    <Flex className="ResumePreview" justify="center" sx={{ height: '100%' }}>
      <BasicThemeResume resumeData={resumeData} />
    </Flex>
  );
}
