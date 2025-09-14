import Link from "next/link";
import { ReactNode } from "react";

type AsideProps = React.ComponentPropsWithoutRef<"aside"> & {
  children: ReactNode;
};

export default function Aside({ children, ...props }: AsideProps) {
  return <aside {...props}>{children}</aside>;
}
