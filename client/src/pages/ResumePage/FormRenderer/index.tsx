import { Input, TextInput, Select, SelectItem } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import RichTextEditor from '@/components/RichTextEditor';
import 'dayjs/locale/zh';

export enum FormType {
  'input',
  'select',
  'richTextEditor',
  'datepicker',
}

export interface IFormItem {
  type: FormType;
  defaultValue?: any;
  label: string;
  placeholder?: string;
  required: boolean;
  disable?: boolean;

  selectData?: string[] | SelectItem[];
  onRichTextEditorUpdate?: (htmlText: string) => void;
}

export function FormRenderer(props: IFormItem) {
  const {
    type,
    disable = false,
    selectData = [],
    defaultValue = '',
    onRichTextEditorUpdate,
    ...rest
  } = props;

  switch (type) {
    case FormType.input:
      return <TextInput disabled={disable} value={defaultValue} {...rest} />;
    case FormType.select:
      return (
        <Select
          disabled={disable}
          data={selectData}
          value={defaultValue}
          {...rest}
        />
      );
    case FormType.datepicker:
      return (
        <DatePicker
          inputFormat="YYYY-MM-DD"
          labelFormat="YYYY-MM-DD"
          disabled={disable}
          value={defaultValue}
          {...rest}
          locale="zh"
        />
      );
    case FormType.richTextEditor:
      return (
        <Input.Wrapper sx={{ gridColumnStart: 1, gridColumnEnd: 4 }} {...rest}>
          <RichTextEditor
            content={defaultValue}
            placeholder={rest.placeholder || ''}
            onUpdate={onRichTextEditorUpdate}
          />
        </Input.Wrapper>
      );
    default:
      return <></>;
  }
}
