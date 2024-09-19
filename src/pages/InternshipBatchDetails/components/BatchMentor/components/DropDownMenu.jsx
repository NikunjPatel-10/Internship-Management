import { Menu, rem, UnstyledButton } from "@mantine/core";
import { IconTrash, IconPencil, IconDotsVertical } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "./../../../../../shared/common-components/confirmDelete";
import { useState } from "react";
import { deleteBatchMentor } from "../utility/services/BatchMentor.service";

export function DropdownMenu({ id, toggleDrawer, getMentorsData }) {
  const navigate = useNavigate();
  // manage confirm box
  const [open, setOpen] = useState(false);

  // On click of edit button open drawer and perform navigation
  const handleEditClick = () => {
    toggleDrawer();
    navigate("edit/" + id);
  };

  // delete mentor details from list
  function handleDelete() {
    // Delete Record from List
    deleteBatchMentor(id).then((response) => {
      if (response) {
        setOpen(false);
        getMentorsData();
      }
    });
  }

  // Open Delete confirmtion box
  function openPopup() {
    setOpen(true);
  }
  return (
    <>
      {/* Start: Dropdown menu for edit/delete mentor details */}
      <Menu shadow="md" position="bottom-end" width={200}>
        {/* Start: Target button to open dropdown menu */}
        <Menu.Target>
          <UnstyledButton>
            <IconDotsVertical
              style={{ width: rem(18), height: rem(18) }}
            ></IconDotsVertical>
          </UnstyledButton>
        </Menu.Target>
        {/* End: Target button to open dropdown menu */}

        {/* Start: Listing menu options */}
        <Menu.Dropdown>
          {/* Option for edit */}
          <Menu.Item
            onClick={(e) => handleEditClick()}
            leftSection={
              <IconPencil style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Edit
          </Menu.Item>

          {/* Option for delete */}
          <Menu.Item
            color="red"
            leftSection={
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={(e) => openPopup()}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
        {/* End: Listing menu options */}
      </Menu>
      {/* End: Dropdown menu for edit/delete mentor details */}
      {/* Confirmation POP-Up to delete Item */}
      <ConfirmDelete
        open={open}
        closeDialog={() => setOpen(false)}
        deleteFunction={handleDelete}
      />
    </>
  );
}
