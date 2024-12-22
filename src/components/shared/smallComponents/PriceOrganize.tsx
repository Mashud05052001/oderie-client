export default function PriceOrganize({ price }: { price: number }) {
  return (
    <span>
      {price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
      })}
    </span>
  );
}
