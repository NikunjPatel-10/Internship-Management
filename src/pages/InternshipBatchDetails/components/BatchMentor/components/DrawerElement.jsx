import { Drawer } from "@mantine/core";
import React from "react";
import AddBatchMentorForm from "./AddBatchMentorForm";
import { useNavigate, useParams } from "react-router";

const DrawerElement = ({ title, drawerOpen, setDrawerOpen, getData }) => {
  const navigate = useNavigate();
  // get param value from URL
  const { batchId } = useParams();

  // close drawer on click of close icon
  function handleCancel() {
    setDrawerOpen(false);
    navigate("/intern-batch/details/" + batchId);
  }
  return (
    // Drawer to open form for adding/updating mentor data
    <Drawer
      className="form-drawer"
      opened={drawerOpen}
      position="right"
      onClose={handleCancel}
      title={title}
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
      {/* Add/Update mentor form component */}
      <AddBatchMentorForm
        closeDrawer={() => setDrawerOpen(false)}
        getMentorData={getData}
      />
    </Drawer>
  );
};

export default DrawerElement;
