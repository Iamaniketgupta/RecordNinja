import React from "react";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import fixWebmDuration from "fix-webm-duration";
/**
 * Requests screen capture media stream.
 * @returns {Promise<MediaStream>} A promise that resolves to the media stream.
 */
export const getScreenStream = async (): Promise<MediaStream> => {
  try {
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100,
      },
    });

    const screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });

    // Combine video and audio streams
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
 */
export const startMediaRecorder = (
  stream: MediaStream,
  setMediaRecorder: React.Dispatch<React.SetStateAction<MediaRecorder | null>>,
  setRecordingChunks: React.Dispatch<React.SetStateAction<Blob[]>>,
  setStartTimerDuration: React.Dispatch<React.SetStateAction<number|null>>
): void => {
  const recorder = new MediaRecorder(stream);
  setRecordingChunks([]);
  setMediaRecorder(recorder);
  setStartTimerDuration(Date.now());
  
  recorder.ondataavailable = (event: BlobEvent) => {
    setRecordingChunks((prev) => [...prev, event.data]);
  };
  recorder.start(1000);
};

/**
 * Stops the recording and triggers download of the recorded video.
 * @param {MediaRecorder} mediaRecorder - The MediaRecorder instance.
 * @param {Blob[]} recordingChunks - Array of recorded Blob chunks.
 * @returns {string} The download URL of the recorded video.
 */


export const stopMediaRecording = async (
  mediaRecorder: MediaRecorder,
  setMediaRecorder: React.Dispatch<React.SetStateAction<MediaRecorder | null>>,
  recordingChunks: Blob[],
  startTimerDuration: number|null
): Promise<string> => {
  if (!mediaRecorder || recordingChunks.length === 0) {
    throw new Error("Invalid MediaRecorder or no recording chunks available.");
  }

  mediaRecorder.stop();

  if(startTimerDuration === null) return '';
  const duration = Date.now() - startTimerDuration;
  const recordedBlob = new Blob(recordingChunks, { type: recordingChunks[0].type });

  try {

    return new Promise((resolve, reject) => {
      fixWebmDuration(recordedBlob, duration, (fixedBlob) => {
        if (!fixedBlob) {
          reject(new Error("Failed to fix WebM duration."));
          return;
        }

        const downloadUrl = URL.createObjectURL(fixedBlob);

        setMediaRecorder(null); 
        
        resolve(downloadUrl);
      });
    });
  } catch (error) {
    console.error("Error fixing  duration:", error);
    throw error;
  }
};


/**
 * Toggles the pause state of the media recorder.
 * @param {MediaRecorder} mediaRecorder - The MediaRecorder instance.
 */
export const togglePauseMediaRecorder = (
  mediaRecorder: MediaRecorder | null,
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  if (mediaRecorder) {
    if (mediaRecorder.state === "recording") {
      mediaRecorder.pause();
      setIsRecording(false);
    } else if (mediaRecorder.state === "paused") {
      mediaRecorder.resume();
      setIsRecording(true);
    }
  }
};

/**
 * Toggles the audio tracks of the media stream.
 * @param {MediaStream} stream - The media stream.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setAudioMuted - State setter for audio mute status.
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
};
