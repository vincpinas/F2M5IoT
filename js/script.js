import * as vard from './var-dump.js';

// Load in all the models before starting to detect faces.
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models')
]).then(vard.startVideo)

// Detect all faces on the screen every 2 seconds and make some calls if it detects a face.
video.addEventListener('play', () => {
  setInterval(async () => {  
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks()

    // if a face is detected
    if(detections.length > 0) {
      if(vard.appstate.onscreen.length < 1) {
        vard.appstate.onscreen.push(true)
      // if there is a face detected create a timer.
      } else if (vard.appstate.onscreen[0] === true && vard.appstate.timers.length < 1) {
        const startTime = Date.now();
        vard.appstate.timers.push(startTime)
      
        setInterval(() => {
          const millis = Date.now() - startTime;
          console.log(millis)

          // If the person is infront of the pc after time allowed display a message
          if(Math.floor(millis / 1000) == (10 * 1)) {
            const text = document.createElement('h3')
            text.innerHTML = 'Please get away from the screen and go on a quick walk.';
            document.body.appendChild(text);
            vard.appstate.cycle.push(true);
          }
        }, 1000);
      }
    // Reload the page if the time in-front of the computer has passed a certain length and the person has walked away from the screen
    } else if(vard.appstate.cycle[0] === true && detections.length < 1) {
      location.reload();
    }
  }, 1000)
})
