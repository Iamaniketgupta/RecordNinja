"use client";
import Player from '@/_components/screenRecorder/Player'
import Tools from '@/_components/screenRecorder/Tools'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Page() {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [recordingChunks, setRecordingChunks] = useState<Blob[]>([]);
    const [audioMuted, setAudioMuted] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(true)
    const [downloadUrl, setDownloadUrl] = useState<string>("")


    useEffect(() => {
        if (stream) {
            stream.getTracks().forEach((track) => {
                track.onended = () => {
                    console.log("Screen sharing stopped");
                    setStream(null); 
                };
            });
        }
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [stream]);

    return (
        <div className='dark:bg-stone-900 bg-gradient-to-r from-cyan-600 to-blue-500 bg-slate-100 relative h-screen w-screen overflow-clip'>
            <div className='h-full w-full absolute'>
                {/* Topbar */}
                <div className='h-16   p-4  m-4 rounded-xl flex items-center justify-between shadow-3xl'>
                    <Link href="/" className='rounded-full  px-8 bg-gradient-to-r from-indigo-500 to-pink-600 text-white
                    py-2 text-sm font-semibold hover:bg-gradient-to-r hover:to-indigo-500 hover:from-pink-600 hover:text-white '>
                        Home
                    </Link>
                </div>

                {/* Video Area*/}

                {!downloadUrl && <div className='m-5 rounded-xl h-[70%] mx-auto max-w-4xl bg-gradient-to-r from-indigo-500 to-stone-900 overflow-clip p-2 '>
                    <Player setStream={setStream} stream={stream} />
                </div>}

                {/* Download area */}
                {downloadUrl &&
                    <div className='grid grid-cols-4 gap-4 rounded-3xl p-4 m-5'>
                        <div className='w-[80%] col-span-3 my-4 h-auto min-h-fit'>
                            <video src={downloadUrl} controls></video>
                        </div>

                        <div className='w-full min-h-full flex flex-col gap-4 items-center justify-center'>
                            <a href={downloadUrl} download='recording.mp4' 
                            className=' w-full text-center rounded-lg 
                            hover:bg-gradient-to-r hover:to-indigo-500 hover:from-blue-600 px-8 py-3 bg-gradient-to-r from-indigo-700 to-blue-600 hover:bg-indigo-400 text-white text-sm font-semibold'>
                                Download
                            </a>
                            <button onClick={() => {
                                URL.revokeObjectURL(downloadUrl)
                                setDownloadUrl("")
                            }} className='rounded-lg px-8 py-3 w-full bg-red-500 hover:bg-red-700 text-white text-sm font-semibold'>
                                Cancel
                            </button>
                        </div>
                    </div>
                }




                {/* Toolbar */}
                {
                    !downloadUrl && <div className='h-16 bg-white  p-4 dark:bg-stone-800 m-4 rounded-xl max-w-4xl mx-auto text-5xl  shadow-3xl'>
                        <Tools
                            setDownloadUrl={setDownloadUrl}
                            stream={stream} audioMuted={audioMuted}
                            setMediaRecorder={setMediaRecorder}
                            mediaRecorder={mediaRecorder}
                            isRecording={isRecording}
                            setIsRecording={setIsRecording}
                            recordingChunks={recordingChunks}
                            setRecordingChunks={setRecordingChunks}
                            setAudioMuted={setAudioMuted} />
                    </div>
                }

            </div >
        </div >
    )
}
