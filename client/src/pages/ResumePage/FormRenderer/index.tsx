import { memo } from 'react';
import {
  Box,
  FileButton,
  Input,
  TextInput,
  Image,
  Select,
  SelectItem,
} from '@mantine/core';
import { ShowNotification } from '@/lib/notification';
import { DatePicker } from '@mantine/dates';
import RichTextEditor from '@/components/RichTextEditor';
import 'dayjs/locale/zh';

export enum FormType {
  'input',
  'select',
  'richTextEditor',
  'datepicker',
  'imageUpload',
}

export interface IFormItem {
  type: FormType;
  value: any;
  label: string;
  placeholder?: string;
  required: boolean;
  disable?: boolean;

  selectData?: string[] | SelectItem[];
  onChange: (value: any) => void;
  onRichTextEditorUpdate?: (htmlText: string) => void;
}

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const beforeUploadValidate = (file: File) => {
  const acceptFileTypes = ['image/jpeg', 'image/png'];
  const isJpgOrPng = acceptFileTypes.includes(file.type);

  if (!isJpgOrPng) {
    ShowNotification({
      type: 'warn',
      message: 'You can only upload JPG/PNG file!',
    });
  }
  const isLt4MB = file.size / 1024 / 1024 < 4;

  if (!isLt4MB) {
    ShowNotification({
      type: 'warn',
      message: 'Image must smaller than 32KB!',
    });
  }
  return isJpgOrPng && isLt4MB;
};

const FormRenderer = memo((props: IFormItem) => {
  const {
    type,
    disable = false,
    selectData = [],
    value,
    onChange,
    onRichTextEditorUpdate,
    ...rest
  } = props;

  const onFileChange = async (file: File) => {
    if (beforeUploadValidate(file)) {
      onChange(await getBase64(file));
      return true;
    }
    return false;
  };

  switch (type) {
    case FormType.imageUpload:
      return (
        <FileButton
          accept="image/png,image/jpeg"
          multiple={false}
          onChange={onFileChange}
        >
          {(props) => (
            <Box
              {...props}
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '125px',
                height: '130px',
                backgroundColor: '#fafafa',
                borderRadius: '4px',
                border: '1px solid #d9d9d9',
                color: 'grey',
                cursor: 'pointer',
              }}
            >
              {value ? (
                <Image
                  src={value}
                  width={125}
                  height={130}
                  // fit="contain"
                />
              ) : (
                <>
                  <div>照</div>
                  <div>片</div>
                </>
              )}
            </Box>
          )}
        </FileButton>
      );
    case FormType.input:
      return (
        <TextInput
          {...rest}
          disabled={disable}
          value={value}
          onChange={(e) => {
            onChange(e.currentTarget.value);
          }}
        />
      );
    case FormType.select:
      return (
        <Select
          {...rest}
          disabled={disable}
          data={selectData}
          value={value}
          onChange={(value) => onChange(value)}
        />
      );
    case FormType.datepicker:
      return (
        <DatePicker
          {...rest}
          inputFormat="YYYY-MM-DD"
          labelFormat="YYYY-MM-DD"
          disabled={disable}
          value={value ? new Date(value) : null}
          locale="zh"
          onChange={(value) => onChange(value)}
        />
      );
    case FormType.richTextEditor:
      return (
        <Input.Wrapper sx={{ gridColumnStart: 1, gridColumnEnd: 4 }} {...rest}>
          <RichTextEditor
            value={value}
            placeholder={rest.placeholder || ''}
            onUpdate={(value) => onChange(value)}
          />
        </Input.Wrapper>
      );
    default:
      return <></>;
  }
});

export { FormRenderer };
