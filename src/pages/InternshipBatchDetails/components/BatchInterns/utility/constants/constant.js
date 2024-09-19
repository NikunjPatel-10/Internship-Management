import * as Yup from "yup";

const phoneRegExp = /([6-9]+[0-9]{10})*/;
const emailRegex = /^[a-zA-Z0-9._-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]{2,4}$/;

export const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("FirstName is required").nullable(),
  lastName: Yup.string().trim().required("LastName is required"),
  domain: Yup.string().trim().required("Domain is required"),
  email: Yup.string()
    .trim()
    .matches(emailRegex, "Email is not valid")
    .required("Email is required."),
  contact: Yup.string()
  .matches(phoneRegExp, "Phone number is not valid")
  .max(10, "The Phone number should be maximum of 10 digits")
  .required("Phone Number is required"),
});
