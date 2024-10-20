import { LexicalComposer } from "@lexical/react/LexicalComposer";
import React from "react";
import { EDITOR_CONFIG } from "../utilities/editor_config";
import ParsePlugin from "../plugins/ParsePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";

const Parser = ({ value }: { value: string }) => {
  const initialConfig = {
    ...EDITOR_CONFIG,
    namespace: "root",
    editable: false,
    onError: (e: Error) => console.log(e),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <ParsePlugin value={value} />
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        ErrorBoundary={LexicalErrorBoundary}
      />
    </LexicalComposer>
  );
};

export default Parser;
