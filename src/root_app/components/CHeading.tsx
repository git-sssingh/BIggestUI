import React from "react";

type CHeadingProps = {
  id?: string;
  text: string;
};

const CHeading = ({ text, id }: CHeadingProps) => {
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  return (
    <h2
      id={id}
      ref={headingRef}
      onFocus={() => console.log(headingRef?.current)}
      contentEditable
      suppressContentEditableWarning
    >
      {text}
    </h2>
  );
};

export default CHeading;
