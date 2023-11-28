"use client";

import { ElementRef, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { ListWithCards } from "@/types";

import { TestCardItem } from "./test-card-item";
import { TestListHeader } from "./test-list-header";

interface TestListItemProps {
  data: ListWithCards;
  index: number;
}

export const TestListItem = ({ data, index }: TestListItemProps) => {
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <li
      //   ref={provided.innerRef}
      className="shrink-0 h-full w-[272px] select-none"
    >
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        {/* <ListHeader onAddCard={enableEditing} data={data} /> */}
        <TestListHeader testTitle={data.title} />
        <ol
          //   ref={provided.innerRef}

          className={cn(
            "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
            data.cards.length > 0 ? "mt-2" : "mt-0"
          )}
        >
          {data.cards.map((card, index) => (
            <TestCardItem index={index} key={card.id} data={card} />
          ))}
        </ol>
      </div>
    </li>
  );
};
