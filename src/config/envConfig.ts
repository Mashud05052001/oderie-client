const envConfig = {
  nodeEnv: process.env.NEXT_PUBLIC_NODE_ENV,
  noProfilePic: process.env.NEXT_PUBLIC_NO_PROFILE_PICTURE,
  superAdminEmail: process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL,
  baseAPI: process.env.NEXT_PUBLIC_BASE_API,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  github_client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
  github_client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
  google_client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  admin_email: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
  admin_password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
  vendor_email: process.env.NEXT_PUBLIC_VENDOR_EMAIL,
  vendor_password: process.env.NEXT_PUBLIC_VENDOR_PASSWORD,
  customer_email: process.env.NEXT_PUBLIC_CUSTOMER_EMAIL,
  customer_password: process.env.NEXT_PUBLIC_CUSTOMER_PASSWORD,
};

export default envConfig;
