"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect } from "react";

const SessionChecker: FC<PropsWithChildren> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // 로그인 페이지로 이동시키는 함수
      router.replace("/SignIn");
    }
  }, [status, router]);

  if (!session) return null;

  return children;
};

export default SessionChecker;
