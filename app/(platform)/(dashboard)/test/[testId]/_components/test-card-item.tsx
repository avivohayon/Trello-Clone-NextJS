"use client";

import { useCardModal } from "@/hooks/use-card-modal";
import { useTestCardModal } from "@/hooks/use-test-card-modal";
import { Card } from "@prisma/client";

interface TestCardItemProps {
  data: Card;
  index: number;
}

export const TestCardItem = ({ data, index }: TestCardItemProps) => {
  const testCardModal = useTestCardModal();
  return (
    <div
      role="button"
      onClick={() => testCardModal.onOpen(data.id)}
      className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
    >
      {data.title}
    </div>
  );
};
