import React from 'react'
import { BsFillRecordCircleFill } from "react-icons/bs";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaMicrophoneAltSlash } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { startMediaRecorder, stopMediaRecording, toggleMic, togglePauseMediaRecorder } from '../utils/recorder';

interface ToolsProps {
    mediaRecorder: MediaRecorder | null,
    recordingChunks: Blob[],
    stream: MediaStream | null,
    setMediaRecorder: React.Dispatch<React.SetStateAction<MediaRecorder | null>>,
    setRecordingChunks: React.Dispatch<React.SetStateAction<Blob[]>>,
    setAudioMuted: React.Dispatch<React.SetStateAction<boolean>>,
    audioMuted: boolean,
    isRecording: boolean,
    setDownloadUrl:React.Dispatch<React.SetStateAction<string>>
    setIsRecording: React.Dispatch<React.SetStateAction<boolean>>,
}


export default function Tools({ stream, setMediaRecorder,
    isRecording, setIsRecording,
    mediaRecorder,
    recordingChunks,
    setRecordingChunks,
    setAudioMuted,
    audioMuted,
    setDownloadUrl
}: ToolsProps) {
    return (
        <div className='flex gap-4 text-3xl items-center flex-wrap justify-center'>

            {/* Start and Stop */}
            {!mediaRecorder ? <BsFillRecordCircleFill title='Start Recording' onClick={() => {
                if (!stream) return;
                startMediaRecorder(stream, setMediaRecorder, setRecordingChunks);

            }} className='text-red-500 cursor-pointer' />

                : <div className=' pr-3 flex text-sm bg-slate-200 items-center gap-2 overflow-clip rounded-full '>
                    <button title='Stop Recording'
                        onClick={() => {
                            if (!mediaRecorder) return;
                            const downloadUrl = stopMediaRecording(mediaRecorder, setMediaRecorder, recordingChunks);
                            setDownloadUrl(downloadUrl);
                        }}
                        className='bg-red-600 hover:bg-red-700 font-semibold text-white px-4 py-2 rounded-full'>
                        Stop</button>
                    <span className='font-semibold'>0:31</span>
                </div>}

            {/* Mute and Unmute */}
            {
                !audioMuted ? <FaMicrophoneAlt title='Mute Audio'
                    onClick={() => {
                        if (!stream) return;
                        toggleMic(stream, setAudioMuted);
                    }}
                    className='text-green-500 cursor-pointer' />
                    : <FaMicrophoneAltSlash
                        title='Unmute Audio'
                        onClick={() => {
                            if (!stream) return;
                            toggleMic(stream, setAudioMuted);
                        }}
                        className='text-red-500 cursor-pointer' />
            }
            {/* Pause and Resume */}
            {isRecording ? <FaPauseCircle
                onClick={() => {
                    if (!mediaRecorder) return;
                    togglePauseMediaRecorder(mediaRecorder, setIsRecording);
                }}
                title='Pause Recording'
                className='text-green-500 cursor-pointer' />

                : <FaPlayCircle title='Resume Recording'
                    onClick={() => {
                        if (!mediaRecorder) return;
                        togglePauseMediaRecorder(mediaRecorder,setIsRecording);
                    }}
                    className='text-red-500 cursor-pointer' />}

        </div>
    )
}
