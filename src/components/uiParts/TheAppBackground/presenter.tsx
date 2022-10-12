import { ReactNode, FC } from "react";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

const Presenter: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        height: "90vh",
        overflow: "auto",
        bgcolor: grey[200],
      }}
    >
      {children}
    </Box>
  );
};

export default Presenter;
