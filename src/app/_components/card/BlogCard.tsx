"use client";
// react/next imports
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// third party imports
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

// local imports
import ConfirmationModal from "../modal/ConfirmationModalProps";

interface BlogCardProps {
  _id: string;
  image: string;
  title: string;
  description: string;
  date: string;
  author: string;
  onClick: () => void;
  onDelete: (id: string) => void;
}
const BlogCard: React.FC<BlogCardProps> = ({
  _id,
  image,
  title,
  description,
  date,
  author,
  onClick,
  onDelete,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(_id);
    handleCloseModal();
  };

  const handleEdit = (id: string) => {
    router.push(`blogs/update/${id}`);
  };

  return (
    <>
      <Box
        sx={{
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          minWidth: "300px",
          m: "0 auto",
        }}
      >
        <Card>
          <CardMedia
            component="img"
            height="400"
            image={image}
            alt={title}
            sx={{ borderBottom: "1px solid #ddd", cursor: "pointer" }}
            onClick={onClick}
          />
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              px={2}
              pb={2}
            >
              <Typography variant="body2" color="text.secondary">
                {author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {date}
              </Typography>
              <Box>
                <IconButton color="primary" onClick={() => handleEdit(_id)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={handleOpenModal}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>

      <ConfirmationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default BlogCard;
