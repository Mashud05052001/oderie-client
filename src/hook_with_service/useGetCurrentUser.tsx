"use client";
import { useEffect, useState } from "react";
import { TJwtUser } from "../types";
import { getCurrentUser } from "./auth/auth.mutate.service";

export default function useGetCurrentUser() {
  const [currentLoginUser, setCurrentLoginUser] = useState<TJwtUser | null>(
    null
  );
  const fetchUserData = async () => setCurrentLoginUser(await getCurrentUser());

  useEffect(() => {
    fetchUserData();
  }, []);

  return currentLoginUser;
}
