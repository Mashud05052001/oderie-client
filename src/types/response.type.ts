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
  Vendor?: TVendor;
  Profile?: TProfile;
  Follow?: TFollow[];
  Review?: TReview[];
  Order?: TOrder[];
  _count?: {
    Review: number;
    Order: number;
    Follow: number;
  };
};

export type TProfile = {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  img: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;

  User?: TUser;
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
  discount: number;
  quantity: number;
  img: string[];
  categoryId: string;
  vendorId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  Category?: TCategory;
  ratings: number;
  [key: string]: any;
  Vendor?: TVendor;
  ProductCoupon?: TProductCoupon[];
  // Review ? :
  // Order ? :
  _count?: {
    Review: number;
    Order: number;
    ProductCoupon: number;
  };
};

export type TVendor = {
  id: string;
  email: string;
  name: string;
  phone: string;
  logo: string;
  description: string;
  address: string;
  ratings: number;
  ratingsCount: number;
  isBlackListed: boolean;
  createdAt: string;
  updatedAt: string;

  User?: TUser;
  Product?: TProduct[];
  Follow?: TFollow[];
  _count?: {
    Follow: number;
    Order: number;
    Product: number;
    VendorResponse: number;
  };
  VendorResponse?: TVendorResponse[];
  Order?: TOrder[];
};

export type TCoupon = {
  id: string;
  code: string;
  percentage: number;
  expiryDate: string;
  vendorId: string;
  ProductCoupon?: TProductCoupon[];
};

export type TProductCoupon = {
  productId: string;
  couponId: string;
  Product?: TProduct;
  Coupon?: TCoupon;
};

export type TReview = {
  id: string;
  productImg: string;
  message: string;
  ratings: number;
  orderId: string;
  productId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;

  // Relations
  Product?: TProduct;
  User?: TUser;
  Order?: TOrder;
  VendorResponse?: TVendorResponse | null;
};

export type TVendorResponse = {
  id: string;
  message: string;
  reviewId: string;
  vendorId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;

  // Relations
  Review?: TReview;
  Vendor?: TVendor;
};

export type TOrder = {
  id: string;
  userId: string;
  vendorId: string;
  status: TOrderStatus;
  totalPrice: number;
  paymentStatus: TPaymentStatus;
  createdAt: string;
  updatedAt: string;

  // Relations
  User?: TUser;
  Vendor?: TVendor;
  Payment?: TPayment | null;
  OrderItem?: TOrderItem[];
  Review?: TReview[];
  _count?: {
    OrderItem: number;
    Review: number;
  };
};

export type TPayment = {
  id: string;
  transactionId: string;
  amount: number;
  orderId: string;
  gatewayData: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;

  // Relation
  Order?: TOrder;
};

export type TOrderItem = {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  Product?: TProduct;
  Order?: TOrder;
};

export type TOrderCheckout = {
  order: TOrder;
  paymentData: {
    data: string;
    transactionId: string;
  };
};

export type TFollow = {
  userId: string;
  vendorId: string;
  User?: TUser;
  Vendor?: TVendor;
  createdAt: string;
  updatedAt: string;
};
