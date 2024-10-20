import { Typography } from "antd";
import React from "react";
import { memo } from "react";

const CLabelElement = ({
  heading,
  subHeading,
  field,
}: {
  heading: string;
  subHeading: string;
  field: React.ReactNode;
}) => {
  return (
    <React.Fragment>
      <Typography.Title level={4} style={{ lineHeight: "0.5" }}>
        {heading}
      </Typography.Title>
      <Typography.Text>{subHeading}</Typography.Text>
      {field}
    </React.Fragment>
  );
};

export default memo(CLabelElement);
