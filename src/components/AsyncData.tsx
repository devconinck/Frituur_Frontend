import Loader from "./Loader"; // 👈 1
import Error from "./Error"; // 👈 1

import React from "react";

type AsyncDataProps = {
  loading: boolean;
  error: any;
  children: React.ReactNode;
};

export default function AsyncData({
  loading,
  error,
  children,
}: AsyncDataProps) {
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Error error={error} />
      {children}
    </>
  );
}
