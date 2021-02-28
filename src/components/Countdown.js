import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import { fontSizes, spacing } from "../utils/sizes";
import { colors } from "../utils/colors";

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 1, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(null);
  const interval = React.useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        // onEnd();   // cause side-effects error: cannot update a component from inside the function body of a different component.
        return time;
      }
      console.log("time", time);
      const timeLeft = time - 1000;
      // onProgress(timeLeft / minutesToMillis(minutes)); // cause side-effects error: cannot update a component from inside the function body of a different component.
      return timeLeft;
    });
  };

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);
  
  useEffect(() => {
    // fix side-effects error: cannot update a component from inside the function body of a different component
    onProgress(millis / minutesToMillis(minutes));
    if (millis === 0) onEnd();
    console.log("Countdown millis", millis);
  }, [millis]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: "rgba(94, 132, 226, 0.3)",
  },
});
