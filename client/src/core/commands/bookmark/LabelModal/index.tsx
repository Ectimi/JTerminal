import {
  Modal,
  Button,
  Flex,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { ShowNotification } from '@/lib/notification';
import { useRecoilValue, useRecoilState } from 'recoil';
import { bookmarksState, IBookmarkItem, userState } from '@/store';
import { AddLabel } from '@/serve/api';
import { LocalForageKeys, localforage } from '@/lib/localForage';
import { addLabel } from '../controller';
import './index.less';

export interface ILabelFormData {
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
      label: '',
    },

    validate: {
      label: (value) => (!!value ? null : '名称不能为空'),
    },
  });

  const closeModal = () => {
    onClose();
    form.reset();
  };

  const onSubmit = async (data: ILabelFormData) => {
    addLabel(data, closeModal);
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
      title={<Title order={5}>添加标签</Title>}
      target=".viewport-view"
    >
      <form onSubmit={form.onSubmit(onSubmit)} className="bookmark-modal-form">
        <TextInput
          {...form.getInputProps('label')}
          placeholder="请输入标签名"
          label="名称"
          withAsterisk
          data-autofocus
        />

        <Flex justify="center" align="center">
          <Button
            color="gray"
            sx={{ marginRight: 50 }}
            onClick={() => {
              closeModal();
              form.reset();
            }}
          >
            取消
          </Button>

          <Button type="submit">确定</Button>
        </Flex>
      </form>
    </Modal>
  );
}
