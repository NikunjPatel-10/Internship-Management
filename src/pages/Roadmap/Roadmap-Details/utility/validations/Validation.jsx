import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
  topicName: Yup.string().trim().required("Topic name is required"),
  subtopic: Yup.string().trim().required("Subtopic is required"),
});
