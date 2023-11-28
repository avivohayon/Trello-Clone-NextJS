import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { TestContainer } from "./_components/test-container";
import { TestBoardList } from "../../organization/[organizationId]/_components/test-board-list";
import { CameraRecorder } from "@/components/media/camera-recorder";
interface TestIdPageProps {
  params: {
    boardId: string;
  };
}

const TestIdPage = async ({ params }: TestIdPageProps) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  console.log("hello");
  console.log(`${params.boardId}`);
  console.log("hello2");
  const lists = await db.list.findMany({
    where: {
      boardId: params.boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-4 h-full overflow-x-auto">
      <TestContainer boardId={params.boardId} data={lists} />
    </div>
  );
};

export default TestIdPage;
