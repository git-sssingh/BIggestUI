import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { EDITOR_CONFIG } from "../utilities/editor_config";
import OnChangePlugin from "../plugins/OnChangePlugin";
import { EditorState, LexicalEditor } from "lexical";
import AutoLinksPlugin from "../plugins/AutoLinksPlugin";
import ToolbarPlugin from "../plugins/ToolbarPlugin";
import { Divider } from "antd";
import CodeHighlightPlugin from "../plugins/CodeHighlightPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ListMaxIndentLevelPlugin from "../plugins/ListMaxIndentLevelPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import ImagePlugin from "../plugins/ImagePlugin";
import InlineImagePlugin from "../plugins/InlineImagePlugin";
import DragDropPaste from "../plugins/DragAndDropPlugin";
import { LoadInitialState } from "../plugins";

const placeholder = "Write something...";

type EditorProps = {
  initialValue?: string;
  onChange: (editorState: EditorState, editor: LexicalEditor) => void;
  className?: string;
};

export function Editor({ initialValue, onChange, className }: EditorProps) {
  return (
    <LexicalComposer initialConfig={EDITOR_CONFIG}>
      <div className="editor-container">
        <LoadInitialState initialValue={initialValue} />
        <ToolbarPlugin />
        <Divider style={{ margin: "0px" }} />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={`editor-input ${className}`}
                aria-placeholder={placeholder}
                placeholder={
                  <div className="editor-placeholder">{placeholder}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <CodeHighlightPlugin />
          <DragDropPaste />
          <ListPlugin />
          <LinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <AutoLinksPlugin />
          <CodeHighlightPlugin />
          <ImagePlugin />
          <InlineImagePlugin />
          <OnChangePlugin
            onChange={(editorState, editor) => onChange(editorState, editor)}
          />
        </div>
      </div>
    </LexicalComposer>
  );
}
