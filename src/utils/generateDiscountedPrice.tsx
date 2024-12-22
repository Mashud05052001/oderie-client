const generateDiscountedPrice = (price: number, discount: number = 0) => {
  const cutPrice = (price * discount) / 100;
  const afterDiscountPrice = parseFloat((price - cutPrice).toFixed(2));
  return afterDiscountPrice;
};

export default generateDiscountedPrice;
