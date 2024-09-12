import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Modal Title */}
        <Typography id="confirmation-modal-title" variant="h6" component="h2">
          {title}
        </Typography>

        {/* Modal Description */}
        <Typography id="confirmation-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 6 }}>
          <Button onClick={onClose} sx={{ mr: 2 }}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm} color="error" variant="contained">
            {confirmText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
