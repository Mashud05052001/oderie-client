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
};

export default envConfig;
