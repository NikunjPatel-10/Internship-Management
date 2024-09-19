import {
  Avatar,
  Box,
  Flex,
  Group,
  Paper,
  Title,
  Text,
  Card,
  Button,
  UnstyledButton,
  Tooltip,
  Divider,
} from "@mantine/core";
import React from "react";
import { DropdownMenu } from "../../pages/InternshipBatchDetails/components/BatchMentor/components/DropDownMenu";
import { IconMail, IconPhone } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const CardUI = ({ data, toggleDrawer, mentorData }) => {
  return (
    <Card md="sm" withBorder key={data.id} radius={8}>
      <Card.Section withBorder>
        <Flex justify="space-between" align="center" p={16}>
          <Group justify="flex-start" gap={12}>
            <Avatar size={40} variant="light" color="#005ba9" radius="sm">
              {data.mentor
                .split(" ")
                .map((name) => name.charAt(0).toUpperCase())
                .join("")}
            </Avatar>
            <Box>
              <Title order={6}>
                {data.mentor} {data.domainOwner && "(Owner)"}
              </Title>
              <Text size="sm">{data.designation}</Text>
            </Box>
          </Group>
          {/* Dropdown menu to perform edit/delete */}
          <DropdownMenu
            id={data.id}
            toggleDrawer={toggleDrawer}
            getMentorsData={mentorData}
          />
        </Flex>
      </Card.Section>
      <Card.Section>
        <Group justify="space-evenly" align="center" px={12}>
          <Tooltip label={data.phone}>
            <a title={data.phone} href={`tel:${data.phone}`}>
              <Button
                leftSection={<IconPhone size={16} />}
                c="#868e96"
                fs={10}
                py={8}
                my={4}
                variant="transparent"
              >
                Phone
              </Button>
            </a>
          </Tooltip>
          <Divider orientation="vertical" />
          <Tooltip label={data.email}>
            <a title={data.email} href={`tel:${data.email}`}>
              <Button
                leftSection={<IconMail size={16} />}
                c="#868e96"
                fs={10}
                my={4}
                py={8}
                variant="transparent"
              >
                Email
              </Button>
            </a>
          </Tooltip>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default CardUI;
