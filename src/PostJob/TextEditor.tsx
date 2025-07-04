/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { RichTextEditor } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import { UseFormReturnType } from '@mantine/form';

// Update the interface to be more generic
interface TextEditorProps {
  data: string;
  form: UseFormReturnType<any>; // Use 'any' or a generic type
}

export default function TextEditor({ data, form }: TextEditorProps) {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Underline,
        Link.configure({ openOnClick: false }),
        Highlight,
        Superscript,
        Subscript,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ],
      content: data,
      onUpdate({ editor }) {
        form.setFieldValue('description', editor.getHTML());
      },
    },
    [] // <- never re-run this config
  );

  useEffect(() => {
    if (!editor) return;
    const current = editor.getHTML();
    if (data !== current) {
      editor.commands.setContent(data, false);
    }
  }, [data, editor]);

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

        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Undo />
          <RichTextEditor.Redo />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content style={{ minHeight: 300 }} />
    </RichTextEditor>
  );
}