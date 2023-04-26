import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Focus from '@tiptap/extension-focus';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Paragraph from '@tiptap/extension-paragraph';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';

import './index.less';
import { useUpdateEffect } from 'ahooks';

export interface IRichEditor {
  value?: string;
  placeholder?: string;
  onUpdate?: (htmlText: string) => void;
}

export default function RichEditor(props: IRichEditor) {
  const { placeholder = '', value = '', onUpdate } = props;
  const editor = useEditor({
    onUpdate({ editor }) {
      typeof onUpdate === 'function' && onUpdate(editor.getHTML());
    },
    extensions: [
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
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
      Paragraph.configure({
        HTMLAttributes: {
          class: 'richTextParagraph',
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'bulletList',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'orderedList',
        },
      }),
    ],
    autofocus: false,
    content: value,
  });

  useUpdateEffect(() => {
    if (value === '') {
      editor?.commands.setContent(value);
    }
  }, [value]);

  return (
    <RichTextEditor
      editor={editor}
      sx={{
        caretColor: '#000',
        minHeight: '200px',
        backgroundColor: '#fff',
      }}
    >
      <RichTextEditor.Toolbar sticky stickyOffset={60}>
        {/* <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold />
          <RichTextEditor.Italic />
          <RichTextEditor.Underline />
          <RichTextEditor.Strikethrough />
          <RichTextEditor.ClearFormatting />
          <RichTextEditor.Highlight />
          <RichTextEditor.Code />
        </RichTextEditor.ControlsGroup> */}

        {/* <RichTextEditor.ControlsGroup>
          <RichTextEditor.H1 />
          <RichTextEditor.H2 />
          <RichTextEditor.H3 />
          <RichTextEditor.H4 />
        </RichTextEditor.ControlsGroup> */}

        <RichTextEditor.ControlsGroup>
          {/* <RichTextEditor.Blockquote /> */}
          {/* <RichTextEditor.Hr /> */}
          <RichTextEditor.BulletList />
          <RichTextEditor.OrderedList />
          {/* <RichTextEditor.Subscript />
          <RichTextEditor.Superscript /> */}
        </RichTextEditor.ControlsGroup>

        {/* <RichTextEditor.ControlsGroup>
          <RichTextEditor.Link />
          <RichTextEditor.Unlink />
        </RichTextEditor.ControlsGroup> */}

        {/* <RichTextEditor.ControlsGroup>
          <RichTextEditor.AlignLeft />
          <RichTextEditor.AlignCenter />
          <RichTextEditor.AlignJustify />
          <RichTextEditor.AlignRight />
        </RichTextEditor.ControlsGroup> */}
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
