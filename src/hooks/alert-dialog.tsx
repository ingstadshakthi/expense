import { AlertDialogContext } from "@/components/providers/alert-dialog";
import { useContext } from "react";

export const useAlertDialog = () => {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("useAlertDialog must be used within AlertDialogProvider");
  }
  return context;
};
