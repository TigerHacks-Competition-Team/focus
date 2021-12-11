import React from "react";
import colors from "../Constants/colors";
import NavBar from "../Components/NavBar";

const HomePage = () => {
  return (
    <div style={styles.parent}>
      <NavBar />
    </div>
  );
};

const styles = {
  parent: {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    padding: "0px",

    position: "relative",
    width: "100%",
    height: "1080px",

    background: "#7389AE",
  },
};

export default HomePage;
