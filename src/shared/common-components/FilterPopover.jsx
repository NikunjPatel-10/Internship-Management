// FilterPopover.jsx
import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Indicator,
  Popover,
  PopoverTarget,
  Stack,
  Title,
} from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";
import useDomain from "../hooks/useDomain";
import InternshipContext from "../store/Context";

const FilterPopover = ({ onDomainChange }) => {
  const [opened, setOpened] = useState(false);
  const domains = useDomain();
  const { selectedDomains, setSelectedDomains } = useContext(InternshipContext);
  const [tempValue, setTempValue] = useState(selectedDomains);
  const [selectIndicator, setIndicator] = useState(true);
  const handleCheckboxChange = (values) => {
    setTempValue(values);
  };

  const handleApply = () => {
    onDomainChange(tempValue);
    // applyFilters(); // Apply filters in the parent component
    setOpened((o) => !o);
    setIndicator(false);
  };

  const handleCancel = () => {
    setTempValue([]); // Reset to an empty array to remove checked data
    console.log("1", selectedDomains);
    setSelectedDomains();
    console.log("2", selectedDomains);
    setOpened((o) => !o);
    setIndicator(true);
  };

  return (
    <Popover position="bottom-end" opened={opened} onChange={setOpened}>
      <PopoverTarget>
        <Indicator disabled={selectIndicator}>
          <Button
            className="filter-box"
            variant="outline"
            onClick={() => setOpened((o) => !o)}
          >
            <IconFilter size={20} />
          </Button>
        </Indicator>
      </PopoverTarget>
      <Popover.Dropdown w={300} className="popover-dropdown">
        <Box p={16} className="popover-header">
        <Title order={5}>Domains</Title>
        </Box>
        <Divider />
        {/* Content of the popover */}

        <Checkbox.Group value={tempValue} onChange={handleCheckboxChange}>
          <Stack className="checkbox-stack" style={{overflowY:"scroll"}} gap={0} h={260} mb="0">
            {domains &&
              domains.map((domain) => (
                <Checkbox
                  className="filter-checkbox cursorPointer"
                  key={domain.id}
                  fw={500}
                  p={16}
                  label={domain.value}
                  mb={8}
                  value={domain.value}
                />
              ))}
          </Stack>
        </Checkbox.Group>
        <Divider />
        <Flex align={"center"} justify={"flex-end"} p={16} className="popover-footer">
          <Button onClick={handleCancel} mr={8} color="gray" variant="outline">
            Cancel
          </Button>
          <Button onClick={handleApply}>Apply</Button>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

export default FilterPopover;
