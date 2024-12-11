export type TUserRole = "CUSTOMER" | "ADMIN" | "VENDOR";
export type TUserStatus = "ACTIVE" | "BLOCKED" | "DELETED";
export type TPaymentStatus = "UNPAID" | "PAID";
export type TOrderStatus = "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED";

export type TUser = {
  id: string;
  email: string;
  role: TUserRole;
  password: string;
  status: TUserStatus;
  createdAt: string;
  updatedAt: string;
};

export type TLoginResponse = {
  accessToken: string;
  refreshToken: string;
  role: TUserRole;
};

export type TCategory = {
  id: string;
  name: string;
  icon: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  img: string[];
  categoryId: string;
  vendorId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  Category?: TCategory;
  [key: string]: any;
  // Vendor ? :
  // Review ? :
  // Order ? :
  // _count ? :
};
