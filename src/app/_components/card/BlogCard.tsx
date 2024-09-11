
'use client'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import DeleteModal from '../modal/DeleteModal';

interface BlogCardProps {
  image: string;
  title: string;
  description: string;
  date: string;
  author: string;
  onClick: () => void;
}
const BlogCard: React.FC<BlogCardProps> = ({ image, title, description, date, author, onClick }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    handleCloseModal();
  };


  return (
    <>
      <Box
        sx={{
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: "8px",
          minWidth: "300px",
          m: "0 auto",

        }}

      >
        <Card>
          <CardMedia
            component="img"
            height="250"
            image={image}
            alt={title}
            sx={{ borderBottom: '1px solid #ddd', cursor: "pointer" }}
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
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" px={2} pb={2}>
              <Typography variant="body2" color="text.secondary">
                {author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {date}
              </Typography>
              <Box>
                <IconButton color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" color="error" onClick={handleOpenModal}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Box>

      <DeleteModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default BlogCard;
