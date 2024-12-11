"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { TChildrenProps, TJwtUser } from "../types";
import { getCurrentUser } from "../hook_with_service/auth/auth.mutate.service";

type TUserContextProps = {
  user: TJwtUser | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<TJwtUser | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const UserContext = createContext<TUserContextProps | undefined>(undefined);

const UserProvider = ({ children }: TChildrenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<null | TJwtUser>(null);
  const handleUser = async () => {
    const user = await getCurrentUser();
    setUser(user);
    setIsLoading(false);
  };
  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider value={{ isLoading, user, setUser, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserProvider = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error(
      "useUserProvider hook must be inside of User Context Provider"
    );
  return context;
};

export default UserProvider;
