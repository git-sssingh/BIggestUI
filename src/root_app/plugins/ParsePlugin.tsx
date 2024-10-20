import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useEffect } from "react";

const Parser = ({ value }: { value: string }) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    const editorState = editor.parseEditorState(JSON.parse(value));
    editor.setEditorState(editorState);
  }, [value]);

  return null;
};

export default Parser;
