import { Popover } from "antd";

type TProps = {
  str: string;
  length?: number;
  delay?: number;
  isThreeDotNeeded?: boolean;
};

export default function PopOverContent({
  str,
  length = 20,
  delay = 0.05,
  isThreeDotNeeded = true,
}: TProps) {
  return (
    <Popover
      content={
        <div className="max-w-80 max-h-80 overflow-y-auto">
          <p>{str}</p>
        </div>
      }
      mouseLeaveDelay={delay}
    >
      {isThreeDotNeeded ? (
        <span className={`truncate block max-w-[${length}ch]`}>{str}</span>
      ) : (
        <span>{str.slice(0, length - 1)}</span>
      )}
    </Popover>
  );
}
