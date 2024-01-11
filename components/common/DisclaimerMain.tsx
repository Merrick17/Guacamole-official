"use client";
import React, { useEffect, useState } from "react";
import DisclaimerConfirm from "./DisclaimerConfirm";
import DisclaimerDialog from "./DisclaimerDialog";

const DisclaimerMain = () => {
  const [firstStep, setFirstStep] = useState<boolean>(false);
  const [secondStep, setSecondStep] = useState<boolean>(false);
  useEffect(() => {
    const isDisclaimerAccepted = localStorage.getItem("isDisclaimerAccepted");
    if (!isDisclaimerAccepted) {
      setFirstStep(true);
    }
  }, []);
  return (
    <div>
      <DisclaimerDialog
        open={firstStep}
        onOpenChange={setFirstStep}
        handleNextStep={() => {
          setFirstStep(false);
          setSecondStep(true);
        }}
      />
      <DisclaimerConfirm open={secondStep} onOpenChange={setSecondStep} />
    </div>
  );
};

export default DisclaimerMain;
