import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Box } from "@mui/material";
import { useState } from "react";
import ImageModal from "./ImageModal";
function FileBlock({ file }: { file: string }) {
  const isBase64Image = (base64String: string) => {
    return /^data:image\/[a-z]+;base64,/.test(base64String);
  };

  const getImageNameFromBase64 = (base64String: string): string | null => {
    const matches = base64String.match(/^data:image\/([a-z]+);base64,(.*)$/i);
    if (matches && matches.length === 3) {
      // matches[1] contains the image format (e.g., 'jpeg', 'png', etc.)
      // Extracting image name if available
      const imageName = `Image.${matches[1]}`;
      return imageName;
    }
    return "Document"; // Not a valid image or unable to extract the image name
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <Box display="inline-block">
      {isBase64Image(file) ? (
        <img
          src={file}
          width="100em"
          style={{
            border: "grey 3px solid",
            borderRadius: "5px",
            margin: " 4px ",
            cursor: "pointer",
          }}
          onClick={handleOpen}
        />
      ) : (
        <InsertDriveFileIcon
          color="disabled"
          sx={{
            fontSize: 80,
            border: "grey 3px solid",
            borderRadius: "5px",
            margin: "4px",
            padding: "10px",
          }}
        />
      )}
      <p style={{ textAlign: "center", margin: 0 }}>
        {getImageNameFromBase64(file)}
      </p>
      <ImageModal file={file} handleClose={handleClose} openModal={openModal} />
    </Box>
  );
}

export default FileBlock;
