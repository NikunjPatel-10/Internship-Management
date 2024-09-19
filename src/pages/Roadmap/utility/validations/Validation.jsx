import * as Yup from "yup";

const emailRegex = /^[a-zA-Z0-9._-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]{2,4}$/;

export const ValidationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  domain: Yup.string().trim().required("Domain is required"),
});
