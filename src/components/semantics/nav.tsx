import React from "react";

export default function Nav({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) {
  return <nav {...props}>{children}</nav>;
}
