import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
  ReactNode,
} from "react";
import useSWRMutation from "swr/mutation";
import * as api from "../api/index";
import { useRouter } from "next/router";
import { set } from "cypress/types/lodash";

const JWT_TOKEN_KEY = "jwtToken";
const USER_ID_KEY = "userId";
const ROLE_KEY = "role";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState("");
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedToken = localStorage.getItem(JWT_TOKEN_KEY);
      console.log("storedToken", storedToken);
      if (storedToken) {
        setToken(storedToken);
        console.log("setting token", storedToken);
        api.setAuthToken(storedToken);
        console.log("setting AUTHtoken", storedToken);
        setIsAuthed(true);
        setReady(true);
      }
      setReady(true);
    } else {
      console.error("localStorage is not available.");
    }
  }, []);

  const {
    isMutating: loading,
    error,
    trigger: doLogin,
  } = useSWRMutation("login", api.post);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const { accessToken, id, role } = await doLogin({
          email,
          password,
        });

        setToken(accessToken);
        setUserId(id);
        setRole(role);

        localStorage.setItem(USER_ID_KEY, id);

        localStorage.setItem(JWT_TOKEN_KEY, accessToken);

        api.setAuthToken(accessToken);

        localStorage.setItem(ROLE_KEY, role);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin],
  );

  const isAdmin = useMemo(() => role === "admin", [role]);

  const logout = useCallback(() => {
    setToken("");
    setUserId(null);
    setRole("");

    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(ROLE_KEY);
  }, []);

  const {
    isMutating: registerLoading,
    error: registerError,
    trigger: doRegister,
  } = useSWRMutation("register", api.post);

  const register = useCallback(
    async (name, email, password, passwordConfirm) => {
      try {
        const response = await doRegister({
          name,
          email,
          password,
          passwordConfirm,
        });
        return response;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doRegister],
  );
  const value = useMemo(
    () => ({
      token,
      userId,
      role,
      error,
      ready,
      loading,
      isAuthed,
      isAdmin,
      registerLoading,
      registerError,
      login,
      logout,
      register,
    }),
    [
      token,
      userId,
      role,
      error,
      ready,
      loading,
      isAuthed,
      isAdmin,
      registerLoading,
      registerError,
      login,
      logout,
      register,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
