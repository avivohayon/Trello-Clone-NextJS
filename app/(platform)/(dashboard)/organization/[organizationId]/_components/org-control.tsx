"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

// actively checks what the active url is and show the needed organization in the nav bar
export const OrgControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    if (!setActive) return;

    setActive({
      organization: params.organizationId as string,
    });
  }, [setActive, params.organizationId]);

  return null;
};
