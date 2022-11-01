import { useModal } from "./context";
import React, { useRef, useEffect, useState } from "react";
import ReactAudioPlayer from 'react-audio-player';
import { useBoolean } from "@chakra-ui/react";
// assets
import Play from "./svgs/play";
import Pause from "./svgs/pause";
import Circleleft from "./svgs/circleleft";
import Circleright from "./svgs/circleright";
import NextLeft from "./svgs/nextleft";
import NextRight from "./svgs/nextright";
import Scan from "./svgs/scan";
import Menu from "./svgs/menu";


import { dataChi, dataEng } from "./database";
import { Box } from "@chakra-ui/react";
type Props = {
    setPopupFlag: any;
    setLoading: (e: boolean) => void;
    loading: boolean
}

const Audioplayer = (props: Props) => {
    const { handleStop, handleClickAdvanced, currentAudio, windowDimensions, language, setCurrentAudio } = useModal();
    const audioRef = useRef<HTMLAudioElement | any>(null);
    const [duration, setDuration] = useState<any>(null);
    const [currentTime, setCurrentTime] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState<any>(true);
    const progressBar = useRef<HTMLDivElement | any>(null);
    const animationRef = useRef<any>();
    const [qrcodeTrigger, setQrcodeTrigger] = useBoolean(true);



    const nextAudio = () => {
        let dataType;
        if (currentAudio) {
            switch (language) {
                case "eng":
                    dataType = dataEng;
                    break;
                case "chi":
                    dataType = dataChi;
                    break;
            }
            let index = ((Object.keys(dataType).indexOf(currentAudio.key)) + 1) % Object.keys(dataType).length;

            setCurrentAudio(dataType[Object.keys(dataType)[index]])
        }
    }

    const prepAudio = () => {
        let dataType;
        if (currentAudio) {
            switch (language) {
                case "eng":
                    dataType = dataEng;
                    break;
                case "chi":
                    dataType = dataChi;
                    break;
            }
            let index = ((Object.keys(dataType).indexOf(currentAudio.key)) - 1) % Object.keys(dataType).length;
            if (index < 0) { index = Object.keys(dataType).length - 1 }

            setCurrentAudio(dataType[Object.keys(dataType)[index]])
        }
    }

    const forwardfifteen = () => {
        progressBar.current.value = Number(parseInt(progressBar.current.value) + 15);
        changeRange();
    }

    const backfifteen = () => {
        progressBar.current.value = Number(progressBar.current.value - 15);
        changeRange();
    }

    const pause = () => {
        setIsPlaying(true);
        audioRef.current.audioEl.current.pause();
    }

    const play = () => {
        setIsPlaying(false);
        audioRef.current.audioEl.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
        cancelAnimationFrame(animationRef.current);
    }

    const whilePlaying = () => {
        try {
            progressBar.current.value = audioRef.current?.audioEl.current.currentTime;
            changePlayerCurrentTime();
            animationRef.current = requestAnimationFrame(whilePlaying);
        }
        catch {

        }
    }

    const calculateTime = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    }

    const changeRange = () => {
        audioRef.current.audioEl.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime();
    }

    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value);
    }

    useEffect(() => {
        if (!audioRef.current.audioEl.current.paused && audioRef.current.audioEl.current.duration) {
            setIsPlaying(false);
        }
        else {
            setIsPlaying(true);
        }
    }, [duration, isPlaying])


    useEffect(() => {
        if (currentAudio?.audio) {
            props.setLoading(true);
            audioRef.current.audioEl.current.onloadedmetadata = (e: any) => {
                console.log('loaded');
                props.setLoading(false);
                setDuration(e.target.duration);
                whilePlaying();
                play();
                setCurrentTime(0);
            }
        }
    }, [currentAudio])

    return (
        <Box
            width={"85%"}
            margin={"auto"}
        >

            <Box className="slider-container">
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    marginBottom={windowDimensions.height * 0.01}
                >
                    <Box
                        width={6}
                        onClick={() => {
                            if (qrcodeTrigger) {
                                setQrcodeTrigger.off();
                                handleClickAdvanced();
                            }
                            else {
                                setQrcodeTrigger.on();
                                handleStop();
                            }
                        }}
                    >
                        <Scan fill={qrcodeTrigger ? "black" : "white"} />
                    </Box>
                    <Box
                        width={6}
                        onClick={() => props.setPopupFlag.toggle()}
                    >
                        <Menu />
                    </Box>
                </Box>
                <input max={duration} type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} />
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                >
                    <h6 style={{ color: "black" }}>{calculateTime(currentTime)}</h6>
                    <h6 style={{ color: "black" }}>{calculateTime(duration)}</h6>
                </Box>
            </Box>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                marginTop={windowDimensions.height * 0.02}
            >
                <Box
                    onClick={() => { prepAudio() }}
                ><NextLeft width={20} /></Box>
                <Box
                    onClick={backfifteen}
                ><Circleright width={20} /></Box>
                <Box
                    style={{ width: "20px", height: "20px" }}
                >
                    {
                        isPlaying ? <Box onClick={play}
                            style={props.loading ? { pointerEvents: "none", color: "gray" } : {}}
                        ><Play width={20} /></Box> : <Box onClick={pause}><Pause width={20} /></Box>
                    }
                </Box>
                <Box
                    onClick={forwardfifteen}
                ><Circleleft width={20} />
                </Box>

                <Box
                    onClick={() => { nextAudio() }}
                ><NextRight width={20} /></Box>

                <ReactAudioPlayer
                    autoPlay={false}
                    controls
                    src={currentAudio?.audio}
                    style={{ display: "none" }}
                    ref={audioRef}
                />
            </Box>
        </Box>
    )
}

export default Audioplayer;