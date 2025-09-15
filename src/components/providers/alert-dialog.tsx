"use client";

import * as React from "react";
import {
  AlertDialog as ShadAlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface AlertOptions {
  title: string;
  message: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
}

interface AlertContextType {
  openAlert: (options: AlertOptions) => void;
}

export const AlertDialogContext = React.createContext<
  AlertContextType | undefined
>(undefined);

export const AlertDialogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<AlertOptions | null>(null);

  const openAlert = (opts: AlertOptions) => {
    setOptions(opts);
    setOpen(true);
  };

  const handleCancel = () => {
    options?.onCancel?.();
    setOpen(false);
  };

  const handleConfirm = () => {
    options?.onConfirm();
    setOpen(false);
  };

  return (
    <AlertDialogContext.Provider value={{ openAlert }}>
      {children}
      {options && (
        <ShadAlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{options.title}</AlertDialogTitle>
              <AlertDialogDescription>{options.message}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirm}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </ShadAlertDialog>
      )}
    </AlertDialogContext.Provider>
  );
};
