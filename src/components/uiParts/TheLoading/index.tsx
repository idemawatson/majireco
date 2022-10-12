import { Box, LinearProgress, styled } from "@mui/material";
import { FC } from "react";

type Props = {
  loading: Boolean;
};

export const TheLoading: FC<Props> = ({ loading }) => {
  const DisabledBackground = styled(Box)({
    width: "100%",
    height: "100%",
    position: "fixed",
    background: "#ccc",
    opacity: 0.5,
    zIndex: 1,
  });

  return (
    <>
      {loading && (
        <>
          <LinearProgress />
          <DisabledBackground />
        </>
      )}
    </>
  );
};
