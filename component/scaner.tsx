import React, { } from "react";

import { useModal } from "./context";

const Scanner = (props: any) => {

    const { windowDimensions } = useModal();
    // useEffect(() => {
    //     html5QrCode = new Html5Qrcode("reader");

    //     // @ts-ignore
    //     window.handleClickAdvanced = handleClickAdvanced;
    //     // @ts-ignore
    //     window.handleStop = handleStop;
    // }, []);

    // const handleClickAdvanced = () => {
    //     const qrCodeSuccessCallback = (decodedText: any, decodedResult: any) => {
    //         window.location.href = (decodedText);
    //         handleStop();
    //     };
    //     html5QrCode.start(
    //         { facingMode: "environment" },
    //         { fps: 10, qrbox: { width: 400, height: 400 } },
    //         qrCodeSuccessCallback
    //     );
    // };

    // const handleStop = () => {
    //     try {
    //         html5QrCode
    //             .stop()
    //             .then((res: any) => {
    //                 html5QrCode.clear();
    //             })
    //             .catch((err: any) => {
    //                 console.log(err.message);
    //             });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    return (
        <div style={{ width: windowDimensions.width * 0.8, height: windowDimensions.width * 0.8, maxWidth: 400, maxHeight: 400 }}>
            <div id="reader" style={{ width: "100%", height: "100%" }} />
        </div>
    );
};
export default Scanner;
