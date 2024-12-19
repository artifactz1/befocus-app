"use client";

import { Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export default function Timer() {
  const [sessions, setSessions] = useState(6);
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  const [currentSession, setCurrentSession] = useState(1);
  const [isWorking, setIsWorking] = useState(true);
  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);

  const reset = useCallback(() => {
    setCurrentSession(1);
    setIsWorking(true);
    setTimeLeft(workDuration);
    setIsRunning(false);
  }, [workDuration]);

  useEffect(() => {
    reset();
  }, [workDuration, breakDuration, sessions, reset]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            if (isWorking && currentSession < sessions) {
              setIsWorking(false);
              return breakDuration;
            } else if (!isWorking) {
              setIsWorking(true);
              setCurrentSession((prev) => prev + 1);
              return workDuration;
            } else {
              setIsRunning(false);
              return 0;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isRunning,
    isWorking,
    currentSession,
    sessions,
    workDuration,
    breakDuration,
  ]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const handleSettingsChange = (key: string, value: number) => {
    switch (key) {
      case "sessions":
        setSessions(value);
        break;
      case "workDuration":
        setWorkDuration(value * 60);
        break;
      case "breakDuration":
        setBreakDuration(value * 60);
        break;
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full p-8">
        <h1 className="text-center text-6xl">Supreme </h1>
        <div className="flex flex-col">
          {/* Focus or Break */}
          <div className="mb-2 text-[20rem] font-extrabold">
            {formatTime(timeLeft)}
          </div>
          <div className="font-regular text-xl">
            {isWorking ? "Work" : "Break"}
          </div>

          {/* Play / Reset  */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={toggleTimer}
              variant="outline"
              size="lg"
              className="h-12 w-32"
            >
              {isRunning ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
            <Button
              onClick={reset}
              variant="outline"
              size="lg"
              className="h-12 w-32"
            >
              <RotateCcw className="h-6 w-6" />
            </Button>
          </div>

          {/* <div className="flex flex-col justify-between">
            <div>
              <h2 className="mb-4 text-2xl font-medium">Settings</h2>
              <Settings
                sessions={sessions}
                workDuration={workDuration / 60}
                breakDuration={breakDuration / 60}
                onSettingsChange={handleSettingsChange}
              />
            </div>
            <div className="text-right">
              <p className="text-xl font-medium">Session</p>
              <p className="text-4xl font-light">
                {currentSession} / {sessions}
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
