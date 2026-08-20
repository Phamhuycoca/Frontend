import { Editor } from '@tinymce/tinymce-react';
import { htmlToText } from '../../utils/helpers/funtions';

interface EditortinyProps {
  value?: string;
  onChange?: (value: string) => void;
  height?: number;
  disabled?: boolean;
}

export default function Editortiny({
  value = '',
  onChange,
  height = 500,
  disabled = false,
}: EditortinyProps) {
  // Nếu disabled thì chỉ hiển thị text
  if (disabled) {
    return (
      <div
        style={{
          whiteSpace: 'pre-wrap',
          minHeight: height,
        }}
      >
        {htmlToText(value)}
      </div>
    );
  }

  return (
    <Editor
      apiKey={import.meta.env.VITE_TINY_MCE}
      value={value}
      onEditorChange={(newContent: string) => {
        onChange?.(newContent);
      }}
      init={{
        statusbar: false,
        branding: false,
        height,
        elementpath: false,
        menubar: true,
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
          'undo redo | ' +
          'blocks | ' +
          'bold italic underline forecolor | ' +
          'alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | ' +
          'link image media table | ' +
          'removeformat | ' +
          'code fullscreen | ' +
          'help',

        content_style: `
          body {
            font-family: Helvetica, Arial, sans-serif;
            font-size: 14px;
          }

          img {
            max-width: 100%;
            height: auto;
          }
        `,

        file_picker_types: 'image',

        file_picker_callback: (
          callback: (
            url: string,
            meta?: {
              title?: string;
              alt?: string;
            }
          ) => void,
          _value: string,
          meta: {
            filetype: string;
          }
        ) => {
          if (meta.filetype !== 'image') {
            return;
          }

          const input = document.createElement('input');

          input.type = 'file';
          input.accept = 'image/*';

          input.onchange = () => {
            const file = input.files?.[0];

            if (!file) {
              return;
            }

            const reader = new FileReader();

            reader.onload = () => {
              const result = reader.result;

              if (typeof result !== 'string') {
                return;
              }

              callback(result, {
                title: file.name,
              });
            };

            reader.readAsDataURL(file);
          };

          input.click();
        },

        image_title: true,
        automatic_uploads: false,
        image_caption: true,
      }}
    />
  );
}
