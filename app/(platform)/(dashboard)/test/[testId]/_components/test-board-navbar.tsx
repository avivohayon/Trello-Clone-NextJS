import { Board } from "@prisma/client";

interface TestBoardNavbarProps {
  data: Board;
}

export const TestBoardNavbar = async ({ data }: TestBoardNavbarProps) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
      <div
        //  variant="transparent"
        className="font-bold text-lg h-auto w-auto p-1 px-2"
      >
        {data.title}
      </div>
    </div>
  );
};
