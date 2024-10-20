import React from "react";
import { Form } from "antd";

import { FormRule, Select } from "antd";

type CTextFieldProp = {
  rules?: FormRule[];
  fieldProps?: {
    selectFieldProps?: React.ComponentProps<typeof Select>;
  };
  label?: string | React.ReactNode;
  classes?: string;
  size?: "small" | "middle" | "large";
  name: string;
};

const CSelect: (props: CTextFieldProp) => JSX.Element = (props) => {
  const { fieldProps, label, classes, size, name } = props;
  const { selectFieldProps } = fieldProps ?? {};

  return (
    <Form.Item
      name={name}
      label={label}
      rules={props?.rules}
      className={classes}
    >
      <Select
        size={size}
        style={{ minWidth: 150 }}
        defaultActiveFirstOption
        options={selectFieldProps?.options}
      />
    </Form.Item>
  );
};

export default CSelect;
