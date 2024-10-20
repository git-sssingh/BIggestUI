import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button, ColorPicker, Divider, Select, Space } from "antd";
import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  $isRootOrShadowRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  ElementFormatType,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  LexicalCommand,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  TextFormatType,
  UNDO_COMMAND,
} from "lexical";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BaselineIcon,
  BoldIcon,
  BracesIcon,
  ChevronDownIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  ImageIcon,
  ItalicIcon,
  Link2Icon,
  Link2OffIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PaintBucketIcon,
  QuoteIcon,
  RedoIcon,
  SeparatorHorizontalIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
} from "../utilities/icons";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import {
  $findMatchingParent,
  $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeOfType,
  $isEditorIsNestedEditor,
  mergeRegister,
} from "@lexical/utils";
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $setBlocksType,
  $isAtNodeEnd,
  $patchStyleText,
  $wrapNodes,
} from "@lexical/selection";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
} from "@lexical/rich-text";
import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
  getCodeLanguages,
} from "@lexical/code";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
  ListNode,
} from "@lexical/list";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { createPortal } from "react-dom";
import FloatingLinkEditor from "../components/FloatingLinkEditor";
import { AggregationColor } from "antd/es/color-picker/color";
import useModal from "../hooks/useModal";
import { InsertImageDialog } from "./ImagePlugin";
import { InsertInlineImageDialog } from "./InlineImagePlugin";
import CColorPicker from "../components/CColorPicker";
import { CDropdown, CTooltip } from "../components";

const blockTypeToBlockName: Record<string, string> = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};

const blockTypeIcon: Record<string, JSX.Element> = {
  bullet: <ListIcon height={14} />,
  check: <ListOrderedIcon height={14} />,
  code: <CodeIcon height={14} />,
  h1: <Heading1Icon height={14} />,
  h2: <Heading2Icon height={14} />,
  h3: <Heading2Icon height={14} />,
  h4: <Heading2Icon height={14} />,
  h5: <Heading2Icon height={14} />,
  h6: <Heading2Icon height={14} />,
  number: <ListIcon height={14} />,
  paragraph: <MinusIcon height={14} />,
  quote: <QuoteIcon height={14} />,
};

const LowPriority = 1;

