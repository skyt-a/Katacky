import { Ticket as TicketType } from "@prisma/client";
import { format } from "date-fns";
import { cn } from "~/lib/ui/utils";

type TicketProps = {
  to?: string;
  title?: string;
  message?: string;
  backgroundColor?: string;
  from?: string;
  expiredDate?: Date;
  className?: string;
};

export const Ticket = ({
  to,
  title,
  message,
  backgroundColor = "#ffffff",
  from,
  expiredDate,
  className,
}: TicketProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center border-gray-700 box-border",
        className
      )}
    >
      <div
        className="bg-white text-[darkslategray] rounded-lg animate-bouncingCard w-full"
        style={{
          backgroundColor,
          color: getTextColorFromBackgroundColor(backgroundColor),
        }}
      >
        <div className="font-semibold font-poppins text-lg px-4 py-3 border-t-[1px] border-x-[1px] rounded-t-lg">
          {title}
          <div className="text-xs font-medium text-right">
            {expiredDate && `expired: ${format(expiredDate, "yyyy年MM月dd日")}`}
          </div>
        </div>
        <hr className="w-full border-[#efefef] mx-auto" />
        <div className="font-poppins text-base px-4 py-2  border-x-[1px]">
          <div className="font-medium break-all	">to: {to}</div>
          <div className="text-sm break-all">{message}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="bg-secondary w-3 h-6 rounded-r-md  border-y-[1px] border-r-[1px]"></div>
          <div className="w-full border-t-[2px] border-secondary border-dashed"></div>
          <div className="bg-secondary w-3 h-6 rounded-l-md border-y-[1px] border-l-[1px]"></div>
        </div>
        <div className="flex justify-between font-poppins text-sm px-4 py-3 border-x-[1px] border-b-[1px] rounded-b-lg">
          <div className="mr-6">from: {from}</div>
        </div>
      </div>
    </div>
    // <div className="flex flex-col">
    //   <div
    //     className="bg-white relative drop-shadow-2xl p-4 m-4"
    //     style={{
    //       backgroundColor,
    //       color: getTextColorFromBackgroundColor(backgroundColor),
    //     }}
    //   >
    //     <div className="flex-none sm:flex">
    //       <div className="flex-auto justify-evenly">
    //         <div className="flex items-center justify-between">
    //           <div className="flex items-center  my-1">
    //             <h2 className="font-bold">{title}</h2>
    //           </div>
    //         </div>
    //         <div className="border-b-2 my-5"></div>
    //         <div className="">
    //           <div className="w-full flex-none text-lg leading-none">{to}</div>
    //         </div>
    //         <div
    //           className="border-b border-dashed my-5 pt-5 w-[calc(100%_+_2rem)] relative -left-4"
    //           style={{
    //             borderColor: getTextColorFromBackgroundColor(backgroundColor),
    //           }}
    //         ></div>
    //         <div className="pt-1 ">
    //           <div className="mt-2 text-sm">{message}</div>
    //           <div className="mt-2 text-xs text-right">from: {from}</div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

/**
 * 背景色に対して視認性のいいテキストカラーを取得する
 * 単純に言えば明るい色には黒、暗い色には白を返す
 *
 * @param hex 対象のHEXカラーコード
 * @returns 対象のHEXカラーコードに対するテキストカラー
 */
const getTextColorFromBackgroundColor = (hex: string) => {
  if (!hex.startsWith("#")) {
    throw new Error("hex must start with #");
  }
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};
