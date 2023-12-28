import Image from "next/image";
import React from "react";

const TokenManagementForm = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      {" "}
      <div className="w-full h-[40px] flex rounded-lg justify-center items-center gap-5 bg-[#0F0F0F] border-[1px] border-[rgba(168, 168, 168, 0.10)]">
        <div className="text-[#FFF] w-full flex items-center justify-center gap-1 text-[24px] shadow-2xlg">
          Token Management Portal
        </div>
      </div>
      <div className="w-full h-[171px] flex flex-col rounded-lg bg-[#0F0F0F] border-[1px] border-[rgba(168, 168, 168, 0.10)] p-3 gap-2 shadow-2xl">
        <p className="text-muted-foreground text-[14px]">
          Use the token management portal to easily control aspects of your
          token ecosystem and the token itself.
        </p>
        <span className="text-[#FAFAFA]">
          Guacamole Token Management Includes:
        </span>
        <p className="text-muted-foreground text-[14px]">
          Update related token metadata
        </p>
        <p className="text-muted-foreground text-[14px]">
          Edit or revoke mint, freeze, and update authority
        </p>
      </div>
      <p className="text-muted-foreground text-[14px]">
        The following SPL token update authorities are associated with this
        account.
      </p>
      <div className="w-full min-h-[60px] p-4 flex justify-between items-center bg-[#0F0F0F] rounded-lg  border-[1px] border-[rgba(168, 168, 168, 0.10)] shadow-2xl">
        <div className="flex justify-center items-center gap-3">
          <Image src={"/images/launch/sol.png"} alt="" height={30} width={30} className="rounded-full" />
          <span className="text-[#FAFAFA]">GUACAMOLE (GUAC)</span>
        </div>
      </div>
    </div>
  );
};

export default TokenManagementForm;
