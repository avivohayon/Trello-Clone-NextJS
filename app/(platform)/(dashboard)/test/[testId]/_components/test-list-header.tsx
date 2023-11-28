"use client";

import { List } from "@prisma/client";

interface TestListHeaderProps {
  testTitle: string;
}

export const TestListHeader = ({ testTitle }: TestListHeaderProps) => {
  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start- gap-x-2">
      <div className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
        {testTitle}
      </div>
    </div>
  );
};
