import { SVGProps } from "react";
export * from "./commonType";
export * from "./response.type";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
