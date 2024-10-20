import React, { memo, useState } from "react";
import { Button, ColorPicker } from "antd";
import type { ColorPickerProps, GetProp } from "antd";
import { CTooltip } from ".";

type Color = Extract<
  GetProp<ColorPickerProps, "value">,
  string | { cleared: any }
>;

type CColorPickerProps = {
  title?: string;
  Icon: React.ReactNode;
  onChange: (color: string) => void;
};

const CColorPicker: React.FC<CColorPickerProps> = ({
  title,
  Icon,
  onChange,
}) => {
  const [color, setColor] = useState<Color>("#000");

  const onChangeHandler = (color: Color) => {
    const tempColor = typeof color === "string" ? color : color!.toHexString();
    setColor(color as Color);
    onChange(tempColor);
  };

  return (
    <ColorPicker value={color} onChange={onChangeHandler}>
      <Button icon={Icon} />
      {/* <CTooltip title={title || ""}>
      </CTooltip> */}
    </ColorPicker>
  );
};

export default memo(CColorPicker);
