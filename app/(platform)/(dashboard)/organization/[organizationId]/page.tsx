import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { Suspense } from "react";

import { Board } from "./board";
import { Form } from "./form";

// import { Separator } from "@/components/ui/separator";

// import { Info } from "./_components/info";
// import { BoardList } from "./_components/board-list";
// import { checkSubscription } from "@/lib/subscription";

const OrganizationIdPage = async () => {
  // const isPro = await checkSubscription();
  const boards = await db.board.findMany();
  return (
    <div className="flex flex-col space-y-4">
      <Form />
      <div>
        {boards.map((board) => (
          <Board key={board.id} title={board.title} id={board.id} />
        ))}
      </div>
    </div>
  );
};

export default OrganizationIdPage;
