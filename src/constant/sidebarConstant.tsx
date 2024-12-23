import { MenuProps } from "antd";
import {
  BadgePercent,
  BadgePlus,
  CircleUserRound,
  History,
  LayoutGrid,
  MessageSquareIcon,
  Package,
  ShoppingBag,
  SquareKanban,
  Store,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

export type MenuItem = Required<MenuProps>["items"][number];

export function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const vendorSidebarItems: MenuItem[] = [
  getItem(
    <Link href={`/vendor/profile`}>Profile</Link>,
    "profile",
    <CircleUserRound size={22} />
  ),
  getItem("Products", "product", <Package size={22} />, [
    getItem(
      <Link href={"/vendor/create-product"}>Create Product</Link>,
      "create-product",
      <BadgePlus size={20} />
    ),
    getItem(
      <Link href={"/vendor/all-products"}>All Products</Link>,
      "all-products",
      <SquareKanban size={20} />
    ),
    getItem(
      <Link href={"/vendor/coupons"}>Coupons</Link>,
      "coupons",
      <BadgePercent size={20} />
    ),
  ]),
  getItem(
    <Link href={"/vendor/product-reviews"}>Product Reviews</Link>,
    "product-reviews",
    <MessageSquareIcon size={22} />
  ),
  getItem(
    <Link href={"/vendor/order-history"}>Order History</Link>,
    "order-history",
    <History size={22} />
  ),
];

export const userSidebarItems: MenuItem[] = [
  getItem(
    <Link href={`/dashboard/profile`}>Profile</Link>,
    "profile",
    <CircleUserRound size={22} />
  ),
  getItem(
    <Link href={`/dashboard/orders`}>Orders</Link>,
    "orders",
    <ShoppingBag size={22} />
  ),
  getItem(
    <Link href={`/dashboard/reviews`}>Reviews</Link>,
    "reviews",
    <MessageSquareIcon size={22} />
  ),
];

export const adminSidebarItems: MenuItem[] = [
  getItem("User Management", "user", <UsersRound size={22} />, [
    getItem(
      <Link href={"/admin/users"}>Customers</Link>,
      "create-product",
      <CircleUserRound size={20} />
    ),
    getItem(
      <Link href={"/admin/vendors"}>Vendors</Link>,
      "all-products",
      <Store size={20} />
    ),
  ]),
  getItem("Product Management", "product", <Package size={22} />, [
    getItem(
      <Link href={"/admin/products"}>Products</Link>,
      "products",
      <SquareKanban size={20} />
    ),
    getItem(
      <Link href={"/admin/reviews"}>Reviews</Link>,
      "reviews",
      <MessageSquareIcon size={20} />
    ),
    getItem(
      <Link href={"/admin/orders"}>Orders</Link>,
      "orders",
      <History size={20} />
    ),
  ]),
  getItem(
    <Link href={`/admin/categories`}>Categories</Link>,
    "categories",
    <LayoutGrid size={22} />
  ),
];
