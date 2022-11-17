import {
  Modal,
  Button,
  Flex,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRecoilValue, useRecoilState } from "recoil";
import { bookmarksState, IBookmarkItem, userState } from "@/store";
import { AddLabel } from "@/serve/api";
import { LocalForageKeys, localforage } from "@/lib/localForage";
import "./index.less";

interface IFormData {
  label: string;
}

interface IProps {
  visible: boolean;
  onClose: () => void;
}

export default function LabelModal(props: IProps) {
  const { visible, onClose } = props;
  const user = useRecoilValue(userState);
  const [{ bookmarks, labels }, setBookmarkState] =
    useRecoilState(bookmarksState);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      label: "",
    },

    validate: {
      label: (value) => (!!value ? null : "名称不能为空"),
    },
  });

  const closeModal = () => {
    onClose();
    form.reset();
  };

  const onSubmit = async (data: IFormData) => {
    console.log("submit", data);
    try {
      if (user) {
        const res = await AddLabel(data.label);
        if (res.success) {
          setBookmarkState((cur) => ({
            ...cur,
            labels: res.data,
          }));
          showNotification({
            color: "blue",
            message: "添加成功",
            style: {
              position: "fixed",
              top: "10px",
              right: "10px",
              width: "300px",
            },
          });
          closeModal();
        } else {
          showNotification({
            color: "red",
            message: res.message,
            style: {
              position: "fixed",
              top: "10px",
              right: "10px",
              width: "300px",
            },
          });
        }
      } else {
        if (labels.some((label) => label.label === data.label)) {
          showNotification({
            color: "yellow",
            message: "该标签名已存在",
            style: {
              position: "fixed",
              top: "10px",
              right: "10px",
              width: "300px",
            },
          });
          return;
        }
        const loacl_labels = (await localforage.getItem(
          LocalForageKeys.LOCAL_LABELS
        )) as IBookmarkItem[];
        await localforage.setItem(LocalForageKeys.LOCAL_LABELS, [
          ...loacl_labels,
          data,
        ]);
        showNotification({
          color: "blue",
          message: "添加成功",
          style: {
            position: "fixed",
            top: "10px",
            right: "10px",
            width: "300px",
          },
        });
        closeModal();
      }
    } catch (error: any) {
      showNotification({
        color: "red",
        title: error.name ? error.name : "Error",
        message: error.message ? error.message : "添加标 签遇到未知错误",
        style: {
          position: "fixed",
          top: "10px",
          right: "10px",
          width: "300px",
        },
      });
    }
  };

  return (
    <Modal
      onClose={closeModal}
      opened={visible}
      closeOnClickOutside={false}
      withCloseButton={false}
      centered
      size="60%"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      transition="fade"
      transitionDuration={400}
      transitionTimingFunction="ease"
      title={<Title order={5}>添加标签</Title>}
      target=".viewport-view"
    >
      <form onSubmit={form.onSubmit(onSubmit)} className="bookmark-modal-form">
        <TextInput
          {...form.getInputProps("label")}
          placeholder="请输入标签名"
          label="名称"
          withAsterisk
          data-autofocus
        />

        <Flex justify="center" align="center">
          <Button type="submit">确定</Button>
          <Button
            color="gray"
            sx={{ marginLeft: 50 }}
            onClick={() => {
              closeModal();
              form.reset();
            }}
          >
            取消
          </Button>
        </Flex>
      </form>
    </Modal>
  );
}
