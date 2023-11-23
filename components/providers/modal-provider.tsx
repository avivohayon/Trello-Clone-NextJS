"use client";

import { useEffect, useState } from "react";

import { CardModal } from "@/components/modals/card-modal";
import { ProModal } from "../modals/card-modal/pro-modal";
// import { ProModal } from "@/components/modals/pro-modal";

// this provider make sure the CardModal indded render onlyin the clint so they wont be and hydretion error (meaning client compoenent that trying to render server compoenent)
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};