const getSelectedNode = (selection: any) => {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
};

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const toolbarRef = React.useRef<HTMLDivElement>(null);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [isStrikethrough, setIsStrikethrough] = useState<boolean>(false);
  const [isHrActive, setIsHrActive] = useState<boolean>(false);
  const [blockType, setBlockType] = useState<string>("normal");
  const [selectedElementKey, setSelectedElementKey] = useState<any>(null);
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] =
    useState<boolean>(false);
  const [codeLanguage, setCodeLanguage] = useState("");
  const [isRTL, setIsRTL] = useState<boolean>(false);
  const [isLink, setIsLink] = useState<boolean>(false);
  const [isCode, setIsCode] = useState<boolean>(false);
  const [textColorPickerVisible, setTextColorPickerVisible] =
    useState<boolean>(false);
  const [bgColorPickerVisible, setBgColorPickerVisible] =
    useState<boolean>(false);
  const [bgColor, setBgColor] = useState<string>("#fff");
  const [showMenuList, setShowMenuLists] = useState<boolean>(false);
  const [isImageCaption, setIsImageCaption] = useState(false);
  const [language, setLanguage] = useState<string>("javascript");
  const [modal, showModal] = useModal();

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      if (activeEditor !== editor && $isEditorIsNestedEditor(activeEditor)) {
        const rootElement = activeEditor.getRootElement();
        setIsImageCaption(
          !!rootElement?.parentElement?.classList.contains(
            "image-caption-container"
          )
        );
      } else {
        setIsImageCaption(false);
      }

      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      // setIsSubscript(selection.hasFormat("subscript"));
      // setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      // const tableNode = $findMatchingParent(node, $isTableNode);
      // if ($isTableNode(tableNode)) {
      //   setRootType("table");
      // } else {
      //   setRootType("root");
      // }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }
          if ($isCodeNode(element)) {
            const language =
              element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            setCodeLanguage(
              language ? CODE_LANGUAGE_MAP[language] || language : ""
            );
            return;
          }
        }
      }

      if ($isLinkNode(parent)) {
        // If node is a link, we need to fetch the parent paragraph node to set format
        $findMatchingParent(
          node,
          (parentNode) => $isElementNode(parentNode) && !parentNode.isInline()
        );
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          setActiveEditor(editor);
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  const handleUndoAndRedo = (command: LexicalCommand<void>): void => {
    editor.dispatchCommand(command, undefined);
  };
  const handleTextFormatting = (command: TextFormatType): void => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, command);
  };

  const handleElementFormatting = useCallback(
    (command: ElementFormatType): void => {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, command);
    },
    [editor]
  );

  const handleChange = (value: string, type: string) => {
    switch (value) {
      case "normal":
        editor.update(() => {
          const selection = $getSelection();
          $isRangeSelection(selection) &&
            $setBlocksType(selection, () => $createParagraphNode());
        });
        break;

      case "heading1":
        editor.update(() => {
          const selection = $getSelection();
          $isRangeSelection(selection) &&
            $setBlocksType(selection, () => $createHeadingNode("h1"));
        });
        break;

      case "heading2":
        editor.update(() => {
          const selection = $getSelection();
          $isRangeSelection(selection) &&
            $setBlocksType(selection, () => $createHeadingNode("h2"));
        });
        break;

      case "blockQuote":
        editor.update(() => {
          const selection = $getSelection();
          $isRangeSelection(selection) &&
            $setBlocksType(selection, () => $createQuoteNode());
        });
        break;

      case "codeBlock":
        editor.update(() => {
          const selection = $getSelection();
          $isRangeSelection(selection) &&
            $setBlocksType(selection, () => $createCodeNode());
        });
        break;

      case "list":
        if (blockType !== type) {
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        } else {
          editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
        break;

      case "orderedList":
        if (blockType !== type) {
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        } else {
          editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }

        break;
    }

    setBlockType(type);
  };

  const options = [
    {
      key: "1",
      label: "Normal",
      icon: <MinusIcon height={14} />,
      onClick: () => handleChange("normal", "paragraph"),
    },
    {
      key: "2",
      label: "Heading 1",
      icon: <Heading1Icon height={14} />,
      onClick: () => handleChange("heading1", "h1"),
    },
    {
      key: "3",
      label: "Heading 2",
      icon: <Heading2Icon height={14} />,
      onClick: () => handleChange("heading2", "h2"),
    },
    {
      key: "4",
      label: "Blockquote",
      icon: <QuoteIcon height={14} />,
      onClick: () => handleChange("blockQuote", "quote"),
    },
    {
      key: "5",
      label: "Code Block",
      icon: <BracesIcon height={14} />,
      onClick: () => handleChange("codeBlock", "code"),
    },
    {
      key: "6",
      label: "List",
      icon: <ListIcon height={14} />,
      onClick: () => handleChange("list", "bullet"),
    },
    {
      key: "7",
      label: "Ordered List",
      icon: <ListOrderedIcon height={14} />,
      onClick: () => handleChange("orderedList", "number"),
    },
  ];

  const codeLanguges = useMemo(
    () =>
      getCodeLanguages()?.map((language, index) => ({
        key: index.toString(),
        label: language?.toUpperCase(),
        onClick: () => onCodeLanguageSelect(language),
      })),
    []
  );

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode();
          let element =
            anchorNode.getKey() === "root"
              ? anchorNode
              : $findMatchingParent(anchorNode, (e) => {
                  const parent = e.getParent();
                  return parent !== null && $isRootOrShadowRoot(parent);
                });

          if (element === null) {
            element = anchorNode.getTopLevelElementOrThrow();
          }
          const elementKey = element.getKey();
          const elementDOM = activeEditor.getElementByKey(elementKey);

          if (elementDOM !== null) {
            setSelectedElementKey(elementKey);
            if ($isCodeNode(element)) {
              element.setLanguage(value);
              setLanguage(value);
              const language =
                element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
              setCodeLanguage(
                language ? CODE_LANGUAGE_MAP[language] || language : ""
              );
            }
          }
        }
      });
    },
    [editor, selectedElementKey]
  );

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://");
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const handleTextColorChange = useCallback(
    (color: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            color: color,
          });
        }
      });
    },
    [editor]
  );

  const handleBackgroundColorChange = useCallback(
    (color: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            "background-color": color,
          });
        }
      });
    },
    [editor]
  );

  return (
    <div className="toolbar" ref={toolbarRef}>
      <Space.Compact>
        <CTooltip title="Undo">
          <Button
            disabled={!canUndo}
            icon={<UndoIcon height={14} />}
            onClick={() => handleUndoAndRedo(UNDO_COMMAND)}
          />
        </CTooltip>
        <CTooltip title="Redo">
          <Button
            disabled={!canRedo}
            icon={<RedoIcon height={14} />}
            onClick={() => handleUndoAndRedo(REDO_COMMAND)}
          />
        </CTooltip>
      </Space.Compact>
      <Divider type="vertical" style={{ height: "2em" }} />
      <CDropdown
        className="block-type-dropdown"
        items={options}
        children={
          <div
            style={{ minWidth: "120px" }}
            className="d-flex justify-content-space-between align-items-center"
          >
            <div className="left-part d-flex align-items-center">
              {blockTypeIcon[blockType as string]}
              {blockTypeToBlockName[blockType as string]}
            </div>
            <ChevronDownIcon className="ml-1" height={14} />
          </div>
        }
      />
      <Divider type="vertical" style={{ height: "2em" }} />
      {blockType === "code" ? (
        <CDropdown
          className="block-type-dropdown"
          items={codeLanguges}
          children={
            <div
              style={{ minWidth: "120px", paddingLeft: "8px" }}
              className="d-flex justify-content-space-between align-items-center"
            >
              {language?.toUpperCase()}
              <ChevronDownIcon className="ml-1" height={14} />
            </div>
          }
        />
      ) : (
        <React.Fragment>
          <Space.Compact>
            <CTooltip title="Bold">
              <Button
                className={isBold ? "style-button-active" : ""}
                icon={<BoldIcon height={14} />}
                onClick={() => handleTextFormatting("bold")}
              />
            </CTooltip>
            <CTooltip title="Italic">
              <Button
                className={isItalic ? "style-button-active" : ""}
                icon={<ItalicIcon height={14} />}
                onClick={() => handleTextFormatting("italic")}
              />
            </CTooltip>
            <CTooltip title="Underline">
              <Button
                className={isUnderline ? "style-button-active" : ""}
                icon={<UnderlineIcon height={14} />}
                onClick={() => handleTextFormatting("underline")}
              />
            </CTooltip>
            <CTooltip title="Strike Through">
              <Button
                className={isStrikethrough ? "style-button-active" : ""}
                icon={<StrikethroughIcon height={14} />}
                onClick={() => handleTextFormatting("strikethrough")}
              />
            </CTooltip>
            <CTooltip title="Embbed Code">
              <Button
                className={isCode ? "style-button-active" : ""}
                icon={<CodeIcon height={14} />}
                onClick={() => handleTextFormatting("code")}
              />
            </CTooltip>
            <CTooltip title="Link">
              <Button
                className={isLink ? "style-button-active" : ""}
                icon={<Link2Icon height={14} />}
                onClick={insertLink}
              />
            </CTooltip>
            <CTooltip title="Horizontal Line">
              <Button
                className={isHrActive ? "style-button-active" : ""}
                icon={<SeparatorHorizontalIcon height={14} />}
                onClick={(e) => {
                  activeEditor.dispatchCommand(
                    INSERT_HORIZONTAL_RULE_COMMAND,
                    undefined
                  );
                }}
              />
            </CTooltip>
          </Space.Compact>

          {isLink &&
            createPortal(<FloatingLinkEditor editor={editor} />, document.body)}

          <Divider type="vertical" style={{ height: "2em" }} />
          <Space.Compact>
            <CTooltip title="Align left">
              <Button
                icon={<AlignLeftIcon height={14} />}
                onClick={() => handleElementFormatting("left")}
              />
            </CTooltip>
            <CTooltip title="Align center">
              <Button
                icon={<AlignCenterIcon height={14} />}
                onClick={() => handleElementFormatting("center")}
              />
            </CTooltip>
            <CTooltip title="Align right">
              <Button
                icon={<AlignRightIcon height={14} />}
                onClick={() => handleElementFormatting("right")}
              />
            </CTooltip>
            <CTooltip title="Align justify">
              <Button
                icon={<AlignJustifyIcon height={14} />}
                onClick={() => handleElementFormatting("justify")}
              />
            </CTooltip>
          </Space.Compact>

          <Divider type="vertical" style={{ height: "2em" }} />
          <Space.Compact>
            <CColorPicker
              title="Text color"
              Icon={<BaselineIcon height={14} />}
              onChange={handleTextColorChange}
            />
            <CColorPicker
              title="Background color"
              Icon={<PaintBucketIcon height={14} />}
              onChange={handleBackgroundColorChange}
            />
          </Space.Compact>

          <Divider type="vertical" style={{ height: "2em" }} />
          {/* <Button
            icon={<ImageIcon />}
            style={{ margin: "0 2px" }}
            onClick={() => {
              showModal("Insert Image", (onClose) => (
                <InsertImageDialog
                  activeEditor={activeEditor}
                  onClose={onClose}
                />
              ));
            }}
          /> */}
          <Space.Compact>
            <CTooltip title="Insert Image">
              <Button
                icon={<ImageIcon height={14} />}
                onClick={() => {
                  showModal("Insert Image", (onClose: any) => (
                    <InsertInlineImageDialog
                      activeEditor={activeEditor}
                      onClose={onClose}
                    />
                  ));
                }}
              />
            </CTooltip>
          </Space.Compact>
        </React.Fragment>
      )}
      {modal}
    </div>
  );
};

export default ToolbarPlugin;
