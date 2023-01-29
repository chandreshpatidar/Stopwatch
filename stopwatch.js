const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');
const recordButton = document.getElementById('recordButton');
const timerEle = document.getElementById('time');
const recordedTimeListEle = document.getElementById('recordedTimeList');

let hours = 00;
let minutes = 00;
let seconds = 00;
let milliSeconds = 00;
let isTimerRunning = false;
let lastRecordedTime = 0;

function getTimeUnitsInString() {
  let milliSecondsInString = milliSeconds;
  let secondsInString = seconds;
  let minutesInString = minutes;
  let hoursInString = hours;

  if (milliSeconds < 10) {
    milliSecondsInString = `0${milliSeconds}`;
  }

  if (seconds < 10) {
    secondsInString = `0${seconds}`;
  }

  if (minutes < 10) {
    minutesInString = `0${minutes}`;
  }

  if (hours < 10) {
    hoursInString = `0${hours}`;
  }

  return {
    milliSecondsInString,
    secondsInString,
    minutesInString,
    hoursInString,
  };
}

function timer() {
  if (isTimerRunning) {
    milliSeconds++;

    if (milliSeconds == 100) {
      seconds++;
      milliSeconds = 0;
    }

    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }

    if (minutes == 60) {
      hours++;
      minutes = 0;
      seconds = 0;
    }

    const {
      hoursInString,
      minutesInString,
      secondsInString,
      milliSecondsInString,
    } = getTimeUnitsInString();

    timerEle.innerHTML = `${hoursInString} : ${minutesInString} : ${secondsInString} : ${milliSecondsInString}`;

    setTimeout(timer, 10);
  }
}

function onStartButtonClick() {
  isTimerRunning = true;
  startButton.disabled = true;
  timer();
}

function onStopButtonClick() {
  startButton.disabled = false;
  isTimerRunning = false;
}

function onResetButtonClick() {
  startButton.disabled = false;
  isTimerRunning = false;

  hours = 00;
  minutes = 00;
  seconds = 00;
  milliSeconds = 00;

  timerEle.innerHTML = '00 : 00 : 00 : 00';

  recordedTimeListEle.innerHTML = null; // Removing recorded time list
}

function onRecordButtonClick() {
  const list = document.createElement('li');
  const span = document.createElement('span');
  const {
    hoursInString,
    minutesInString,
    secondsInString,
    milliSecondsInString,
  } = getTimeUnitsInString();

  list.innerHTML = `${hoursInString} : ${minutesInString} : ${secondsInString} : ${milliSecondsInString}`;

  let currentTime = Number(
    `${hoursInString}${minutesInString}${secondsInString}${milliSecondsInString}`
  );
  lastRecordedTime = currentTime - lastRecordedTime;
  const lastRecordedTimeStr = String(currentTime);
  const lastRecordedTimeStrLength = lastRecordedTimeStr.length;

  let recordedHours = 0;
  let recordedMinutes = 0;
  let recordedSeconds = 0;
  let recordedMilliSeconds = 0;

  if (lastRecordedTimeStrLength <= 2) {
    recordedHours = '00';
    recordedMinutes = '00';
    recordedSeconds = '00';
    recordedMilliSeconds = lastRecordedTimeStr;
  } else if (lastRecordedTimeStrLength <= 4) {
    recordedHours = '00';
    recordedMinutes = '00';
    recordedSeconds =
      lastRecordedTimeStr.slice(lastRecordedTimeStrLength - 4, 2) ||
      `0${lastRecordedTimeStr.charAt(0)}`;
    recordedMilliSeconds = lastRecordedTimeStr.slice(
      lastRecordedTimeStrLength - 2,
      4
    );
  } else if (lastRecordedTimeStrLength <= 6) {
    recordedHours = '00';
    recordedMinutes =
      lastRecordedTimeStr.slice(lastRecordedTimeStrLength - 6, 2) ||
      `0${lastRecordedTimeStr.charAt(0)}`;
    recordedSeconds = lastRecordedTimeStr.slice(
      lastRecordedTimeStrLength - 4,
      4
    );
    recordedMilliSeconds = lastRecordedTimeStr.slice(
      lastRecordedTimeStrLength - 2,
      6
    );
  } else if (lastRecordedTimeStrLength <= 8) {
    recordedHours =
      lastRecordedTimeStr.slice(lastRecordedTimeStrLength - 8, 2) ||
      `0${lastRecordedTimeStr.charAt(0)}`;
    recordedMinutes = lastRecordedTimeStr.slice(
      lastRecordedTimeStrLength - 6,
      4
    );
    recordedSeconds = lastRecordedTimeStr.slice(
      lastRecordedTimeStrLength - 4,
      6
    );
    recordedMilliSeconds = lastRecordedTimeStr.slice(
      lastRecordedTimeStrLength - 2,
      8
    );
  }

  const timeDifference = `${recordedHours} : ${recordedMinutes} : ${recordedSeconds} : ${recordedMilliSeconds}`;
  span.innerHTML = timeDifference;

  list.appendChild(span);

  recordedTimeListEle.prepend(list);
}

startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);
resetButton.addEventListener('click', onResetButtonClick);
recordButton.addEventListener('click', onRecordButtonClick);
