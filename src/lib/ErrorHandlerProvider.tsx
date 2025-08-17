import { useContext, createContext, ReactNode } from "react";

interface AppError {
  code?: number;
  message: string;
}

const ErrorHandlerContext = createContext<
  ((error: AppError) => void) | undefined
>(undefined);

interface ErrorHandlerProviderProps {
  children?: ReactNode;
}

export const ErrorProvider = ({ children }: ErrorHandlerProviderProps) => {
  const handleError = (error: AppError) => {
    console.log(error.message);

    if (error.code === 401) {
      // auth.logout();
    }
  };

  return (
    <ErrorHandlerContext.Provider value={handleError}>
      {children}
    </ErrorHandlerContext.Provider>
  );
};

export const useErrorHandler = () => {
  const context = useContext(ErrorHandlerContext);
  if (!context) {
    throw new Error("useErrorHandler must be used within an <ErrorProvider>");
  }
  return context;
};
