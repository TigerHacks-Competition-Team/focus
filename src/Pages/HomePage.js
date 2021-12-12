import React from "react";
import colors from "../Constants/colors";
import NavBar from "../Components/NavBar";
import { Card, Flex, View } from "@aws-amplify/ui-react";

const HomePage = () => {
  return (
    <View style={styles.parent}>
      <NavBar />
      <Flex style={styles.main} direction="row" >
        <View style={styles.col}>
          <Card style={styles.cardMain}>
            <View style={styles.cardContent}>
              <h2>The Idea</h2>
              <p>With so much school work being computerized today, it is easy to get distracted and very difficult to get work done. Our site helps users stay focused, by automatically giving timed breaks and rewarding sticking to the schedule. Try it out!</p>
            </View>
          </Card>
        </View>
        <View style={{width: "16px"}}/>
        <View style={styles.col}>
        <Card style={styles.cardMain}>
            <View style={styles.cardContent}>
              <h2>How it Works</h2>
              <p>The site used WebGazer.JS to detect where the user is looking, then analyzes this data to rate the focus of the user over time and determine if they’re staying on task.</p>
            </View>
          </Card>
        </View>
      </Flex>
    </View>
  );
};

const styles = {
  parent: {
    display: "flex",
    "flexDirection": "column",
    "alignItems": "center",
    padding: "0px",

    position: "relative",
    width: "100%",
    height: "1080px",

    background: "#7389AE",
  },
  main: {
    margin: "10vw 0px",
    width: "80vw",
    height: "100px",
    display: "flex",
    flexDirection: "row"
  },
  col: {
    width: "50%"
  },
  cardMain: {
    height: "200px",
    background: "#fff",
    marginTop: "16px",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  cardContent: {

  }
};

export default HomePage;
