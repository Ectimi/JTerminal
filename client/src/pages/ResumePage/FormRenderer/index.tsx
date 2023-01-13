import { memo } from 'react'
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
  value: any;
  label: string;
  placeholder?: string;
  required: boolean;
  disable?: boolean;

  selectData?: string[] | SelectItem[];
  onChange: (value: any) => void;
  onRichTextEditorUpdate?: (htmlText: string) => void;
}

export function FormRenderer(props: IFormItem) {
  const {
    type,
    disable = false,
    selectData = [],
    value,
    onChange,
    onRichTextEditorUpdate,
    ...rest
  } = props;

  switch (type) {
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
          value={value}
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
}
