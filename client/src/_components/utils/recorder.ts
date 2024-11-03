import React from "react";

/**
 * Requests screen capture media stream.
 * @returns {Promise<MediaStream>} A promise that resolves to the media stream.
 */
export const getScreenStream = async (): Promise<MediaStream> => {
  try {
    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

   
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });

    
    const combinedStream = new MediaStream([
      ...screenStream.getVideoTracks(),
      ...audioStream.getAudioTracks(),
    ]);

    return combinedStream;

  } catch (error) {
    console.error("Error accessing display media:", error);
    throw error;
  }
};

/**
 * Starts recording the media stream using MediaRecorder.
 * @param {MediaStream} stream - The media stream to record.
 * @param {React.Dispatch<React.SetStateAction<MediaRecorder | null>>} setMediaRecorder - State setter for media recorder.
 * @param {React.Dispatch<React.SetStateAction<Blob[]>>} setRecordingChunks - State setter for recording chunks.
 * @returns {void}.
 */
export const startMediaRecorder = (
  stream: MediaStream,
  setMediaRecorder: React.Dispatch<React.SetStateAction<MediaRecorder | null>>,
  setRecordingChunks: React.Dispatch<React.SetStateAction<Blob[]>>
): void => {

  const recorder = new MediaRecorder(stream);
  setRecordingChunks([]);
  console.log("REcor", recorder)
  setMediaRecorder(recorder);
  recorder.ondataavailable = (event: BlobEvent) => {
    setRecordingChunks((prev) => [...prev, event.data]);

  };
  recorder.start(1000);

  console.log("Recording started");
};

/**
 * Stops the recording and triggers download of the recorded video.
 * @param {MediaRecorder} mediaRecorder - The MediaRecorder instance.
 * @param {Blob[]} recordingChunks - Array of recorded Blob chunks.
 * @returns {string} The download URL of the recorded video.
 */
export const stopMediaRecording = (
  mediaRecorder: MediaRecorder,
  setMediaRecorder: React.Dispatch<React.SetStateAction<MediaRecorder | null>>,
  recordingChunks: Blob[]
): string => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    console.log("Recording stopped");
    console.log(recordingChunks);
    if (!recordingChunks.length) return "";

    const recordedBlob = new Blob(recordingChunks, { type: "video/mp4" });
    const downloadUrl = URL.createObjectURL(recordedBlob);
    setMediaRecorder(null);

    return downloadUrl;
  }
  return "";
};

/**
 * Toggles the pause state of the media recorder.
 * @param {MediaRecorder} mediaRecorder - The MediaRecorder instance.
 */
export const togglePauseMediaRecorder = (mediaRecorder: MediaRecorder | null, setIsRecording: React.Dispatch<React.SetStateAction<boolean>>): void => {
  if (mediaRecorder) {
    if (mediaRecorder.state === "recording") {
      mediaRecorder.pause();
      console.log("Recording paused");
      setIsRecording(false);
    } else if (mediaRecorder.state === "paused") {
      mediaRecorder.resume();
      setIsRecording(true);
      console.log("Recording resumed");
    }
  }
};

/**
 * Toggles the audio tracks of the media stream.
 * @param {MediaStream} stream 
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setAudioMuted 
 */

export const toggleMic = (
  stream: MediaStream | null,
  setAudioMuted: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  if (!stream) {
    console.error("No media stream available");
    return;
  }

  const audioTracks = stream.getAudioTracks();
  if (audioTracks.length === 0) {
    console.error("No audio tracks found in the stream");
    return;
  }

  
  const isCurrentlyMuted = !audioTracks[0].enabled;
  audioTracks.forEach((track) => {
    track.enabled = isCurrentlyMuted; 
  });

  setAudioMuted(!isCurrentlyMuted);
  console.log(isCurrentlyMuted ? "Microphone unmuted" : "Microphone muted");
};
