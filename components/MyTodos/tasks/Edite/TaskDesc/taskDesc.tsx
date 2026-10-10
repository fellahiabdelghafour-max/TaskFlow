'use client'
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { useTodos } from "../../../../../context/todos";

export default function UpdateTaskDesc(){

  const todoContext = useTodos();
  if (!todoContext) return;

  const {

    desc,
    setDesc,
  } = todoContext;
  

  return<Stack spacing={1}>
            <Typography
              sx={{
                fontSize: { xs: 11, sm: 13, md: 13 },
                color: "text.secondary",
              }}
            >
              Description
            </Typography>
            <TextField
              value={desc}
              fullWidth
              onChange={(e) => setDesc(e.target.value)}
              multiline
              rows={4}
              aria-multiline={true}
              sx={{ "& .MuiOutlinedInput-root": { minHeight: "150px" } }}
              placeholder="Add a detailed description (optional)"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment
                      position="start"
                      sx={{ alignSelf: "flex-start", mt: 1.5 }}
                    >
                      <DescriptionIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
}