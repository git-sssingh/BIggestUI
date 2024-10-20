import React from "react";
import { Checkbox, Form } from "antd";

import { FormRule } from "antd";

type CTextFieldProp = {
  rules?: FormRule[];
  fieldProps?: {
    checkboxFieldProps?: React.ComponentProps<typeof Checkbox>;
  };
  label?: string | React.ReactNode;
  classes?: string;
  style?: React.CSSProperties;
  name?: string[];
};

const CCheckbox: (props: CTextFieldProp) => JSX.Element = (props) => {
  const { fieldProps, label, classes, style, name } = props;
  const { checkboxFieldProps } = fieldProps ?? {};

  return (
    <Form.Item
      style={style}
      name={name || checkboxFieldProps?.name}
      rules={props?.rules}
      className={classes}
      valuePropName="checked"
    >
      <Checkbox
        {...checkboxFieldProps}
        name={checkboxFieldProps?.name}
        onChange={checkboxFieldProps?.onChange}
        defaultChecked={true}
      >
        {label}
      </Checkbox>
    </Form.Item>
  );
};

export default CCheckbox;
