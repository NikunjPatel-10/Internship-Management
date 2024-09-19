/* eslint-disable react/prop-types */
import { Menu, rem, UnstyledButton } from "@mantine/core";
import { IconTrash, IconPencil, IconDotsVertical } from "@tabler/icons-react";
import ConfirmDelete from "../../../shared/common-components/confirmDelete";
import { useNavigate } from "react-router-dom";
import { deleteInternsBatch } from "../utility/service/InternBatch.service";
import { useState } from "react";

export function DropdownMenu({ id, setRefresh }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  /** delete function */
  function handleDelete(id) {
    if (id) {
      deleteInternsBatch(id).then((res) => {
        if (res) {
          setOpen(false);
          setRefresh({});
        }
      });
    }
  }

  /** Open Delete confirmation box */
  function openPopup() {
    setOpen(true);
  }

  /** change the route for edit */
  function handleEdit(id) {
    navigate(`edit-batch/${id}`);
  }

  return (
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
          onClick={() => handleEdit(id)}
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
          onClick={() => openPopup()}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>

      <ConfirmDelete
        open={open}
        closeDialog={() => setOpen(false)}
        deleteFunction={() => handleDelete(id)}
      />
    </Menu>
  );
}
