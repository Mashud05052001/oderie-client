"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";

const Tiptap = ({ onChange, content }: any) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-700 text-gray-400 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} content={content} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;

{
  /* <Controller
  name={name}
  render={({ field, fieldState: { error } }) => (
    <div className={`${className} space-y-2 relative min-h-60`}>
      <label htmlFor={name} className="text-gray-500 font-medium text-sm">
        {label}
      </label>
      <TextEditor value={field.value as string} onChange={field.onChange} />
      {error && (
        <div className="absolute left-[0.1rem] bottom-[-4.2rem] text-red-500 whitespace-nowrap overflow-hidden text-sm font-medium text-ellipsis">
          <small>{error.message}</small>
        </div>
      )}
    </div>
  )}
/> */
}
