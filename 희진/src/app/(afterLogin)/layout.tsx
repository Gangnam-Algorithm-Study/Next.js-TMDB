import { ReactNode } from "react";
import SessionChecker from "./SessionChecker";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <SessionChecker>
      <div>{children}</div>
    </SessionChecker>
  );
};

export default Layout;
