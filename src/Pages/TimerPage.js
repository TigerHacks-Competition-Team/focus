import React, { useEffect, useState } from "react";
import colors from "../Constants/colors";
import NavBar from "../Components/NavBar";
import { Card, Flex, View, Heading, Button } from "@aws-amplify/ui-react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Demo from "../Demo.js";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import useSound from "use-sound";
import alarm from "../alarm.mp3";

/*const timeRotation = [
  { state: "focus", time: 1500 },
  { state: "break", time: 300 },
  { state: "focus", time: 1500 },
  { state: "break", time: 300 },
  { state: "focus", time: 1500 },
  { state: "break", time: 300 },
  { state: "focus", time: 1500 },
  { state: "break", time: 900 },
];*/
const timeRotation = [
  { state: "focus", time: 15 },
  { state: "break", time: 3 },
  { state: "focus", time: 15 },
  { state: "break", time: 3 },
  { state: "focus", time: 15 },
  { state: "break", time: 3 },
  { state: "focus", time: 15 },
  { state: "break", time: 9 },
];

const calcFocusedPercent = (focusSwitchTimes) => {
  let totalTime = 0;
  let focusedTime = 0;

  focusSwitchTimes.forEach((focusSwitch, idx) => {
    if (idx !== 0) {
      let switchTime = focusSwitch.time;

      let prevSwitch = focusSwitchTimes[idx - 1];
      let prevSwitchTime = prevSwitch.time;
      let prevSwitchState = prevSwitch.focus;
      let dt = switchTime - prevSwitchTime;

      if (prevSwitchState === "focused") {
        focusedTime += dt;
        totalTime += dt;
      } else if (prevSwitchState === "unfocused") {
        totalTime += dt;
      }
    }
  });

  return { focusedTime, totalTime };
};

