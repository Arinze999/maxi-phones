import type React from 'react';
export default function ProductsLayout({
  children,
}: // modal,
{
  children: React.ReactNode;
  // modal: React.ReactNode;
}) {
  return (
    <>
      {/* {modal} */}
      {children}
    </>
  );
}
