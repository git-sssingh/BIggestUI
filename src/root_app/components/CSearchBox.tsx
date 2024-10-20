import React, { useState } from "react";
import { Button, Col, ConfigProvider, GetProps, Grid, Input, Row } from "antd";
import { CircleXIcon } from "../utilities/icons";
type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

type CSearchBoxProps = {
  defaultValue?: string;
  className?: string;
  setValue: (value: string) => void;
  style?: React.CSSProperties;
  onClear?: () => void;
};

const CSearchBox: React.FC<CSearchBoxProps> = ({
  defaultValue = "",
  className,
  setValue,
  style,
  onClear,
}): React.ReactElement => {
  const [searchValue, setSearchValue] = useState<string>("");

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    setValue(value);

  const onChange: SearchProps["onChange"] = (e) => {
    setValue(e.target.value);
  };

  return (
    <React.Fragment>
      <Search
        value={searchValue || defaultValue}
        placeholder="Type to search"
        onSearch={onSearch}
        style={{ width: 200, ...style }}
        className={`relative ${className}`}
        onChange={(e) => setSearchValue(e.target.value)}
        allowClear
        onClear={() => onClear && onClear()}
      />
    </React.Fragment>
  );
};

export default CSearchBox;
