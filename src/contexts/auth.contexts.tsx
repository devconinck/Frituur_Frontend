import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
  ReactNode,
} from "react";
import * as api from "../api/index";
import { useMutation } from "@tanstack/react-query";
import { set } from "date-fns";

const JWT_TOKEN_KEY = "jwtToken";
const USER_ID_KEY = "userId";
const ADMIN_KEY = "admin";
//@ts-ignore
const AuthContext = createContext();

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export interface AuthContextValue {
  token: string | null;
  user: User | null;
  isAdmin: boolean;
  error: Error | null;
  ready: boolean;
  loading: boolean;
  isAuthed: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
  ) => Promise<boolean>;
}

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem(JWT_TOKEN_KEY) : "",
  );
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    api.setAuthToken(token!!);
    setIsAuthed(Boolean(token));
    setReady(true);
  }, [token, user]);

  const setSession = useCallback(
    (
      token: string,
      user: { id: number; name: string; email: string; role: string },
    ) => {
      setToken(token);
      setUser(user);

      localStorage.setItem(JWT_TOKEN_KEY, token);
      localStorage.setItem(USER_ID_KEY, user.id.toString());
      localStorage.setItem(ADMIN_KEY, user.role === "ADMIN" ? "true" : "false");
    },
    [],
  );

  const isAdmin =
    typeof window !== "undefined"
      ? localStorage.getItem(ADMIN_KEY) == "true"
      : false;

  const loginMutation = useMutation(
    (loginData: { email: string; password: string }) =>
      api.post("login", loginData),
  );

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { accessToken, user } = await loginMutation.mutateAsync({
          email,
          password,
        });

        setSession(accessToken, user);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [loginMutation, setSession],
  );

  const RegisterMutation = useMutation(
    (registerData: {
      name: string;
      email: string;
      password: string;
      passwordConfirm: string;
    }) => api.post("register", registerData),
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      passwordConfirm: string,
    ) => {
      try {
        const { accessToken, user } = await RegisterMutation.mutateAsync({
          name,
          email,
          password,
          passwordConfirm,
        });
        setSession(accessToken, user);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [RegisterMutation, setSession],
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);

    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isAdmin,
      error:
        (loginMutation.error as Error | null) ||
        (RegisterMutation.error as Error | null),
      ready,
      loading: loginMutation.isLoading || RegisterMutation.isLoading,
      isAuthed,
      login,
      logout,
      register,
    }),
    [
      token,
      user,
      isAdmin,
      loginMutation.error,
      RegisterMutation.error,
      ready,
      loginMutation.isLoading,
      RegisterMutation.isLoading,
      isAuthed,
      login,
      logout,
      register,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
