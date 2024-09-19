import { Menu, Modal, Group, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import ConfirmDelete from "../../../shared/common-components/confirmDelete";
import { useState } from "react";
import { deleteMentorData } from "../utility/services/mentors.service";
function MenuDropdown({id, onDelete}) {
  // for open/close modal forconfirm box to delete data
  const [open, setOpen] = useState(false);

  /**
   * Receive id for deleting mentor details
   * @param {number} id - id of selected mentor
   */
  const deleteMentor = () => {
    deleteMentorData(id).then((res)=>{
      setOpen(false);
      onDelete(id);
    })
  };

  // Opem Delete confirmtion box
  function openPopup() {
    setOpen(true);
  }
  return (
    <>
{/* Start : Dropdown menu for Edit and Delete options */}
      <Menu.Dropdown>
        <Link to={"/edit-mentor/" + id}>
          <Menu.Item icon={<IconEdit size={14} />}>Edit</Menu.Item>
        </Link>

        <Menu.Item
          icon={<IconTrash size={14} />}
          onClick={(e) => openPopup()}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
      {/* End : Dropdown menu for Edit and Delete options */}
      <ConfirmDelete open={open} closeDialog={() => setOpen(false)} deleteFunction={deleteMentor}/>
    </>
  );
}

export default MenuDropdown;