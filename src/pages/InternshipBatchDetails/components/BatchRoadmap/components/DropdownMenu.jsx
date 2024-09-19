import { Menu, rem, UnstyledButton } from "@mantine/core";
import { IconTrash, IconPencil, IconDotsVertical } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "./../../../../../shared/common-components/confirmDelete";
import { useState } from "react";
import { deleteBatchRoadMap } from "../services/BatchRoadmap.service";

export function DropdownMenu({ id, openDrawer, getData }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleEditClick = () => {
    openDrawer();
    navigate("edit/" + id);
  };
  function handleDelete() {
    // Delete Record from List
    deleteBatchRoadMap(id).then((res) => {
      getData();
      setOpen(false);
    });
  }

  // Opem Delete confirmtion box
  function openPopup() {
    setOpen(true);
  }
  return (
    <>
      <Menu shadow="md" position="bottom-end" width={200}>
        <Menu.Target>
          <UnstyledButton>
            <IconDotsVertical
              style={{ width: rem(18), height: rem(18) }}
            ></IconDotsVertical>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            onClick={(e) => handleEditClick()}
            leftSection={
              <IconPencil style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Edit
          </Menu.Item>
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
      </Menu>
      {/* Confirmation POP-Up to delete Item */}
      <ConfirmDelete
        open={open}
        closeDialog={() => setOpen(false)}
        deleteFunction={handleDelete}
      />
    </>
  );
}
