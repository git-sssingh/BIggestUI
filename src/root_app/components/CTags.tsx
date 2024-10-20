import { Tag } from "antd";
import React, { memo } from "react";

type CTagsProps = {
  tags: string[];
};

const CTags: React.FC<CTagsProps> = ({ tags }) => {
  return (
    <React.Fragment>
      {tags?.map((tag, index) => (
        <Tag color="blue" key={index} className="text-capitalize">
          {tag}
        </Tag>
      ))}
    </React.Fragment>
  );
};

export default memo(CTags);
