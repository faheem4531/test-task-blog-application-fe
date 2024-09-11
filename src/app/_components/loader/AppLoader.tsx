import Grid from "@mui/material/Grid2";
import React, { ReactNode } from "react";
import { ThreeDots } from "react-loader-spinner";

interface AppLoaderProps {
  loading: boolean;
  children: ReactNode;
}

const AppLoader: React.FC<AppLoaderProps> = ({ children, loading }) => {
  return (
    <>
      {loading && (
        <Grid
          container
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#b7c0bb"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </Grid>
      )}
      {children}
    </>
  );
};

export default AppLoader;
