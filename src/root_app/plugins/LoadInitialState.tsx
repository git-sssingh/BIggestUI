import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useEffect } from "react";
import { $generateNodesFromDOM } from "@lexical/html";
import { $getRoot, $insertNodes } from "lexical";
import { EDITOR_INITIAL_VALUE } from "../constants";

interface ILoadInitialStateProps {
  initialValue?: string;
}

const LoadInitialState: React.FC<ILoadInitialStateProps> = ({
  initialValue = "",
}) => {
  const [editor] = useLexicalComposerContext();
  const [hasValueSet, setHasValueSet] = React.useState(false);

  useEffect(() => {
    if (editor && !hasValueSet) {
      editor.update(() => {
        // In the browser you can use the native DOMParser API to parse the HTML string.
        const parser = new DOMParser();
        const dom = parser.parseFromString(
          initialValue || EDITOR_INITIAL_VALUE,
          "text/html"
        );
        // Once you have the DOM instance it's easy to generate LexicalNodes.
        const nodes = $generateNodesFromDOM(editor, dom);
        // Select the root
        $getRoot().clear();
        $getRoot().select();

        // Insert them at a selection.
        $insertNodes(nodes);
        setHasValueSet(true);
      });
    }
  }, [initialValue, editor]);

  return null;
};

export default LoadInitialState;
