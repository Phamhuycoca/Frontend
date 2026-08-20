import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function Editortiny() {
  const editorRef = useRef<Parameters<
    NonNullable<React.ComponentProps<typeof Editor>['onInit']>
  >[1] | null>(null);

  const handleSave = () => {
    const content = editorRef.current?.getContent() ?? '';

    console.log('Content:', content);
  };

  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_TINY_MCE}
        onInit={(_evt, editor) => {
          editorRef.current = editor;
        }}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'preview',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help | image',
        }}
      />

      <button onClick={handleSave}>
        Lưu
      </button>
    </>
  );
}