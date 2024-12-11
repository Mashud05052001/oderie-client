import { MenuProps } from "antd";
import Link from "next/link";
import {
  HistoryOutlined,
  MessageOutlined,
  PicLeftOutlined,
  PlusCircleOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
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
    <UserOutlined />
  ),
  getItem("Products", "product", <ProductOutlined />, [
    getItem(
      <Link href={"/vendor/create-product"}>Create Product</Link>,
      "create-product",
      <PlusCircleOutlined />
    ),
    getItem(
      <Link href={"/vendor/all-products"}>All Products</Link>,
      "all-products",
      <PicLeftOutlined />
    ),
  ]),
  getItem(
    <Link href={"/vendor/product-reviews"}>Product Reviews</Link>,
    "product-reviews",
    <MessageOutlined />
  ),
  getItem(
    <Link href={"/vendor/order-history"}>Order History</Link>,
    "order-history",
    <HistoryOutlined />
  ),
];
