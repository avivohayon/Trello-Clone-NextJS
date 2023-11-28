import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/db";
import { TestBoardNavbar } from "./_components/test-board-navbar";

// export async function generateMetadata({
//   params,
// }: {
//   params: { boardId: string };
// }) {
//   const { orgId } = auth();

//   if (!orgId) {
//     return {
//       title: "Board",
//     };
//   }

//   const board = await db.board.findUnique({
//     where: {
//       id: params.boardId,
//       orgId,
//     },
//   });

//   return {
//     title: board?.title || "Board",
//   };
// }

const TestIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { testId: string };
}) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  console.log("goodbye");
  const board = await db.board.findUnique({
    where: {
      id: params.testId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <TestBoardNavbar data={board} />
      {/* <span>Test Name: {board.title}</span> */}
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default TestIdLayout;
