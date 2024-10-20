import React from "react";
import CButton from "./CButton";
import { Form, FormInstance } from "antd";

interface SubmitButtonProps {
  form: FormInstance;
  fullWidth?: boolean;
  className?: string;
  size?: "large" | "middle" | "small";
}

const CSubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  fullWidth = true,
  className,
  children,
  size = "middle",
}) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <CButton
      size={size}
      type="primary"
      htmlType="submit"
      text={children}
      disabled={!submittable}
      className={`${fullWidth ? "w-100-per" : ""} ${className}`}
    />
  );
};

export default CSubmitButton;
