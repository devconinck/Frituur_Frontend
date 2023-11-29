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

const JWT_TOKEN_KEY = "jwtToken";
const USER_ID_KEY = "userId";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    // Check if localStorage is available
    if (typeof localStorage !== "undefined") {
      const storedToken = localStorage.getItem(JWT_TOKEN_KEY);
      if (storedToken) {
        setToken(storedToken);
        // Additional logic for user authentication if needed
      }
      setReady(true);
    } else {
      // Handle the case where localStorage is not available
      console.error("localStorage is not available.");
    }
  }, []);

  const {
    isMutating: loading,
    error,
    trigger: doLogin,
  } = useSWRMutation("login", api.post);

  useEffect(() => {
    api.setAuthToken(token);
    setIsAuthed(Boolean(token));
    setReady(true);
  }, [token]);

  const login = useCallback(
    async (email, password) => {
      try {
        const { token, user } = await doLogin({
          email,
          password,
        });

        setToken(token);
        setUser(user);

        localStorage.setItem(USER_ID_KEY, user.id);

        localStorage.setItem(JWT_TOKEN_KEY, token);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin],
  );

  const isAdmin = useMemo(() => {
    return user?.role === "admin";
  }, [user]);

  const logout = useCallback(() => {
    setToken("");
    setUser(null);

    localStorage.removeItem(JWT_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
  }, []);

  const {
    isMutating: registerLoading,
    error: registerError,
    trigger: doRegister,
  } = useSWRMutation("register", api.post);

  const register = useCallback(
    async (name, email, password) => {
      try {
        const response = await doRegister({
          name,
          email,
          password,
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
      user,
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
      user,
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
