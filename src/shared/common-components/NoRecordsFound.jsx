import React from "react";
import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export default function NoRecordsFound() {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="red" title="No Records Found" icon={icon}>
      The information you are looking for is yet to be added.
    </Alert>
  );
}
