import {
  Drawer,
  Text,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { deleteInternDetails } from "../utility/service/BatchIntern.service";
import {  useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import AddBatchInternForm from "./AddBatchInternForm";
import { useBatchIntern } from "../hooks/useBatchIntern";
import useSearch from "../../../../../shared/hooks/useSearch";
import InternshipContext from "../../../../../shared/store/Context";
import { AccordionUI } from "../../../../../shared/common-components/AccordionUI";
import { groupedData } from "../../../utility/groupedData";
import useFilterData from "../../../../../shared/hooks/useFilterData";
import NoRecordsFound from "../../../../../shared/common-components/NoRecordsFound";

// eslint-disable-next-line react/prop-types
const BatchInternList = ({ openDrawer, closeDrawer }) => {
  let { batchId } = useParams();

  const [internList, setInternList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [opened, { open, close }] = useDisclosure(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editFormId, setEditFormId] = useState();
  const [batchInternData, setReload] = useBatchIntern(batchId);
  const { searchTerm ,selectedDomains} = useContext(InternshipContext);
  let title = editFormId ? "Update Intern Details" : "Add Intern Details";
  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  useEffect(() => {
    //  Merge firstName and lastName into fullName for searching
    const modifiedData = internList.map((item) => ({
      ...item,
      fullName: `${item.firstName} ${item.lastName}`, // Concatenate firstName and lastName
    }));
    // Define the keys for searching
    const searchKeys = ["fullName", "email", "domain", "contact"];
    // Use the useSearch hook with the modified data and searchKeys
    const filteredInterns = useSearch(modifiedData, searchTerm, searchKeys);
    setInternList(filteredInterns);
  }, [searchTerm]);

  useEffect(() => {
    setInternList(batchInternData);
  }, [batchInternData]);

  //** set Drawer for open/close  */
  useEffect(() => {
    setDrawerOpen(openDrawer);
  }, [openDrawer]);

  /** Remove the intern data  */
  const removeItem = (id) => {
    deleteInternDetails(id).then((res) => {
      if (res) {
        setReload({});
      }
    });
  };
  useEffect(() => {
    const filteredData = useFilterData(internList, selectedDomains);
    setInternList(filteredData);
  }, [selectedDomains]);
  // Group interns by domain
  const groupedInterns = groupedData(internList);

  //** set editId for updated state  */
  const editId = (id) => {
    setDrawerOpen(true);
    setEditFormId(id);
  };

  //** Drawer close for and field value */
  const setDrawerClose = () => {
    setDrawerOpen(false);
    setEditFormId(null);
    closeDrawer(false);
  };

  return (
    <>
      {internList.length == 0 ? (
        <NoRecordsFound></NoRecordsFound>
      ) : (
        <AccordionUI
          data={groupedInterns}
          toggleDrawer={drawerOpen}
          tabValue="interns"
          removeItem={removeItem}
          openDrawer={toggleDrawer}
          editId={editId}
        ></AccordionUI>
      )}
      <Drawer
        className="form-drawer"
        opened={drawerOpen}
        position="right"
        title={title}
        onClose={() => setDrawerClose()}
        overlayProps={{ backgroundOpacity: 0.6, blur: 5 }}
        size={500}
        styles={{ title: { fontSize: '20px' , fontWeight:"bold"},content:{borderRadius:"8px 0 0 8px"} }}
        transitionProps={{
          transition: "scale",
          duration: 250,
          timingFunction: "ease",
          transformOrigin: "center center",
        }}
      >
        <AddBatchInternForm
          editFormId={editFormId}
          setReload={setReload}
          closeDrawer={() => setDrawerClose()}
        />
      </Drawer>
    </>
  );
};
export default BatchInternList;
