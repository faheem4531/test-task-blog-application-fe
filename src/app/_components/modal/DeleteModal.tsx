import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-delete-title"
      aria-describedby="confirm-delete-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}
      >
        <Typography id="confirm-delete-title" variant="h6" component="h2">
          Confirm Deletion
        </Typography>
        <Typography id="confirm-delete-description" sx={{ mt: 2 }}>
          Are you sure you want to delete this blog?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 6 }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button onClick={onConfirm} color="error" variant="contained">
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
