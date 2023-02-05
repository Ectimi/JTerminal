import { Grid, Modal } from "@mantine/core";
import { useSafeState } from "ahooks";
import { useImmer } from "use-immer";
import ResumeEditor from "./Editor";
import ResumePreview from "./Preview";
import { PDFPreview } from "./Preview/PDFPreview";
import cloneDeep from "lodash/cloneDeep";
import { defaultResumeModule } from "./resumeModule";

export default function ResumePage() {
  const [resumeData, setResumeData] = useImmer(cloneDeep(defaultResumeModule));
  const [visible, setVisible] = useSafeState(false);

  return (
    <>
      <Grid sx={{ margin: 0, height: "100%", backgroundColor: "#f1f3f5" }}>
        <Grid.Col span={6} sx={{ height: "100%" }}>
          <ResumeEditor
            resumeData={resumeData}
            setResumeData={setResumeData}
            togglePriview={setVisible}
          />
        </Grid.Col>
        <Grid.Col span={6} sx={{ height: "100%", overflowY: "hidden" }}>
          <ResumePreview resumeData={resumeData} />
        </Grid.Col>
      </Grid>
      <Modal
        opened={visible}
        withCloseButton={false}
        onClose={() => setVisible(false)}
      >
        <PDFPreview resumeData={resumeData} />
      </Modal>
    </>
  );
}
