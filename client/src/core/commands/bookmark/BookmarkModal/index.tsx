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
import { useRecoilValue } from 'recoil';
import { bookmarksState } from '@/store';
import './index.less';

interface IFormData {
  name: string;
  link: string;
  label: string;
  icon: string;
  desc: string;
}

interface IProps {
  visible: boolean;
  formValue?: IFormData;
  onClose: () => void;
}

const initialValues: IFormData = {
  name: '',
  link: '',
  label: '',
  icon: '',
  desc: '',
};

export default function BookmarkModal(props: IProps) {
  const { visible, formValue = initialValues, onClose } = props;
  const { labels } = useRecoilValue(bookmarksState);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: formValue,

    validate: {
      name: (value) => (!!value ? null : '名称不能为空'),
      link: (value) => (!!value ? null : '链接不能为空'),
      label: (value) => (!!value ? null : '分类不能为空'),
    },
  });

  const onSubmit = (formData: IFormData) => {
    console.log('submit', formData);
  };

  return (
    <Modal
      onClose={onClose}
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
      title={<Title order={5}>添加书签</Title>}
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
          {...form.getInputProps('link')}
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
            placeholder="请上传图片"
            icon={<IconUpload size={14} />}
            accept="image/png,image/jpeg,image/jpg,image/gif,image/ico"
          />
        <Textarea
          {...form.getInputProps('desc')}
          placeholder="请输入书签描述"
          label="描述"
          sx={{ caretColor: '#000' }}
        />
        <Flex justify="center" align="center">
          <Button type="submit">确定</Button>
          <Button color="gray" sx={{ marginLeft: 50 }} onClick={onClose}>
            取消
          </Button>
        </Flex>
      </form>
    </Modal>
  );
}
