import { updateBatchMentor } from "../services/BatchMentor.service";

// helper function to update domain owner value to false
export function updateDomainOwner(value, batchMentor) {
  //   const batchMentor = useBatchMentor();
  // Filter batchMentor data to find mentors with matching domain
  const mentorsToUpdate = batchMentor.filter(
    (mentor) => mentor.domain === value
  );
  // update domain owner value to false
  const updatedValues = mentorsToUpdate.map((mentor) => {
    updateBatchMentor(mentor.id, { ...mentor, domainOwner: false });
  });
  return updatedValues;
}
