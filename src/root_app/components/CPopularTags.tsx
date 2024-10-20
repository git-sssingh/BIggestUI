import { Tag, Typography } from "antd";
import React, { memo } from "react";

type CPopularTagsProps = {
  tags: string[];
  clickHandler?: (tag: string) => void;
};

const CPopularTags: React.FC<CPopularTagsProps> = ({ tags, clickHandler }) => {
  return (
    <React.Fragment>
      <Typography.Title level={4} className="ml-half">
        Popular Tags
      </Typography.Title>
      <div className="mt-1">
        {tags.map((tag: string, index: number) => (
          <Tag
            color="processing"
            onClick={() => clickHandler && clickHandler(tag)}
            className="cursor-pointer text-capitalize font-16 p-4 pl-8 pr-8 m-half"
            key={index}
          >
            {tag}
          </Tag>
        ))}
      </div>
    </React.Fragment>
  );
};

export default memo(CPopularTags);
