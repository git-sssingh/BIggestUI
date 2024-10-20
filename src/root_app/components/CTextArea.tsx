import React from "react";
import { getStringFromObject } from "../utilities";
import { Form } from "antd";

import type { FormRule } from "antd";
import { Input } from "antd";

type CTextAreaProp = {
  rules?: FormRule[];
  fieldProps?: {
    textAreaProps?: React.ComponentProps<typeof Input.TextArea>;
  };
  label?: string;
  classes?: string;
};

const CTextArea: (props: CTextAreaProp) => JSX.Element = (props) => {
  const { fieldProps, label, classes } = props;
  const { textAreaProps } = fieldProps ?? {};

  return (
    <Form.Item
      name={textAreaProps?.name}
      label={label}
      rules={props?.rules}
      className={classes}
    >
      <Input.TextArea
        {...textAreaProps}
        onChange={textAreaProps?.onChange}
        onBlur={textAreaProps?.onBlur}
        placeholder={textAreaProps?.placeholder}
        value={textAreaProps?.value}
        disabled={textAreaProps?.disabled}
        readOnly={textAreaProps?.readOnly}
      />
    </Form.Item>
  );
};

export default CTextArea;
