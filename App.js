import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
// import Constants from "expo-constants";

import { Focus } from "./src/features/focus/Focus";
import { FocusHistory } from "./src/features/focus/FocusHistory";
import { Timer } from "./src/features/timer/Timer";
import { colors } from "./src/utils/colors";
import { spacing } from "./src/utils/sizes";

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, state) => {
    // {subject: subject, state: state}
    setFocusHistory([...focusHistory, { subject, state }]);
  };
  const onClear = () => {};

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: spacing.md,
    // paddingTop: Platform.OS === "ios" ? spacing.md : spacing.lg,
  },
});
