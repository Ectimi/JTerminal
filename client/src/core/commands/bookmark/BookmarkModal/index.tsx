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
} from '@mantine/core';
import { IconUpload } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useRecoilValue, useRecoilState } from 'recoil';
import { bookmarksState, IBookmarkItem, userState } from '@/store';
import { addBookmark, updateBookmark } from '../controller';
import './index.less';
import { useUpdateEffect } from 'ahooks';

export type TBookmarkModalType = 'add' | 'edit';

export interface IBookmarkModalFormData {
  name: string;
  url: string;
  label: string;
  icon: string;
  description: string;
}

interface IProps {
  type: TBookmarkModalType;
  visible: boolean;
  formValue: IBookmarkItem;
  onClose: () => void;
}

export const notify = (type: 'success' | 'error' | 'warn', message: string) => {
  showNotification({
    color: type === 'success' ? 'blue' : type === 'error' ? 'red' : 'yellow',
    message,
    style: {
      position: 'fixed',
      top: '10px',
      right: '10px',
      width: '300px',
    },
  });
};

export default function BookmarkModal(props: IProps) {
  const { type, visible, formValue, onClose } = props;
  const user = useRecoilValue(userState);
  const [{ bookmarks, labels }, setBookmarkState] =
    useRecoilState(bookmarksState);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: formValue,

    validate: {
      name: (value) => (!!value ? null : '名称不能为空'),
      url: (value) => (!!value ? null : '链接不能为空'),
      label: (value) => (!!value ? null : '分类不能为空'),
    },
  });

  useUpdateEffect(() => {
    form.setValues(formValue);
  }, [formValue]);

  const closeModal = () => {
    onClose();
    form.reset();
  };

  const onSubmit = async (data: IBookmarkModalFormData) => {
    if (type === 'add') {
      addBookmark(data, closeModal);
    } else {
      updateBookmark(formValue, data, closeModal);
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
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      transition="fade"
      transitionDuration={400}
      transitionTimingFunction="ease"
      title={
        type === 'add' ? (
          <Title order={5}>添加书签</Title>
        ) : (
          <Title order={5}>编辑书签</Title>
        )
      }
      target=".viewport-view"
    >
      <form onSubmit={form.onSubmit(onSubmit)} className="bookmark-modal-form">
        <TextInput
          {...form.getInputProps('name')}
          placeholder="请输入书签名"
          label="名称"
          withAsterisk
          data-autofocus
        />
        <TextInput
          {...form.getInputProps('url')}
          placeholder="请输入书签链接"
          label="链接"
          withAsterisk
        />
        <Select
          {...form.getInputProps('label')}
          label="分类"
          placeholder="请选择分类"
          data={labels.map((label) => label.label)}
          withAsterisk
        />
        <FileInput
          {...form.getInputProps('icon')}
          label="图标"
          placeholder={user ? '请上传图片' : '登陆后才能上传图片'}
          icon={<IconUpload size={14} />}
          accept="image/png,image/jpeg,image/jpg,image/gif,image/ico"
          disabled={!user}
        />
        <Textarea
          {...form.getInputProps('description')}
          placeholder="请输入书签描述"
          label="描述"
          sx={{ caretColor: '#000' }}
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
