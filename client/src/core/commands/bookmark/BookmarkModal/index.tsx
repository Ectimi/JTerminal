import {
  Modal,
  Button,
  FileInput,
  Flex,
  Select,
  TextInput,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useRecoilValue, useRecoilState } from "recoil";
import { bookmarksState, IBookmarkItem, userState } from "@/store";
import { AddBookmarkItem } from "@/serve/api";
import { LocalForageKeys, localforage } from "@/lib/localForage";
import "./index.less";

interface IFormData {
  name: string;
  url: string;
  label: string;
  icon: string;
  description: string;
}

interface IProps {
  visible: boolean;
  formValue?: IFormData;
  onClose: () => void;
}

const initialValues: IFormData = {
  name: "",
  url: "",
  label: "",
  icon: "",
  description: "",
};

export default function BookmarkModal(props: IProps) {
  const { visible, formValue = initialValues, onClose } = props;
  const user = useRecoilValue(userState);
  const [{ bookmarks, labels }, setBookmarkState] =
    useRecoilState(bookmarksState);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: formValue,

    validate: {
      name: (value) => (!!value ? null : "名称不能为空"),
      url: (value) => (!!value ? null : "链接不能为空"),
      label: (value) => (!!value ? null : "分类不能为空"),
    },
  });

  const closeModal = () => {
    onClose();
    form.reset();
  };

  const onSubmit = async (data: IFormData) => {
    try {
      if (user) {
        const formData = new FormData();
        formData.append("user_id", user.id);
        for (const key in data) {
          formData.append(key, data[key as keyof IFormData]);
        }
        const res = await AddBookmarkItem(formData);
        if (res.success) {
          setBookmarkState((cur) => ({
            ...cur,
            bookmarks: res.data,
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
        if (bookmarks.some((bookmark) => bookmark.name === data.name)) {
          showNotification({
            color: "yellow",
            message: "该书签名已存在",
            style: {
              position: "fixed",
              top: "10px",
              right: "10px",
              width: "300px",
            },
          });
          return;
        }
        const local_bookmarks = (await localforage.getItem(
          LocalForageKeys.LOCAL_BOOKMARKS
        )) as IBookmarkItem[];
        await localforage.setItem(LocalForageKeys.LOCAL_BOOKMARKS, [
          data,
          ...local_bookmarks,
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
        message: error.message ? error.message : "添加书签遇到未知错误",
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
      title={<Title order={5}>添加书签</Title>}
      target=".viewport-view"
    >
      <form onSubmit={form.onSubmit(onSubmit)} className="bookmark-modal-form">
        <TextInput
          {...form.getInputProps("name")}
          placeholder="请输入书签名"
          label="名称"
          withAsterisk
          data-autofocus
        />
        <TextInput
          {...form.getInputProps("url")}
          placeholder="请输入书签链接"
          label="链接"
          withAsterisk
        />
        <Select
          {...form.getInputProps("label")}
          label="分类"
          placeholder="请选择分类"
          data={labels.map((label) => label.label)}
          withAsterisk
        />
        <FileInput
          {...form.getInputProps("icon")}
          label="图标"
          placeholder={user ? "请上传图片" : "登陆后才能上传图片"}
          icon={<IconUpload size={14} />}
          accept="image/png,image/jpeg,image/jpg,image/gif,image/ico"
          disabled={!user}
        />
        <Textarea
          {...form.getInputProps("description")}
          placeholder="请输入书签描述"
          label="描述"
          sx={{ caretColor: "#000" }}
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
