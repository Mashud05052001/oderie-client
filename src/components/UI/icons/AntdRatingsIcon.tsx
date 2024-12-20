import { Rate } from "antd";

export default function AntdRatingsIcon({
  rating,
  disabled = true,
  allowHalf = true,
}: {
  rating: number;
  disabled?: boolean;
  allowHalf?: boolean;
}) {
  return (
    <div className="flex text-yellow-400">
      <Rate disabled={disabled} defaultValue={rating} allowHalf={allowHalf} />
    </div>
  );
}
