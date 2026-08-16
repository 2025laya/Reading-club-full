import React from "react";
import { getTextFont } from "./fonts";

export default function Text({ children, style = {}, ...props }) {
  return (
    <span
      {...props}
      style={{
        fontFamily: getTextFont(children),
        ...style,
      }}
    >
      {children}
    </span>
  );
}