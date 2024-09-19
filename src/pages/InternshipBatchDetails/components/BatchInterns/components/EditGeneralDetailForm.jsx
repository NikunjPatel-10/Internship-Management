import {
  Box,
  Button,
  Card,
  Group,
  NativeSelect,
  Select,
  SimpleGrid,
  TextInput,
  rem,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconCalendar, IconChevronDown } from "@tabler/icons-react";

const data = [
  { value: "+91", label: "+91" },
  { value: "+1", label: "+1" },
];

export const EditGeneralDetailForm = ({ closeDrawer }) => {
  const icon = (
    <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  const select = (
    <NativeSelect
      data={data}
      rightSectionWidth={22}
      styles={{
        input: {
          fontWeight: 500,
          borderTopLeftRadius: 3,
          borderBottomLeftRadius: 3,
          marginRight: "4px",
          marginLeft: "-4px"
        },
      }}
    />
  );

  /** navigate back */
  const handleCancel = () => {
    closeDrawer();
  };
  return (
    <form
      style={{
        backgroundColor: "white",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      //   onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
    >
      <Box
        style={{
          overflow: "auto",
          borderBottom: "1px solid rgb(222, 226, 230)",
        }}
        px="16px"
        py="5px"
        mt={"xs"}
        mb={"lg"}
      >
        <Select
          mt="md"
          label="Gender"
          checkIconPosition="right"
          placeholder="Select Gender"
          data={["Male", "Female"]}
          // onClick={() => {
          //   setMentor();
          // }}
          rightSection={
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
          }
          // {...form.getInputProps("domain")}
        />
        <DateInput
          mt="md"
          rightSection={icon}
          valueFormat="YYYY MMM DD"
          label="Birth Date"
          placeholder="Select Birth Date"
          // {...form.getInputProps("enddate")}
        />

        {/* <Select
          mt="md"
          label="Blood Group"
          checkIconPosition="right"
          placeholder="Select Blood Group"
          data={["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]}
          // onClick={() => {
          //   setMentor();
          // }}
          rightSection={
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
          }
          // {...form.getInputProps("domain")}
        /> */}
        <Select
          mt="md"
          label="Marital Status"
          checkIconPosition="right"
          placeholder="Select Marital Status"
          data={["Married", "Un-Married"]}
          // onClick={() => {
          //   setMentor();
          // }}
          rightSection={
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
          }
          // {...form.getInputProps("domain")}
        />
        <Select
          mt="md"
          label="Reporting Office"
          checkIconPosition="right"
          placeholder="Select Office"
          data={["Valsad", "Surat"]}
          // onClick={() => {
          //   setMentor();
          // }}
          rightSection={
            <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
          }
          // {...form.getInputProps("domain")}
        />
        <DateInput
          mt="md"
          rightSection={icon}
          valueFormat="YYYY MMM DD"
          label="Joining  Date"
          placeholder="Select Joining Date"
          // {...form.getInputProps("enddate")}
        />

        <TextInput
          mt={"md"}
          type="number"
          placeholder="e.g 985632147"
          label="Mobile Number"
          leftSection={select}
          maxLength={"10"}
          leftSectionWidth={63}
        />
        <SimpleGrid cols={{ base: 1, sm: 1 }} mt={"lg"} spacing="lg">
          <Card withBorder radius="md">
            <Card.Section p={"md"}>
              <Box fw={"bold"} ff={"Inter, sans-serif"}>
                Residential Address
              </Box>
            </Card.Section>
            <SimpleGrid cols={1}>
              <TextInput
                label="Address"
                placeholder="Enter Address"
                // {...form.getInputProps("batchname")}
              />
            </SimpleGrid>
            <SimpleGrid cols={2} mt="lg">
              <Select
                label="Country"
                checkIconPosition="right"
                placeholder="Select Country"
                data={["India", "USA"]}
                // onClick={() => {
                //   setMentor();
                // }}
                rightSection={
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
                // {...form.getInputProps("domain")}
              />
              <Select
                label="State"
                checkIconPosition="right"
                placeholder="Select State"
                data={["Gujrat", "California"]}
                // onClick={() => {
                //   setMentor();
                // }}
                rightSection={
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
                // {...form.getInputProps("domain")}
              />
            </SimpleGrid>
            <SimpleGrid cols={2} mt="lg">
              <Select
                label="City"
                checkIconPosition="right"
                placeholder="Select City"
                data={["Valsad", "New Jersey"]}
                // onClick={() => {
                //   setMentor();
                // }}
                rightSection={
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
                // {...form.getInputProps("domain")}
              />
              <Select
                label="PinCode"
                checkIconPosition="right"
                placeholder="Select PinCode"
                data={["396001", "482200"]}
                // onClick={() => {
                //   setMentor();
                // }}
                rightSection={
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
                // {...form.getInputProps("domain")}
              />
            </SimpleGrid>
          </Card>
        </SimpleGrid>
      </Box>
      <Group justify="flex-end" mb="lg" px="md">
        <Button variant="default" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </Group>
    </form>
  );
};
