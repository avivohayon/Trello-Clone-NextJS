import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { TestBoardList } from "../_components/test-board-list";
import { Suspense } from "react";

const OrganizationIdPage = async () => {
  return (
    <div className="w-full mb-20">
      <Info isPro={true} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<TestBoardList.Skeleton />}>
          <TestBoardList />
        </Suspense>
      </div>
    </div>
  );
};

export default OrganizationIdPage;
