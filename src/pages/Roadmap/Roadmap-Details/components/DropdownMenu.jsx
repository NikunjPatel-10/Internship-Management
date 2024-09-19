import { Menu, Button, rem, UnstyledButton } from "@mantine/core";
import { IconTrash, IconPencil, IconDotsVertical } from "@tabler/icons-react";
import { deleteRoadMapDetails } from "../utility/service/RoadmapDetails.service";
import { Link, useParams } from "react-router-dom";
import ConfirmDelete from "./../../../../shared/common-components/confirmDelete";
import { useEffect, useState } from "react";
import {
  getRoadmapById,
  updateRoadmap,
} from "../../utility/service/Roadmap.service";
import { subtractDurations } from "../utility/helper/timeConvertion";

export function DropdownMenu({ user, deleteId, onDelete, duration }) {
  const { roadmapId } = useParams();
  const [open, setOpen] = useState(false);
  // const [deleteData, setDeleteData] = useState("");
  const [roadmapData, setRoadmapData] = useState(null);

  useEffect(() => {
    getRoadmapById(roadmapId).then((res) => {
      setRoadmapData(res.data);
    });
  }, []);

  function handleDelete() {
    // Get Total Duration
    let totalDur = roadmapData.totalDuration;
    // Subtract total duration and particular detail duration
    const updatedDuration = subtractDurations(totalDur, duration);
    // Delete Record from List
    deleteRoadMapDetails(user, deleteId).then((res) => {
      setOpen(false);
      onDelete(user.id);
    });
    // Update total duration in roadmap
    updateRoadmap(roadmapId, {
      ...roadmapData,
      totalDuration: updatedDuration,
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
          <Link
            to={"/roadmap-details/" + roadmapId + "/edit-details/" + user.id}
          >
            <Menu.Item
              leftSection={
                <IconPencil style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Edit
            </Menu.Item>
          </Link>
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
