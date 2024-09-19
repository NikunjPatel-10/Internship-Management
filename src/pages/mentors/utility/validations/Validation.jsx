import * as Yup from "yup";

const emailRegex = /^[a-zA-Z0-9._-]*@[a-zA-Z0-9.-]*\.[a-zA-Z]{2,4}$/;
const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const ValidationSchema = Yup.object().shape({
  firstName: Yup.string().trim().required("FirstName is required").nullable(),
  lastName: Yup.string().trim().required("LastName is required"),
  emailId: Yup.string()
    .trim()
    .matches(emailRegex, "Email is not valid")
    .required("Email is required."),
  domain: Yup.string().required("Domain is required"),
  phone: Yup.string().matches(phoneRegex, "Phone number is not valid"),
  designation: Yup.string().trim().required("Designation is required"),
});
