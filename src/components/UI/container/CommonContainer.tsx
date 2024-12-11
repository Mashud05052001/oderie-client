import { TChildrenProps } from "@/src/types";

export default function CommonContainer({
  children,
  className = "",
}: TChildrenProps) {
  return (
    <section className={`${className} container max-w-7xl mx-auto`}>
      {children}
    </section>
  );
}
