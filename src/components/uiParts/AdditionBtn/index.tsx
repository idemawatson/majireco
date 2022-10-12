import { FC } from "react";
import { Card, CardContent, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { grey } from "@mui/material/colors";

export const AdditionBtn: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: grey[200],
      }}
    >
      <CardContent sx={{ textAlign: "center" }}>
        <IconButton onClick={onClick} sx={{ width: "100%", height: "100%" }}>
          <AddIcon fontSize="large" sx={{ fontWeight: "bold" }} />
        </IconButton>
      </CardContent>
    </Card>
  );
};
