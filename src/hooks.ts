import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "~/contexts/auth.contexts";

export const useRequireAuth = () => {
  const { isAuthed } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthed) {
      router.push("/register");
    }
  }, [isAuthed, router]);

  return isAuthed;
};
