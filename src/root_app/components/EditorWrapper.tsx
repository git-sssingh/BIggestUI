import { EditorState, LexicalEditor } from "lexical";
import { Editor } from "./Editor";
import { $generateHtmlFromNodes } from "@lexical/html";

type EditorWrapperProps = {
  initialValue?: string;
  valueSetter: (value: string) => void;
  className?: string;
};

const EditorWrapper = ({
  initialValue,
  valueSetter,
  className,
}: EditorWrapperProps) => {
  const onChange = (editorState: EditorState, editor: LexicalEditor) => {
    editor.update(() => {
      const raw = $generateHtmlFromNodes(editor, null);
      valueSetter(raw);
    });
  };

  return (
    <Editor
      initialValue={initialValue}
      onChange={onChange}
      className={className}
    />
  );
};

export default EditorWrapper;
