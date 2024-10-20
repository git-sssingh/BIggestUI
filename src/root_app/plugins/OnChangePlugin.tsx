import { EditorState, LexicalEditor } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { memo, useEffect } from "react";

type OnChangePluginProps = {
  onChange: (editorState: EditorState, editor: LexicalEditor) => void;
};

const OnChangePlugin = memo(({ onChange }: OnChangePluginProps) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const updateListener = editor.registerUpdateListener(({ editorState }) => {
      onChange(editorState, editor);
    });

    return () => {
      updateListener();
    };
  }, [editor, onChange]);

  return null;
});

export default OnChangePlugin;
