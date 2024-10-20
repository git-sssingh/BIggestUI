import { EDITOR_THEME } from "./editor_theme";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ImageNode } from "../nodes/ImageNode";
import { InlineImageNode } from "../nodes/InlineImageNode";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";

export const EDITOR_CONFIG = {
  namespace: "MyEditor",
  theme: EDITOR_THEME,
  onError: function onError(error: Error) {
    console.error(error);
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    ImageNode,
    InlineImageNode,
    HorizontalRuleNode,
  ],
};
