import { Input, Select } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

export interface IFormItem {
  name: string;
  label: string;
  required: boolean;
  disable: boolean;
  type: 'input' | 'select' | 'richTextEditor' | 'datepicker';
  selectData?: Array<{ value: any }>;
}

export default function FormRenderer(props: IFormItem) {
  const { type, selectData = [], ...rest } = props;
  const FormItem = () => {
    switch (type) {
      case 'input':
        return <Input {...rest} />;
      case 'select':
        return <Select data={selectData} {...rest} />;
      case 'datepicker':
        return <DatePicker {...rest} />;
      default:
        return;
    }
  };
}
