import { TextInput, Select, SelectItem } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { useRichTextEditorContext, RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';

export interface IFormItem {
  type: 'input' | 'select' | 'richTextEditor' | 'datepicker';
  propName: string;

  label: string;
  placeholder?: string;
  required: boolean;
  disable: boolean;

  selectData?: string[] | SelectItem[];
  defaultSelected?: string;

  richTextContent?: string;

  form: UseFormReturnType<any>;
}

export interface IRichEditor {
  content?: string;
  placeholder?: string;
}

export function RichEditor(props: IRichEditor) {
  const { placeholder = '', content = '' } = props;
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder,
      }),
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Blockquote />
          <RichTextEditor.Hr />
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          <RichTextEditor.Subscript />
          <RichTextEditor.Superscript />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export function FormRenderer(props: IFormItem) {
  const {
    form,
    type,
    propName,
    disable,
    selectData = [],
    defaultSelected = '',
    richTextContent = '',
    ...rest
  } = props;

  const FormItem = () => {
    switch (type) {
      case 'input':
        return <TextInput disabled={disable} {...rest} />;
      case 'select':
        return (
          <Select
            disabled={disable}
            data={selectData}
            defaultValue={defaultSelected}
            {...rest}
          />
        );
      case 'datepicker':
        return <DatePicker disabled={disable} {...rest} />;
      case 'richTextEditor':
        return (
          <RichEditor
            content={richTextContent}
            placeholder={rest.placeholder || ''}
          />
        );
      default:
        return <></>;
    }
  };

  return <FormItem />;
}
