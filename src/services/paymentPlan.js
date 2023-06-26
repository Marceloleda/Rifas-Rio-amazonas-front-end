import { createPaymentToPlan } from "@/services/api";

export default function CreatePayments(typePlan){
    if(typePlan === "basic"){
        createPaymentToPlan(typePlan)
    }
    if(typePlan === "premium"){
        createPaymentToPlan(typePlan)
    }
    if(typePlan === "master"){
        createPaymentToPlan(typePlan)
    }
}