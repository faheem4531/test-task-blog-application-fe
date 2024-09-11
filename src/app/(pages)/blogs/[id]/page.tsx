"use client";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, CardMedia, Container, Divider, Typography } from '@mui/material';

// react/next imports
import { useParams } from "next/navigation";

const BelogsDetails = () => {
  const { id } = useParams();

  return (
    <Container maxWidth="md" sx={{
      mt: 9,
      r: "1px solid grey",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -2px rgba(0, 0, 0, .1)",
      bgcolor: "#f3f3f3",
      borderRadius: "8px",
      padding: "15px 10px"
    }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        variant="text"
        sx={{ mb: 2 }}
        onClick={() => window.history.back()}
      >
        Back to Blog List
      </Button>

      {/* Blog Image */}
      <CardMedia
        component="img"
        height="400"
        image="https://zciclyqzxathornwysqe.supabase.co/storage/v1/object/public/blog-images/79bea811-9ea8-4680-afcd-a05374a65e5d/1722956072526_0.jpg"
        alt="Crafting the Perfect First Impression Text Message"
        sx={{ borderRadius: 2, mb: 3 }}
      />

      {/* Blog Meta Data */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Dating Texts
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        May 10, 2024
      </Typography>

      {/* Blog Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Crafting the Perfect First Impression Text Message
      </Typography>

      {/* Author Name */}
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Brian Tam
      </Typography>

      {/* Divider */}
      <Divider sx={{ my: 3 }} />

      {/* Blog Content */}
      <Box>
        <Typography variant="body1" paragraph>
          In today’s fast-paced dating scene, a single misstep in that initial text message can send potential matches running
          for the hills, leaving you stuck in a sea of unrequited swipes and unanswered hellos – but what if you could flip the
          script and make a connection that lasts?
        </Typography>
        <Typography variant="h6" gutterBottom>
          Avoid awkward silence with a timely opener formula
        </Typography>
      </Box>

      {/* Add more content as needed */}
    </Container>
  );
};

export default BelogsDetails;
