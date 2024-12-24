export default function NoDataFound({
  text,
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <p className={`text-2xl font-semibold text-red-500 p-5 ${className}`}>
      {text ?? "No data found"}
    </p>
  );
}
