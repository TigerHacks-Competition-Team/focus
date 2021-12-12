import React from "react";
import colors from "../Constants/colors";
import { IconHourglassDisabled, Heading, Button } from "@aws-amplify/ui-react";

const NavBar = () => {
  return (
    <div style={styles.div}>
      <Button style={styles.buttonBox} onClick={() => window.location.href='/'}>
        <span class="material-icons">
          hourglass_disabled
        </span>
        <Heading level={2} style={styles.text}>
          Focus
        </Heading>
      </Button>
    </div>
  );
};

const styles = {
  text: {
    "fontStyle": "normal",
    "fontWeight": "600",
    "fontSize": "20px",
    "lineHeight": "24px",
    "textTransform": "capitalize",
    padding: 0,
    margin: 0,
    marginLeft: "6px",
  },
  div: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    width: "100vw",
    left: "0px",
    top: "0px",
    backgroundColor: "#FFffff",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.5)",

  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px 0px",
    backgroundColor: "#ffffff",
    outline: "none",
    border: "none",
    textDecoration: "none"
  },
};

export default NavBar;
