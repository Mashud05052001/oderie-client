"use client";
import NoCartItemFound from "@/src/components/modules/cartPage/NoCartItemFound";
import PriceOrganize from "@/src/components/shared/smallComponents/PriceOrganize";
import OdButton from "@/src/components/UI/button/OdButton";
import axiosInstance from "@/src/lib/axiosInstance";
import { Tooltip } from "@nextui-org/tooltip";
import {
  TOdCartData,
  TOrderCheckout,
  TProduct,
  TReturnData,
  TSuccessMetaData,
  TVendor,
} from "@/src/types";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import generateDiscountedPrice from "@/src/utils/generateDiscountedPrice";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import Checkbox from "antd/es/checkbox/Checkbox";
import {
  MapPin,
  Minus,
  Plus,
  ShoppingCart,
  Store,
  TicketPercent,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ModalContainer from "@/src/components/modal/ModalContainer";
import moment from "moment";
import { roundFigureNumber } from "@/src/utils/roundFigureNumber";
import { useRouter } from "next/navigation";

type TSelectedCartItems = {
  productId: string;
  quantity: number;
  price: number;
};
type TCheckout = {
  vendorId: string;
  totalPrice: number;
  products: { productId: string; quantity: number }[];
  cancleUrl: string;
};

export default function CartPage() {
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [openModalId, setOpenModalId] = useState("");
  const [cartDataUpdate, setCartDataUpdate] = useState<boolean>(true);
  const [loadingCartId, setLoadingCartId] = useState<string>("");
  const [selectedCartItems, setSelectedCartItems] = useState<
    TSelectedCartItems[]
  >([]);
  const [vendorInfo, setVendorInfo] = useState<TVendor | null>(null);
  const [cartProductsData, setCartProductsData] = useState<TProduct[] | []>([]);
  const [lsCartData, setLsCartData] = useState<TOdCartData | null>(null);
  const getVendorData = async () => {
    const response = await axiosInstance.get(
      `/user/vendor/${lsCartData?.vendorId}`
    );
    const vendorData = response.data as TReturnData<TVendor>;
    setVendorInfo(vendorData?.data);
  };
  const getProductsData = async () => {
    const productIds = lsCartData?.products
      .map((item) => item.productId)
      .join(",");
    const url = `/product?productIds=${productIds}&includes=category,ProductCoupon,vendor`;
    const response = await axiosInstance.get(url);
    const productsData = response.data as TSuccessMetaData<TProduct[]>;
    setCartProductsData(productsData?.data?.data);
  };
  const getSingleProductData = async (productId: string) => {
    const url = `/product/${productId}/?includes=ProductCoupon`;
    const response = await axiosInstance.get(url);
    const productsData = response.data as TReturnData<TProduct>;
    return productsData?.data;
  };

  const productPrice = selectedCartItems?.length
    ? selectedCartItems
        .reduce((total, item) => total + item.quantity * item.price, 0)
        .toFixed(2)
    : "0";
  const shippingFees = selectedCartItems?.length * 100;
  let totalPrice = parseFloat(productPrice) + shippingFees;
  const [couponDiscountPrice, setCouponDiscountPrice] = useState(0);

  useEffect(() => {
    if (lsCartData) {
      getVendorData();
      getProductsData();
    }
  }, [lsCartData]);
  useEffect(() => {
    if (cartDataUpdate) {
      const odCart = localStorage.getItem("odCart");
      if (odCart) {
        const cartData = JSON.parse(odCart) as TOdCartData;
        setLsCartData(cartData);
      } else {
        setLsCartData(null);
        setVendorInfo(null);
        setSelectedCartItems([]);
        setCartProductsData([]);
      }
    }
    setCartDataUpdate(false);
  }, [cartDataUpdate]);

  const onCartQuantityChange = async (
    productId: string,
    action: "inc" | "dec"
  ) => {
    setLoadingCartId(productId);
    setCouponDiscountPrice(0);
    if (
      lsCartData &&
      lsCartData?.products.find((item) => item.productId === productId)
    ) {
      try {
        const selectedProductCurrentData =
          await getSingleProductData(productId);
        setCartProductsData((prev) =>
          prev.map((product) => {
            if (product.id === productId) {
              return {
                ...product,
                quantity: selectedProductCurrentData?.quantity,
                price: selectedProductCurrentData?.price,
                discount: selectedProductCurrentData?.discount,
                ProductCoupon: selectedProductCurrentData?.ProductCoupon,
              };
            }
            return product; // Return unmodified product
          })
        );
        if (action === "inc") {
          if (
            selectedProductCurrentData?.quantity ===
            lsCartData?.products.find((item) => item.productId === productId)
              ?.quantity
          ) {
            toast.error(
              "You cannot add to cart product more that the available quantity"
            );
          } else {
            const updatedLSProducts = lsCartData?.products.map((item) =>
              item.productId === productId
                ? { productId, quantity: item?.quantity + 1 }
                : item
            );
            const cartData: TOdCartData = {
              vendorId: lsCartData?.vendorId,
              products: updatedLSProducts,
            };
            localStorage.setItem("odCart", JSON.stringify(cartData));
            setSelectedCartItems((prev) =>
              prev.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            );
            setCartDataUpdate(true);
          }
        } else if (action === "dec") {
          const productInCart = lsCartData?.products.find(
            (item) => item.productId === productId
          );

          if (productInCart?.quantity === 1) {
            const confirmRemoval = window.confirm(
              "This product will be removed from the cart. Do you want to proceed?"
            );
            if (confirmRemoval) {
              const updatedLSProducts = lsCartData?.products.filter(
                (item) => item.productId !== productId
              );
              const cartData: TOdCartData = {
                vendorId: lsCartData?.vendorId,
                products: updatedLSProducts,
              };
              localStorage.setItem("odCart", JSON.stringify(cartData));
              setSelectedCartItems((prev) =>
                prev.filter((item) => item.productId !== productId)
              );
              setCartDataUpdate(true);
            }
          } else {
            const updatedLSProducts = lsCartData?.products.map((item) =>
              item.productId === productId
                ? { productId, quantity: item?.quantity - 1 }
                : item
            );
            const cartData: TOdCartData = {
              vendorId: lsCartData?.vendorId,
              products: updatedLSProducts,
            };
            localStorage.setItem("odCart", JSON.stringify(cartData));
            setSelectedCartItems((prev) =>
              prev.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
            );
            setCartDataUpdate(true);
          }
        }
      } catch {
        toast.error("Error updating cart quantity");
      }
    }
    setLoadingCartId("");
  };
  const onCheckoutSelect = async (productId: string, isChecked: boolean) => {
    setCouponDiscountPrice(0);
    if (isChecked) {
      const productFullData = cartProductsData.find(
        (item) => item?.id === productId
      );
      const productCartData = lsCartData?.products.find(
        (item) => item.productId === productId
      );
      if (productFullData && productCartData) {
        const selectProduct = {
          productId,
          quantity: productCartData?.quantity,
          price: generateDiscountedPrice(
            productFullData?.price,
            productFullData?.discount
          ),
        };
        setSelectedCartItems((prev) => [...prev, selectProduct]);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      setSelectedCartItems((prev) =>
        prev.filter((item) => item?.productId !== productId)
      );
    }
  };
  const handleApplyCoupon = () => {
    const couponWithProduct = cartProductsData
      .map((product) => {
        const couponData = product?.ProductCoupon?.find(
          (coupon) => coupon?.Coupon?.code === couponCode
        );
        const isProductSelected = selectedCartItems.find(
          (item) => product?.id === item?.productId
        );
        if (couponData && isProductSelected) {
          return {
            productId: product?.id,
            quantity: isProductSelected?.quantity,
            priceWithDiscount: generateDiscountedPrice(
              product?.price,
              product?.discount
            ),
            couponDiscount: couponData?.Coupon?.percentage || 0,
          };
        }
        return null; // Explicitly return null if no valid data is found
      })
      .filter(Boolean);
    if (couponWithProduct.length !== 0) {
      const discountPrice = couponWithProduct.reduce((total, item) => {
        const afterCouponApplyPrice =
          (item?.priceWithDiscount! * item?.couponDiscount!) / 100;
        const discountEveryQuantityPrice = parseFloat(
          (afterCouponApplyPrice * item?.quantity!).toFixed(2)
        );
        return total + discountEveryQuantityPrice;
      }, 0);
      setCouponDiscountPrice(discountPrice);
      toast.success("Coupon applied successfully");
    } else {
      toast.error("Coupon is invalid or not applicable on selected items");
    }
  };
  const handleCheckoutOrder = async () => {
    const confirm = window.confirm("Are you sure to order these items?");
    if (confirm) {
      const loadingId = toast.loading("Payment is processing...");
      setCheckoutLoading(true);
      const checkoutData: TCheckout = {
        vendorId: vendorInfo?.id!,
        totalPrice: roundFigureNumber(totalPrice - couponDiscountPrice),
        products: selectedCartItems?.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        cancleUrl: "http://localhost:5000",
      };
      const updatedLSCart = lsCartData?.products.filter(
        (item) =>
          !selectedCartItems.some((item1) => item1.productId === item.productId)
      );
      const response = (await axiosInstance.post("/order", checkoutData))
        .data as TReturnData<TOrderCheckout>;
      if (response?.success) {
        const navigateUrl = response?.data?.paymentData?.data;
        if (updatedLSCart?.length === 0) {
          localStorage.removeItem("odCart");
          setCartDataUpdate(true);
        } else {
          const updatedOdData: TOdCartData = {
            vendorId: lsCartData?.vendorId!,
            products: updatedLSCart!,
          };
          localStorage.setItem("odCart", JSON.stringify(updatedOdData));
          setCartDataUpdate(true);
        }
        setCheckoutLoading(false);
        router.push(navigateUrl);
      } else {
        setCheckoutLoading(false);
        toast.error("Something went wrong. Please try again");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* {checkoutLoading && <FullPageGlassLoading />} */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Cart Header. Select all section */}
        {!lsCartData ? (
          <></>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="font-medium">
                SELECT ALL ({lsCartData?.products.length} ITEMS)
              </span>
            </div>
            <button className="text-gray-500 hover:text-red-500">DELETE</button>
          </div>
        )}
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          {!lsCartData ? (
            <NoCartItemFound />
          ) : (
            // Cart Items
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm mb-4">
                {/* Seller Header */}
                <div className="p-4 border-b">
                  <Link
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-900"
                    href={`/vendors/${vendorInfo?.id}`}
                  >
                    <Store className="w-5 h-5" />
                    <div className="font-medium flex items-center">
                      <span>{vendorInfo?.name}</span>,
                      <MapPin className="size-5 ml-2 mr-1" />
                      <span>{vendorInfo?.address}</span>
                    </div>
                  </Link>
                </div>
                {/* Cart Items */}
                <div className="p-4">
                  {cartProductsData?.map((product) => (
                    <div
                      key={product?.id}
                      className="flex gap-4 items-end relative"
                    >
                      <label
                        htmlFor={product?.id}
                        className="flex items-center gap-4 py-4 border-b  w-full"
                      >
                        <Checkbox
                          className="w-4 h-4"
                          id={product?.id}
                          onChange={(e) =>
                            onCheckoutSelect(
                              e?.target?.id as string,
                              e?.target?.checked
                            )
                          }
                        />
                        <Avatar
                          src={product?.img?.[0] || ""}
                          alt={product?.title || "Product Image"}
                          radius="md"
                          className="w-20 h-20 object-cover bg-red-200 border"
                        />
                        <div className="flex-1">
                          <div className="flex gap-x-6">
                            <Link
                              className="font-semibold text-lg mb-1 text-black"
                              href={`/products/${product?.id}`}
                            >
                              {product?.title || "No Title Available"}
                            </Link>
                            {/* Product Coupon show modal */}
                            {product?.ProductCoupon?.length ? (
                              <Tooltip
                                content="Click to show product coupon"
                                closeDelay={200}
                              >
                                <ModalContainer
                                  isOpen={
                                    modalOpen && openModalId === product?.id
                                  }
                                  setIsOpen={setModalOpen}
                                  triggerElement={
                                    <TicketPercent
                                      onClick={() =>
                                        setOpenModalId(product?.id)
                                      }
                                    />
                                  }
                                  title={`${product?.title} all coupons`}
                                  placement="top"
                                  size="lg"
                                >
                                  <Table
                                    aria-label="Example static collection table"
                                    className="mb-3"
                                    isStriped
                                  >
                                    <TableHeader>
                                      <TableColumn>Code</TableColumn>
                                      <TableColumn>Percentage</TableColumn>
                                      <TableColumn>Expiry Date</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                      {product?.ProductCoupon.map((coupon) => (
                                        <TableRow key={coupon?.Coupon?.id}>
                                          <TableCell>
                                            {coupon?.Coupon?.code || "N/A"}
                                          </TableCell>
                                          <TableCell>
                                            {coupon?.Coupon?.percentage || "0"}%
                                          </TableCell>
                                          <TableCell>
                                            {moment(
                                              coupon?.Coupon?.expiryDate
                                            ).format("LL") || "No Expiry"}
                                          </TableCell>
                                        </TableRow>
                                      ))}
                                    </TableBody>
                                  </Table>
                                </ModalContainer>
                              </Tooltip>
                            ) : (
                              <></>
                            )}
                          </div>
                          <h5 className="text-sm mb-1">
                            Category:
                            <span className="font-medium ml-2">
                              {product?.Category?.name || "No Category"}
                            </span>
                          </h5>
                          <div className="flex justify-between items-center mt-2">
                            <div>
                              <span className="text-orange-500 font-medium">
                                ৳{" "}
                                <PriceOrganize
                                  price={generateDiscountedPrice(
                                    product?.price || 0,
                                    product?.discount || 0
                                  )}
                                />
                              </span>
                              <span className="text-gray-400 line-through ml-2">
                                ৳ <PriceOrganize price={product?.price || 0} />
                              </span>
                            </div>
                          </div>
                        </div>
                      </label>

                      <div
                        className={`flex items-center ${loadingCartId === product?.id && "opacity-50 cursor-wait "}`}
                      >
                        <button
                          className={`border  rounded text-gray-500  duration-100 px-2 py-1  ${loadingCartId === product?.id ? "cursor-wait" : "hover:border-black hover:text-black"}`}
                          onClick={() =>
                            onCartQuantityChange(product?.id, "dec")
                          }
                          disabled={loadingCartId === product?.id}
                        >
                          <Minus size={20} />
                        </button>
                        <span className="w-12 text-center">
                          {lsCartData?.products?.find(
                            (item) => item?.productId === product?.id
                          )?.quantity || 0}
                        </span>
                        <button
                          className={`border  rounded text-gray-500  duration-100 px-2 py-1  ${loadingCartId === product?.id ? "cursor-wait" : "hover:border-black hover:text-black"}`}
                          onClick={() =>
                            onCartQuantityChange(product?.id, "inc")
                          }
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({lsCartData?.products.length} items)
                  </span>
                  <span>
                    ৳&nbsp;
                    <PriceOrganize price={parseFloat(productPrice)} />
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping Fee</span>
                  <span>
                    ৳&nbsp;
                    <PriceOrganize price={shippingFees} />
                  </span>
                </div>
                {couponDiscountPrice ? (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coupon Discount</span>
                    <span>
                      ৳&nbsp; -<PriceOrganize price={couponDiscountPrice} />
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex gap-2 mb-4">
                <Input
                  type="text"
                  placeholder="Enter Voucher Code"
                  className="flex-1 border rounded"
                  disabled={!lsCartData || selectedCartItems?.length === 0}
                  onChange={(e) => {
                    setCouponCode(e.target?.value);
                    setCouponDiscountPrice(0);
                  }}
                />

                <OdButton
                  className="px-2 py-2"
                  buttonText="APPLY"
                  variant="ghost"
                  isDisabled={
                    !lsCartData ||
                    selectedCartItems?.length === 0 ||
                    couponCode === ""
                  }
                  onClick={handleApplyCoupon}
                />
              </div>
              <div className="flex justify-between font-medium mb-4">
                <span>Total</span>
                <span>
                  ৳&nbsp;
                  {/* {lsCartData ? 0 : 0} */}
                  <PriceOrganize
                    price={roundFigureNumber(totalPrice - couponDiscountPrice)}
                  />
                </span>
              </div>
              <OdButton
                className="w-full"
                buttonText={`CHECKOUT (৳ ${roundFigureNumber(totalPrice - couponDiscountPrice)})`}
                isDisabled={!lsCartData || selectedCartItems?.length === 0}
                onClick={handleCheckoutOrder}
                isLoading={checkoutLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
