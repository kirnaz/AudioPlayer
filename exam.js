import WaveSurfer from "https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js";

// Constructor for creating an audio track
const wavesurfer = WaveSurfer.create({
  container: "#waveform",
  waveColor: "#4F4A85",
  progressColor: "#383351",
  url: "./Mesmerize - Kevin MacLeod.mp3",
});

// Current time search function
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secondsRemainder = Math.round(seconds) % 60;
  const paddedSeconds = `0${secondsRemainder}`.slice(-2);
  return `${minutes}:${paddedSeconds}`;
};

// Displays the current time
const timeEl = document.querySelector("#time");
wavesurfer.on(
  "timeupdate",
  (currentTime) => (timeEl.textContent = formatTime(currentTime))
);

// Find the tiles you need on the site and save them for later use.
const playButton = document.querySelector("#play");
const zoomInX5 = document.querySelector("#zoomInX5");
const zoomOutX5 = document.querySelector("#zoomOutX5");
const normal = document.querySelector("#normal");

// Audio decoder
wavesurfer.once("decode", () => {
  document.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    input.onchange = (e) => {
      wavesurfer.setOptions({
        [input.value]: e.target.checked,
      });
    };
  });

  // Button Play/pause
  playButton.onclick = () => {
    wavesurfer.playPause();
  };
  // The button gives the component its normal size.
  normal.onclick = () => {
    wavesurfer.zoom(0);
    document.getElementById("waveform").style.paddingLeft = "";
    document.getElementById("waveform").style.paddingRight = "";
  };
  // Button to increase component size by 5 times
  zoomInX5.onclick = () => {
    wavesurfer.zoom(6);
    document.getElementById("waveform").style.paddingLeft = "";
    document.getElementById("waveform").style.paddingRight = "";
  };
  // The button reduces the size of the component by 5 times.
  zoomOutX5.onclick = () => {
    wavesurfer.zoom(-6);
    document.getElementById("waveform").style.paddingLeft = "200px";
    document.getElementById("waveform").style.paddingRight = "200px";
  };
});
