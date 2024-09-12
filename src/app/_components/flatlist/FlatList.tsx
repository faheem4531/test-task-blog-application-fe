import React from "react";

import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThreeDots } from "react-loader-spinner";

interface FlatListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  loadMore: () => void;
  hasMore: boolean;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  errorMessage?: React.ReactNode; // New error message prop
  keyExtractor: (item: T) => string | number;
  loading: boolean;
  error?: boolean; // New prop to indicate if there is an error
}

const FlatList = <T,>({
  data,
  renderItem,
  loadMore,
  hasMore,
  loader,
  endMessage,
  emptyMessage,
  errorMessage,
  keyExtractor,
  loading,
  error, // New error prop
}: FlatListProps<T>) => {
  return (
    <InfiniteScroll
      dataLength={data.length}
      next={loadMore}
      hasMore={hasMore && !error} // Do not load more if there is an error
      loader={
        !error ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            {loader || (
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#29343b"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
          </Box>
        ) : null
      }
      endMessage={
        !error && data.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              textAlign: "center",
              padding: "20px",
            }}
          >
            {endMessage || <Typography>No more items to load.</Typography>}
          </Box>
        ) : null
      }
      style={{ overflow: "hidden" }}
    >
      <Box sx={{ m: "0 auto 100px", width: "100%" }}>
        {loading && data.length === 0 ? (
          <Box></Box>
        ) : error ? (
          <Box sx={{ textAlign: "center", padding: "20px" }}>
            {errorMessage || <Typography>Error loading data.</Typography>}
          </Box>
        ) : data.length === 0 ? (
          <Box sx={{ textAlign: "center", padding: "20px" }}>
            {emptyMessage}
          </Box>
        ) : (
          <Grid container spacing={8}>
            {data.map((item) => (
              <Grid size={{ xs: 12, sm: 12 }} key={keyExtractor(item)}>
                {renderItem(item)}
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </InfiniteScroll>
  );
};

export default FlatList;
