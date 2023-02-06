import { useContext } from "react";
import { PaymentFormContext } from "../context/PaymentFormContext";

type UseStepsFormType = {
    showPanel: boolean;
    nextStep: () => void;
    previousStep: () => void;
}

export const useStepsFormHook = (): UseStepsFormType => {
    const { state: { showPanel }, nextStep, previousStep } = useContext(PaymentFormContext)

    return { showPanel, nextStep, previousStep}
}