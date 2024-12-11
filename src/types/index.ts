import { SVGProps } from "react";
export * from "./commonType";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
