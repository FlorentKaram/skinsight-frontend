import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ChildProps {
  file: string;
  openModal: boolean;
  handleClose: () => void;
}
function ImageModal({ file, openModal, handleClose }: ChildProps) {
  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box sx={style}>
        <img src={file} width="400em" />
      </Box>
    </Modal>
  );
}

export default ImageModal;
