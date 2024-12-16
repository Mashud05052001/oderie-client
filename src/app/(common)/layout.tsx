import CommonContainer from "@/src/components/UI/container/CommonContainer";
import { TChildrenProps } from "@/src/types";

export default function Layout({ children }: TChildrenProps) {
  return <CommonContainer>{children}</CommonContainer>;
}
