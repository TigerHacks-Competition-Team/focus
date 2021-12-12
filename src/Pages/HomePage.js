import React from "react";
import colors from "../Constants/colors";
import NavBar from "../Components/NavBar";
import { Card, Flex, View, Heading, Button } from "@aws-amplify/ui-react";

const HomePage = () => {
  return (
    <View style={styles.parent}>
      <NavBar />
      <div
        style={{
          height: "150px",
          paddingTop: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "left",
          width: "86%",
        }}
      >
        <Heading
          level={1}
          style={{
            fontFamily: "inter",
            color: "white",
            fontSize: "70px",
            marginBottom: "0px",
          }}
        >
          Focus Better.
        </Heading>
        <View>
          <Button style={styles.button}>Try it now</Button>
        </View>
      </div>
      <Flex style={styles.main} direction="row">
        <Card style={styles.cardMain}>
          <View style={styles.cardContent}>
            <h2 style={styles.header}>The Idea</h2>
            <p style={styles.text}>
              With so much school work being computerized today, it is easy to
              get distracted and very difficult to get work done. Our site helps
              users stay focused, by automatically giving timed breaks and
              rewarding sticking to the schedule. Try it out!
            </p>
          </View>
        </Card>
        <View style={{ width: "16px" }} />
        <Card style={styles.cardMain}>
          <View style={styles.cardContent}>
            <h2 style={styles.header}>How it Works</h2>
            <p style={styles.text}>
              The site used WebGazer.JS to detect where the user is looking,
              then analyzes this data to rate the focus of the user over time
              and determine if they’re staying on task.
            </p>
          </View>
        </Card>
      </Flex>
      <Flex style={styles.main} direction="row">
        <Card style={styles.cardMain}>
          <View style={styles.cardContent}>
            <h2 style={styles.header}>Taking Breaks</h2>
            <p style={styles.text}>
              Research (todo) has shown that the best way to keep students
              focused on a task is to give them timed breaks, with a game on the
              site helping them to relax during the breaks. Our site will
              automatically choose an optimal timing, or the user can manually
              override it.
            </p>
          </View>
        </Card>
        <View style={{ width: "16px" }} />
        <Card style={styles.cardMain}>
          <View style={styles.cardContent}>
            <h2 style={styles.header}>Track your Progress</h2>
            <p style={styles.text}>
              The site automatically tracks your focus over time, and charts it
              so you can see when you’ve got on task and how it’s changed since
              the start of a session.
            </p>
          </View>
        </Card>
      </Flex>
      <Flex style={styles.main} direction="row">
        <Card style={styles.cardMain}>
          <View style={styles.cardContent}>
            <h2 style={styles.header}>Leaderboard</h2>
            <p style={styles.text}>
              Why would you want to use the app anyways? To get a high score!
              Compete to get the best score on the leaderboard by getting a high
              ‘focus score’ and focusing for longer sessions then see how you
              place on the leaderboard.
            </p>
          </View>
        </Card>
        <View style={{ width: "16px" }} />
        <Card style={styles.cardMain}>
          <View style={styles.cardContent}>
            <h2 style={styles.header}>Why?</h2>
            <p style={styles.text}>
              Although this app is useful for any student who wants to study, it
              can be particularly useful for students with ADD, ADHD, or other
              attention disorders. The timed focus method is also a reccomended
              strategy for these students, so we hope this app will be effective
              for them.
            </p>
          </View>
        </Card>
      </Flex>
    </View>
  );
};

const styles = {
  button: {
    color: "#ffffff",
    background: "none",
    outline: "none",
    border: "none",
    textAlign: "left",
    paddingBottom: "2px",
    margin: 0,
    marginBottom: "30px",
    borderBottom: "4px solid #ffffff",
    "font-size": "36px",
    "font-family": "Inter",
    "font-weight": "bold",
    width: "auto",
  },
  parent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0px",
    width: "100%",
    height: "1341px",
    background: "#7389AE",
  },
  main: {
    margin: "24px 0px",
    height: "312px",
    display: "flex",
    flexDirection: "row",
  },
  cardMain: {
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
    padding: "160px 40px 40px",

    position: "static",
    width: "708px",
    minHeight: "112px",
    left: "0px",
    top: "0px",
    background: "#FFF",
    margin: "0 24px",
  },
  header: {
    "font-family": "Inter",
    "font-style": "normal",
    "font-weight": "bold",
    "font-size": "40px",
    "line-height": "48px",
    color: "#0D1A26",
    padding: 0,
    margin: "16px 0px",
    position: "static",
    width: "708px",
    height: "48px",
    left: "40px",
    top: "148px",
  },
  text: {
    "font-family": "Inter",
    "font-style": "normal",
    "font-weight": "normal",
    "font-size": "16px",
    "line-height": "24px",
    "letter-spacing": "0.01em",
    color: "#304050",
    margin: 0,
    marginBottom: "10px",
    padding: 0,
    position: "static",
    width: "708px",
    height: "72px",
    left: "40px",
    top: "212px",
  },
  cardContent: {},
};

export default HomePage;
