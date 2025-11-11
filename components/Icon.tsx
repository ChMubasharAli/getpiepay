// components/common/Icon.tsx
import React from "react";

type IconProps = {
  src: string;
  trigger?: string;
  stroke?: string;
  state?: string;
  colors?: string;
  style?: React.CSSProperties;
};

const Icon: React.FC<IconProps> = (props) => {
  return React.createElement("lord-icon", {
    ...props,
  });
};

export default Icon;
