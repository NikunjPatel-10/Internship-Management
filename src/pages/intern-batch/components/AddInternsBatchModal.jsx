import {
  Button,
  TextInput,
  Group,
  Flex,
  rem,
  Breadcrumbs,
  Grid,
  Select,
  Paper,
  Container,
  Title,
} from "@mantine/core";
import { IconCalendar, IconChevronDown } from "@tabler/icons-react";
import { useForm, yupResolver } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  addInternsBatch,
  getByIdInternBatchData,
  updateInternsBatch,
} from "../utility/service/InternBatch.service";
import { ValidationSchema } from "../utility/constants/constant";

export default function BatchForm() {
  let { batchId } = useParams();
  const navigate = useNavigate();

  const icon = (
    <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );
  const form = useForm({
    initialValues: {
      batchname: "",
      startdate: "",
      enddate: "",
      status: "Not-Started",
    },
    validate: yupResolver(ValidationSchema),
  });

  /** Breadcrumbs Details */
  const items = [
    { title: "Internship", href: "#" },
    { title: "InternBatch", href: "/intern-batch" },
    {
      title: batchId ? "Update Intern-Batch Detail" : "Add Intern-Batch Detail",
      href: "#",
    },
  ].map((item, index) => (
    <Link to={item.href} key={index}>
      {item.title}
    </Link>
  ));

  useEffect(() => {
    if (batchId) {
      getByIdInternBatchData(batchId).then((response) => {
        if (response) {
          form.setValues({
            batchname: response.data.batchname,
            startdate: new Date(response.data.startdate),
            enddate: new Date(response.data.enddate),
            status: response.data.status,
          });
        }
      });
    }
  }, [batchId]);

  /** navigate back */
  const handleCancel = () => {
    navigate(`/intern-batch`);
  };

  const handleFormSubmit = (values) => {
    if (batchId) {
      updateInternsBatch(batchId, values).then((response) => {
        if (response) {
          form.reset();
          navigate(`/intern-batch`);
        }
      });
    } else {
      addInternsBatch(values).then((response) => {
        if (response) {
          form.reset();
          navigate(`/intern-batch`);
        }
      });
    }
  };

  return (
    <>
      <Flex direction="column" className="content-wrapper">
        <Paper className="sub-header-paper">
          <Container className="container-fluid">
            <Flex justify="space-between" align="center" className="sub-header">
              <div>
                <Breadcrumbs>{items}</Breadcrumbs>
                <Title order={4} mt={5}> {batchId
                  ? "Update Intern-Batch Detail"
                  : "Add Intern-Batch Detail"}</Title>

              </div>
            </Flex>
          </Container>
        </Paper>
        <Paper className="container-bg">
          <Container className="container-fluid">
            <Grid className="form-wrapper" h={"100%"} display={"flex"} p={16} columns={24}>
              <Grid.Col style={{ height: "100%" }} span={12}>
                <form
                  className="add-form"
                  onSubmit={form.onSubmit((values) => handleFormSubmit(values))}
                >
                  <TextInput
                    withAsterisk
                    label="Batch Name"
                    placeholder="Enter Batch Name"
                    {...form.getInputProps("batchname")}
                  />

                  <DateInput
                    withAsterisk
                    mt="md"
                    rightSection={icon}
                    valueFormat="YYYY MMM DD"
                    label="Start Date"
                    placeholder="Select Start Date"
                    {...form.getInputProps("startdate")}
                  />
                  <DateInput
                    withAsterisk
                    mt="md"
                    rightSection={icon}
                    valueFormat="YYYY MMM DD"
                    label="End Date"
                    placeholder="Select End Date"
                    {...form.getInputProps("enddate")}
                  />
                  <Select
                    mt="md"
                    label="Select Status"
                    placeholder="Pick value"
                    checkIconPosition="right"
                    data={["Not-Started", "In Progress", "Completed"]}
                    maxDropdownHeight={200}
                    defaultValue="Not Started"
                    rightSection={
                      <IconChevronDown
                        style={{ width: rem(16), height: rem(16) }}
                      />
                    }
                    {...form.getInputProps("status")}
                  />

                  <Group justify="flex-end" mt="lg">
                    <Button variant="default" onClick={handleCancel}>
                      Cancle
                    </Button>
                    <Button type="submit">{batchId ? "Update" : "Add"}</Button>
                  </Group>
                </form>
              </Grid.Col>
            </Grid>
          </Container>
        </Paper>
      </Flex>
    </>
  );
}
