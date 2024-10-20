import React from "react";
import { Form } from "antd";

import type { FormRule } from "antd";
import { Input } from "antd";

type CTextFieldProp = {
  rules?: FormRule[];
  fieldProps?: {
    textFieldProps?: React.ComponentProps<typeof Input>;
  };
  name?: string[];
  label?: string | React.ReactNode;
  classes?: string;
  size?: "small" | "middle" | "large";
};

const CTextField: (props: CTextFieldProp) => JSX.Element = (props) => {
  const { name, fieldProps, label, classes, size } = props;
  const { textFieldProps } = fieldProps ?? {};

  return (
    <Form.Item
      name={name || textFieldProps?.name}
      label={label}
      rules={props?.rules}
      className={classes}
    >
      {textFieldProps?.type === "password" ? (
        <Input.Password
          {...textFieldProps}
          size={size}
          placeholder={textFieldProps?.placeholder}
          onChange={textFieldProps?.onChange}
          onBlur={textFieldProps?.onBlur}
          value={textFieldProps?.value}
          disabled={textFieldProps?.disabled}
          readOnly={textFieldProps?.readOnly}
        />
      ) : (
        <Input
          {...textFieldProps}
          size={size}
          placeholder={textFieldProps?.placeholder}
          onChange={textFieldProps?.onChange}
          onBlur={textFieldProps?.onBlur}
          value={textFieldProps?.value}
          disabled={textFieldProps?.disabled}
          readOnly={textFieldProps?.readOnly}
        />
      )}
    </Form.Item>
  );
};

export default CTextField;