const TimerPage = () => {
  const [playing, setPlaying] = useState(false);
  const [timerIdx, setTimerIdx] = useState(0);
  const [time, setTime] = useState(timeRotation[timerIdx].time);
  const [remaining, setRemaining] = useState(timeRotation[timerIdx].time);
  const [reset, setReset] = useState(0);
  const [focused, setFocused] = useState(true);
  const [focusSwitchTimes, setFocusSwitchTimes] = useState([]);
  const [started, setStarted] = useState(false);
  const [focusedTime, setFocusedTime] = useState([]);

  const [play] = useSound(alarm);

  function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
  }

  useEffect(() => {
    if (started) {
      if (!playing) {
        setFocusSwitchTimes((prev) => {
          return [...prev, { time: new Date().getTime(), focus: "pause" }];
        });
      } else {
        setFocusSwitchTimes((prev) => {
          return [
            ...prev,
            {
              time: new Date().getTime(),
              focus: focused ? "focused" : "unfocused",
            },
          ];
        });
      }
    }
  }, [playing]);

  useEffect(() => {
    if (started) {
      if (timeRotation[timerIdx].state === "break") {
        setFocusSwitchTimes((prev) => {
          return [...prev, { time: new Date().getTime(), focus: "break" }];
        });
      } else {
        setFocusSwitchTimes((prev) => {
          return [
            ...prev,
            {
              time: new Date().getTime(),
              focus: focused ? "focused" : "unfocused",
            },
          ];
        });
      }
    }
  }, [timerIdx]);

  useEffect(() => {
    document.title = `${
      timeRotation[timerIdx].state.charAt(0).toUpperCase() +
      timeRotation[timerIdx].state.slice(1)
    } ${Math.floor(remaining / 60)}:${str_pad_left(remaining % 60, "0", 2)}`;
  }, [remaining]);

  const displayFocusTime = () => {
    let ft = calcFocusedPercent([
      ...focusSwitchTimes,
      { time: new Date().getTime(), focus: "end" },
    ]);
    let percentFocused = Math.floor((ft.focusedTime / ft.totalTime) * 100);
    let precentUnfocused = 100 - percentFocused;
    setFocusedTime([
      { name: `Focused ${percentFocused}%`, val: percentFocused },
      { name: `Unfocused ${precentUnfocused}%`, val: precentUnfocused },
    ]);
  };

  return (
    <View
      style={{
        ...styles.parent,
        backgroundColor: focused ? "#7389AE" : "#FF6961",
      }}
    >
      <NavBar />
      <Demo
        focusChange={(focused) => {
          setFocused(focused);
          if (playing && timeRotation[timerIdx].state === "focus") {
            setFocusSwitchTimes((prev) => {
              return [
                ...prev,
                {
                  time: new Date().getTime(),
                  focus: focused ? "focused" : "unfocused",
                },
              ];
            });
          }
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "86%",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            paddingTop: "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Heading
            level={1}
            style={{
              fontFamily: "inter",
              color: "white",
              fontSize: "70px",
              marginBottom: "32px",
              textTransform: "capitalize",
            }}
          >
            {timeRotation[timerIdx].state}
          </Heading>
          {focusedTime.length > 0 && !started ? (
            <div
              style={{
                padding: "16px",
                backgroundColor: "#fff",
                borderRadius: "16px",
              }}
            >
              <BarChart width={730} height={250} data={focusedTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="val" fill="#8884d8" />
              </BarChart>
            </div>
          ) : (
            <CountdownCircleTimer
              key={reset}
              isPlaying={playing}
              duration={time}
              trailColor="transparent"
              size={400}
              strokeWidth={20}
              colors={[["#fff", 1]]}
              onComplete={() => {
                play();
                setTimerIdx((prev) => {
                  const newIdx = (prev + 1) % timeRotation.length;
                  setTime(timeRotation[newIdx].time);
                  setRemaining(timeRotation[newIdx].time);
                  setReset((prev) => prev + 1);
                  return newIdx;
                });
              }}
            >
              {({ remainingTime }) => {
                setRemaining(remainingTime);
                return (
                  <p
                    style={{
                      fontSize: 40,
                      fontWeight: "bold",
                      padding: 30,
                      textAlign: "center",
                    }}
                  >
                    {Math.floor(remainingTime / 60)}:
                    {str_pad_left(remainingTime % 60, "0", 2)}
                    <br></br>
                    <p
                      style={{
                        fontSize: 30,
                        fontWeight: "normal",
                        textAlign: "center",
                      }}
                    >
                      Next up{" "}
                      {timeRotation[(timerIdx + 1) % timeRotation.length].state}{" "}
                      for{" "}
                      {Math.floor(
                        timeRotation[(timerIdx + 1) % timeRotation.length]
                          .time / 60
                      )}{" "}
                      minutes.
                    </p>
                  </p>
                );
              }}
            </CountdownCircleTimer>
          )}
          <div
            style={{
              marginTop: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              style={styles.button}
              onClick={() => {
                if (!started) {
                  setFocusSwitchTimes([]);
                }
                setStarted(true);
                setPlaying((prev) => !prev);
              }}
            >
              {playing ? "Pause" : "Start"}
            </Button>
            {started && (
              <Button
                style={styles.button}
                onClick={() => {
                  setTimerIdx(0);
                  setStarted(false);
                  setPlaying(false);
                  setReset((prev) => prev + 1);
                  setRemaining(0);
                  setFocusSwitchTimes((prev) => {
                    return [
                      ...prev,
                      { time: new Date().getTime(), focus: "reset" },
                    ];
                  });
                  displayFocusTime();
                }}
              >
                End
              </Button>
            )}
            {!playing && remaining < time && started && (
              <Button
                style={styles.button}
                onClick={() => {
                  setTime(time);
                  setRemaining(time);
                  setReset((prev) => prev + 1);
                }}
              >
                Reset
              </Button>
            )}
          </div>
        </div>

        {timeRotation[timerIdx].state === "break" && (
          <iframe
            title="2048 game"
            id="iframe1"
            src="https://www.mathsisfun.com/games/a/2048/index.html"
            scrolling="no"
            style={{
              marginTop: "72px",
              maxWidth: "400px",
              height: "600px",
              overflow: "hidden",
              display: "block",
              border: "none",
              padding: "32px",
              borderRadius: "26px",
              backgroundColor: "rgba(255, 255, 255, 1)",
            }}
          ></iframe>
        )}
      </div>
    </View>
  );
};

const styles = {
  button: {
    color: "#7389AE",
    backgroundColor: "#fff",
    outline: "none",
    border: "none",
    borderRadius: "16px",
    padding: "16px 8px",
    marginBottom: "16px",
    "font-size": "36px",
    "font-family": "Inter",
    "font-weight": "bold",
    width: "400px",
  },
  parent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0px",
    width: "100%",
    minHeight: "100vh",
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

export default TimerPage;
