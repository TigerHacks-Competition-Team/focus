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
          width: "90%",
          marginLeft: "48px",
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
          <Button
            style={styles.button}
            onClick={() => {
              window.location.href = "/demo";
            }}
          >
            Try it now
          </Button>
        </View>
      </div>
      <Flex style={styles.main} direction="row">
        <Card style={styles.cardMain}>
          <View style={styles.cardContent}>
            <h2 style={styles.header}>The Idea</h2>
            <p style={styles.text}>
              With so much school work being computerized today, it is easy to
              get distracted and very difficult to get work done. Our site helps
              users stay focused by automatically giving timed breaks and
              tracking how focused the user is.{" "}
              <a href="/demo" style={{ color: "#304050" }}>
                Try it out!
              </a>
            </p>
          </View>
        </Card>
        <View style={{ width: "16px" }} />
        <Card style={styles.cardMain}>
          <View style={styles.cardContent}>
            <h2 style={styles.header}>How it Works</h2>
            <p style={styles.text}>
              The site used FaceMesh to track 465 facial features from the
              user's webcame. Using custom algorithms, the site uses this data
              to predict where the user is looking and determine whether they
              are focused on the screen.
            </p>
          </View>
        </Card>
      </Flex>
      <Flex style={styles.main} direction="row">
        <Card style={styles.cardMain}>
          <View style={styles.cardContent}>
            <h2 style={styles.header}>Taking Breaks</h2>
            <p style={styles.text}>
              Research has shown that one of the best way to keep students
              focused on a task is to give them timed breaks. Our site
              automatically times out focus and break sessions, and includes a
              game for the users to play during breaks.
            </p>
          </View>
        </Card>
        <View style={{ width: "16px" }} />
        <Card style={styles.cardMain}>
          <View style={styles.cardContent}>
            <h2 style={styles.header}>Track your Progress</h2>
            <p style={styles.text}>
              After a session is completed, the user can view how focused they
              were throughout the sessions. This data is shows is summarized in
              a chart that lets the user see how they are doing at a glance.
            </p>
          </View>
        </Card>
      </Flex>
      <Flex style={styles.main} direction="row">
        <Card style={styles.cardMain}>
          <View style={styles.cardContent}>
            <h2 style={styles.header}>Demo</h2>
            <p style={styles.text}>
              For our demo, you can see a live sketch of your face, and the
              vectors we find to estimate where you are looking. We also
              decreased the timer by a large factor so you can see how the site
              works without having to wait.
            </p>
          </View>
        </Card>
        <View style={{ width: "16px" }} />
        <Card style={styles.cardMain}>
          <View style={styles.cardContent}>
            <h2 style={styles.header}>Why?</h2>
            <p style={styles.text}>
              We hope this site can be particularly useful for students with
              ADD, ADHD, or other attention disorders. The timed focus method is
              also reccomended strategy for these students, so we hope this app
              can be and effective study tool for them.
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
    background: "#7389AE",
  },
  main: {
    margin: "24px 0px",
    width: "90%",
    "min-height": "312px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardMain: {
    display: "flex",
    flex: 1,
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
    padding: "100px 40px 40px",

    position: "static",
    "min-height": "112px",
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
    "min-height": "48px",
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
    "min-height": "72px",
    left: "40px",
    top: "212px",
  },
  cardContent: {},
};

export default HomePage;
