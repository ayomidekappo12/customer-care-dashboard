"use client";
import React from "react";
import NextTopLoader from "nextjs-toploader";

interface LoadingIndicatorProviderProps {
  children?: React.ReactNode;
}

export const LoadingIndicatorProvider = ({
  children,
}: LoadingIndicatorProviderProps) => {
  return (
    <>
      {children}
      <NextTopLoader
        height={2}
        color="#f6b10a"
        showSpinner={true}
      />
    </>
  );
};
