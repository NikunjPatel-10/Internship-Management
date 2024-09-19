import React from "react";
import { Paper, Flex, Group, Avatar, Box, Title, Text } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { DropdownMenu } from "../../pages/InternshipBatchDetails/components/BatchInterns/components/DropDownMenu";
const InternCard = ({ intern, toggleDrawer, editId, removeItem }) => {
  let { batchId } = useParams();

  return (
    <Paper p="sm" withBorder key={intern.id}>
      <Flex justify="space-between" align="center">
        <Group justify="flex-start" gap={12}>
          <Avatar size={40} variant="light" color="#005ba9" radius="sm">
            {intern.firstName.charAt(0).toUpperCase() +
              intern.lastName.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Link
              className="text-link"
              to={`/intern-batch/details/${batchId}/profile/${intern.id}`}
            >
              <Title order={6}>
                {intern.firstName} {intern.lastName}
              </Title>
            </Link>
            <Text size="sm">{intern.email}</Text>
          </Box>
        </Group>
        {/* Dropdown menu to perform edit/delete */}
        <DropdownMenu
          removeItem={removeItem}
          id={intern.id}
          openDrawer={toggleDrawer}
          editId={editId}
        />
      </Flex>
    </Paper>
  );
};

export default InternCard;
