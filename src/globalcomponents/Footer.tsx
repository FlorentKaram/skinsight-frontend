import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Toolbar
      style={{
        backgroundColor: "#a5d8ff",
        position: "absolute",
        padding: "1.5em  ",
        bottom: 0,
        width: "100%",
        marginTop: 2,
        maxHeight: "100px",
      }}
    >
      <Typography variant="body1" color="black" ml={10}>
        © 2024 Skinsight. All rights reserved.
      </Typography>
      <Typography
        variant="body2"
        color="black"
        style={{ marginLeft: "auto" }}
        mr={10}
      >
        Contact: skinsight@ynov.com
      </Typography>
    </Toolbar>
  );
};

export default Footer;
