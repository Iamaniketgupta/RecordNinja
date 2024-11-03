"use client";
import React, { useEffect, useRef } from 'react'
import { getScreenStream } from '../utils/recorder';

export default function Player({ stream ,setStream}: { stream: MediaStream | null ,setStream: React.Dispatch<React.SetStateAction<MediaStream | null>>}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        }
    }, [stream]);
    return (
        <>
            {
                stream ?
                    <video ref={videoRef} className='object-contain w-full h-full' autoPlay muted controls={false}>Player</video>
                    : <div className='w-full h-full flex items-center justify-center bg-slate-300'>
                        <div>

                            <p>Video Stream Not Found. Please ensure you have access to camera and microphone.</p>
                            <div 
                            onClick={()=>getScreenStream().then(stream=>setStream(stream))}
                            className='bg-indigo-500 w-fit px-3 py-2 my-4 text-white cursor-pointer rounded mx-auto flex items-center justify-center'>
                                Turn On Stream
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}
