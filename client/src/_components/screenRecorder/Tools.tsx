import React, { useState, useEffect, useCallback, use } from 'react';
import { BsFillRecordCircleFill } from "react-icons/bs";
import { FaMicrophoneAlt, FaMicrophoneAltSlash, FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { startMediaRecorder, stopMediaRecording, toggleMic, togglePauseMediaRecorder } from '../utils/recorder';

interface ToolsProps {
    mediaRecorder: MediaRecorder | null;
    recordingChunks: Blob[];
    stream: MediaStream | null;
    setMediaRecorder: React.Dispatch<React.SetStateAction<MediaRecorder | null>>;
    setRecordingChunks: React.Dispatch<React.SetStateAction<Blob[]>>;
    setAudioMuted: React.Dispatch<React.SetStateAction<boolean>>;
    audioMuted: boolean;
    isRecording: boolean;
    setDownloadUrl: React.Dispatch<React.SetStateAction<string>>;
    setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Tools({
    stream,
    setMediaRecorder,
    isRecording,
    setIsRecording,
    mediaRecorder,
    recordingChunks,
    setRecordingChunks,
    setAudioMuted,
    audioMuted,
    setDownloadUrl,
}: ToolsProps) {
    const [time, setTime] = useState<number>(0);
    const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

    // Format time 
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Start timer
    const startTimer = () => {
        if (!timerInterval) {
            const interval = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
            setTimerInterval(interval);
        }
    }

    const pauseTimer = useCallback(() => {
        if (timerInterval) {
            clearInterval(timerInterval);
            setTimerInterval(null);
        }
    }, [timerInterval]);

    const resetTimer = useCallback(() => {
        pauseTimer();
        setTime(0);
    }, [pauseTimer]);

    useEffect(() => {
        if (!isRecording) pauseTimer();
    }, [isRecording, pauseTimer]);

    useEffect(() => {
        if (!stream) {
            if (mediaRecorder) {
                const downloadUrl = stopMediaRecording(mediaRecorder, setMediaRecorder, recordingChunks);
                setDownloadUrl(downloadUrl);
            }
        }
    }, [mediaRecorder, recordingChunks, resetTimer, setDownloadUrl, setIsRecording, setMediaRecorder, stream]);


    return (
        <div className='flex gap-4 text-4xl items-center flex-wrap justify-center'>

            {/* Start and Stop */}
            {!mediaRecorder ? (
                <div
                    onClick={() => {
                        if (!stream) return;
                        startMediaRecorder(stream, setMediaRecorder, setRecordingChunks);
                        startTimer();
                    }}
                    className='bg-gradient-to-r from-pink-600  to-indigo-600 text-sm text-white font-semibold cursor-pointer hover:bg-gradient-to-r hover:from-pink-500 hover:to-indigo-600 flex flex-row-reverse pl-3 items-center gap-2 overflow-clip rounded-full'>

                    <BsFillRecordCircleFill
                        title='Start Recording'

                        className='text-red-500 bg-white text-4xl hover:text-red-600 rounded-full cursor-pointer'
                    />
                    Start Recording
                </div>
            ) : (
                <div className='pr-3 flex text-sm bg-slate-200 items-center gap-2 overflow-clip rounded-full'>
                    <button
                        title='Stop Recording'
                        onClick={() => {
                            if (!mediaRecorder) return;
                            const downloadUrl = stopMediaRecording(mediaRecorder, setMediaRecorder, recordingChunks);
                            setDownloadUrl(downloadUrl);
                            resetTimer();
                        }}
                        className='bg-red-600 hover:bg-red-700 font-semibold text-white px-4 py-2 rounded-full'
                    >
                        Stop Recording
                    </button>
                    <span className='font-semibold'>{formatTime(time)}</span>
                </div>
            )}

            {/* Mute and Unmute */}
            {!audioMuted ? (
                <FaMicrophoneAlt
                    title='Mute Audio'
                    onClick={() => {
                        if (!stream) return;
                        toggleMic(stream, setAudioMuted);
                    }}
                    className='text-green-500 cursor-pointer'
                />
            ) : (
                <FaMicrophoneAltSlash
                    title='Unmute Audio'
                    onClick={() => {
                        if (!stream) return;
                        toggleMic(stream, setAudioMuted);
                    }}
                    className='text-red-500 cursor-pointer'
                />
            )}

            {/* Pause and Resume */}
            {isRecording ? (
                <FaPauseCircle
                    onClick={() => {
                        if (!mediaRecorder) return;
                        togglePauseMediaRecorder(mediaRecorder, setIsRecording);
                        pauseTimer();
                    }}
                    title='Pause Recording'
                    className={`${!mediaRecorder ? 'cursor-not-allowed opacity-50' : ''} cursor-pointer text-green-600`}
                />
            ) : (
                <FaPlayCircle
                    title='Resume Recording'
                    onClick={() => {
                        if (!mediaRecorder) return;
                        togglePauseMediaRecorder(mediaRecorder, setIsRecording);
                        startTimer();
                    }}
                    className='text-red-500 cursor-pointer'
                />
            )}
        </div>
    );
}
