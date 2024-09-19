import { Accordion, SimpleGrid, Text, Title } from "@mantine/core";
import CardUI from "./CardUI";
import InternCard from "./InternCard";
import RoadmapCard from "./RoadmapCard";

export function AccordionUI({
  data,
  tabValue,
  toggleDrawer,
  removeItem,
  editId,
  getData,
}) {
  console.log(Object.keys(data)[0]);
  //   Accordion for displaying intern details
  const items = Object.entries(data).map(([domain, items]) => (
    <Accordion.Item className="domains-accordion" style={{borderBottom:"none",content:{paddingTop:"1rem"}}} key={domain} value={domain}>
      <Accordion.Control style={{flexDirection:"row"}} disabled={data.length === 0}>
        <Title ml={10} order={6}>
          {domain} ({items.length})
        </Title>
      </Accordion.Control>
      <Accordion.Panel>
        {items.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3, xl: 4 }}>
            {items.map(
              (item) =>
                tabValue === "interns" ? (
                  <InternCard
                    key={item.id}
                    intern={item}
                    toggleDrawer={toggleDrawer}
                    removeItem={removeItem}
                    editId={editId}
                  />
                ) : tabValue === "mentors" ? (
                  <CardUI
                    key={item.id}
                    data={item}
                    toggleDrawer={toggleDrawer}
                    mentorData={getData}
                  />
                ) : (
                  <RoadmapCard key={item.id} data={item} openDrawer={toggleDrawer} roadmapData={getData} />
                  // <CardUI key={item.id} data={item} />
                ) // Render null for any other case
            )}
          </SimpleGrid>
        ) : (
          <Text>No Records Found</Text>
        )}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return <Accordion defaultValue={Object.keys(data)[0]}>{items}</Accordion>;
}
