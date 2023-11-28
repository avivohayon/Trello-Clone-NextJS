"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
// import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { ListWithCards } from "@/types";
import { useAction } from "@/hooks/use-action";
import { TestListItem } from "./test-list-item";
import { updateListOrder } from "@/actions/update-list-order";
import { updateCardOrder } from "@/actions/update-card-order";
import { CameraRecorder2 } from "@/components/media/camera-recorder2";

interface TestContainerProps {
  data: ListWithCards[];
  boardId: string;
}

// generic reorder list func
function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const TestContainer = ({ data, boardId }: TestContainerProps) => {
  //   const [orderedData, setOrderedData] = useState(data);

  //   const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
  //     onSuccess: () => {
  //       toast.success("List reordered");
  //     },
  //     onError: (error) => {
  //       toast.error(error);
  //     },
  //   });

  //   const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
  //     onSuccess: () => {
  //       toast.success("Card reordered");
  //     },
  //     onError: (error) => {
  //       toast.error(error);
  //     },
  //   });

  //   useEffect(() => {
  //     setOrderedData(data);
  //   }, [data]);

  //   useEffect(() => {
  //     setOrderedData(data);
  //   }, [data]);

  return (
    <>
      {/* <CameraRecorder2 /> */}
      <ol
        // ref={provided.innerRef}
        className="flex gap-x-3 h-full"
      >
        {data.map((list, index) => {
          return <TestListItem key={list.id} index={index} data={list} />;
        })}

        <div className="flex-shrink-0 w-1" />
      </ol>
    </>
  );
};
