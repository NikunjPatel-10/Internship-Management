import * as Yup from "yup";


export const ValidationSchema = Yup.object().shape({
    batchname: Yup.string().trim().required("Batch Name is required").nullable(),
    startdate: Yup.string().trim().required("Start Date is required"),
    enddate: Yup.string().trim().required("End Date is required"),
});