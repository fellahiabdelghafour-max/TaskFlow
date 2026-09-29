import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import OutlinedFlagOutlinedIcon from "@mui/icons-material/OutlinedFlagOutlined";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useTodos } from "../../../../context/todos";

const ITEM_HEIGHT = 48;

export default function LongMenu({
  status,
  overDue,
  id,
}: {
  status: "Pending" | "In_Progress" | "Completed";
  overDue: boolean;
  id: string;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const tasksContext = useTodos();
  if (!tasksContext) return null;

  const { changeStatus } = tasksContext;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: "20ch",
            },
          },
          list: {
            "aria-labelledby": "long-button",
          },
        }}
      >
        <MenuItem
        onClick={()=>{changeStatus(id);handleClose()}}
          className="disabled"
          sx={{ display: status === "Pending" && !overDue ? "flex" : "none" }}
        >
          <RotateLeftOutlinedIcon /> In progress
        </MenuItem>
        <MenuItem
        onClick={()=>{changeStatus(id);handleClose()}}
          className="disabled"
          sx={{
            display: status === "In_Progress" && !overDue ? "flex" : "none",
          }}
        >
          <AddTaskOutlinedIcon /> Make as completed
        </MenuItem>
        <MenuItem onClick={handleClose} className="disabled">
          <EditOutlinedIcon /> Edite task
        </MenuItem>
        <MenuItem onClick={handleClose} className="disabled">
          <OutlinedFlagOutlinedIcon /> Change priority
        </MenuItem>{" "}
        <MenuItem onClick={handleClose} sx={{ color: "error.main" }}>
          <DeleteForeverOutlinedIcon sx={{ filter: "none" }} /> Delte
        </MenuItem>
      </Menu>
    </div>
  );
}
