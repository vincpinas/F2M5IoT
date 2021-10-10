export const video = document.getElementById('video')

export function startVideo() {
    navigator.getUserMedia(
      { video: {} },
      stream => video.srcObject = stream,
      err => console.error(err)
    )
}

export const appstate = {
  onscreen: [],
  cycle: [],
  timers: []
}