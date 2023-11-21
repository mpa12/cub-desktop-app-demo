import React, {MutableRefObject, useState} from "react";
import {Editor} from "@tinymce/tinymce-react";
import cn from "classnames";
import LoaderSpinner from "@ui/LoaderSpinner";

interface TinyEditorProps {
  value: string;
  setValue: (newValue: string) => void;
  init: any;
}

const MIN_EDITOR_HEIGHT = 500;

const editorWrapperClassName = `w-full bg-white rounded-[10px] min-h-[${MIN_EDITOR_HEIGHT}px] relative`;
const loaderClassName = 'w-full !flex h-[500px] items-center justify-center absolute top-0 left-0';

const TinyEditor = ({
  value,
  setValue,
  init
}: TinyEditorProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const initInstanceCallback = () => {
    setIsLoading(false);
  };

  return (
    <div className={cn(editorWrapperClassName, {
      ['[&>*]:hidden']: isLoading,
    })}>
      <Editor
        apiKey='c2vyb2k8ujgdotsdufwnem7p7wa0xjxooz4diivsfma6n86q'
        value={value}
        onEditorChange={setValue}
        init={{
          branding: false,
          language: 'ru',
          height: MIN_EDITOR_HEIGHT,
          CONVERT_URLS: false,
          file_picker_types: 'media',
          plugins: [
            'powerpaste', 'textcolor', 'print', 'preview', 'paste', 'importcss', 'searchreplace',
            'autolink', 'autosave', 'save', 'directionality', 'code', 'visualblocks', 'visualchars',
            'fullscreen', 'image', 'link', 'media', 'template', 'codesample', 'table', 'charmap',
            'hr', 'pagebreak', 'nonbreaking', 'anchor', 'toc', 'insertdatetime', 'advlist', 'lists',
            'wordcount', 'imagetools', 'textpattern', 'noneditable', 'help', 'charmap', 'quickbars',
            'emoticons', 'tinydrive',
          ],
          powerpaste_word_import: 'propmt',
          powerpaste_html_import: 'propmt',
          powerpaste_allow_local_images: true,
          paste_data_images: true,
          toolbar: [
            'preview undo redo',
            'bold italic underline strikethrough',
            'fontselect fontsizeselect formatselect',
            'alignleft aligncenter alignright alignjustify',
            'forecolor backcolor removeformat',
            'image numlist bullist',
            'outdent indent',
            'charmap emoticons',
            'fu',
          ].join('|'),
          min_height: MIN_EDITOR_HEIGHT,
          init_instance_callback: initInstanceCallback,
          ...init,
        }}
      />
      {isLoading && (
        <div className={loaderClassName}>
          <LoaderSpinner loading={isLoading} />
        </div>
      )}
    </div>
  );
};

export default TinyEditor;
