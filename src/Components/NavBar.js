import React from "react";
import colors from "../Constants/colors";
import { IconHourglassDisabled, Heading } from "@aws-amplify/ui-react";

const NavBar = () => {
  return (
    <div style={styles.div}>
      <div style={styles.buttonBox}>
        <IconHourglassDisabled style={{ height: "auto" }} />
        <Heading level={2} style={styles.text}>
          Focus
        </Heading>
      </div>
    </div>
  );
};

const styles = {
  text: {
    "font-style": "normal",
    "font-weight": "600",
    "font-size": "20px",
    "line-height": "24px",
    "text-transform": "capitalize",
    padding: 0,
    margin: 0,
    marginLeft: "6px",
  },
  div: {
    display: "flex",
    "flex-direction": "row",
    "justify-content": "center",
    "align-items": "center",
    padding: "0px 0px",

    position: "absolute",
    width: "100%",
    height: "72px",
    left: "0px",
    top: "0px",
    background: "#FFFFFF",
    "box-shadow": "0px 1px 4px rgba(0, 0, 0, 0.5)",
  },
  buttonBox: {
    display: "flex",
    "flex-direction": "row",
    "justify-content": "center",
    "align-items": "center",
    padding: "0px",

    position: "static",
    width: "105px",
    height: "36px",
    left: "907.5px",
    top: "24px",
  },
};

export default NavBar;
