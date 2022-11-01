import React, { createContext, useContext } from 'react';

interface AppContextInterface {
    windowDimensions: any;
    language: string;
    setLanguage: (language: string) => void;
    setCurrentAudio: (audio: any) => void;
    currentAudio: any | null;
    handleClickAdvanced: () => void;
    handleStop: () => void;
}
interface IAudioInfo {
    audio: {
        cover: string,
        title: string,
        artist: string,
        audio: string,
        subtitle: string,
    }
}
import { Html5Qrcode } from "html5-qrcode";

let html5QrCode: any;

const ModalContext = createContext<AppContextInterface | null>(
    null
);


export function ContextProvider({ children }: { children: React.ReactNode }) {
    const [windowDimensions, setWindowDimensions] = React.useState({
        width: 0,
        height: 0
    });

    const [language, setLanguage] = React.useState("eng");

    const [currentAudio, setCurrentAudio] = React.useState<IAudioInfo>();


    const handleClickAdvanced = () => {
        const qrCodeSuccessCallback = (decodedText: any, decodedResult: any) => {
            window.location.href = (decodedText);
            handleStop();
        };
        html5QrCode.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: 400, height: 400 } },
            qrCodeSuccessCallback
        );
    };

    const handleStop = () => {
        try {
            html5QrCode
                .stop()
                .then((res: any) => {
                    html5QrCode.clear();
                })
                .catch((err: any) => {
                    console.log(err.message);
                });
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        function handleResize() {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        handleResize();
        window.addEventListener('resize', handleResize);
    }, []);

    React.useEffect(() => {
        html5QrCode = new Html5Qrcode("reader");
    }, []);

    return (
        <ModalContext.Provider value={{
            windowDimensions,
            setLanguage,
            language,
            currentAudio,
            setCurrentAudio,
            handleClickAdvanced,
            handleStop
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext<AppContextInterface | any>(ModalContext);
