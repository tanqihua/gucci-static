
import React, { useEffect } from 'react'
import AudioPlayer from "./player";
import { useBoolean, Box, chakra, shouldForwardProp, Image, Heading } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion';
import { useModal } from "./context";
import Header from "./header";
import Popinner from "./popupinner";
import Scaner from "./scaner";
// @ts-ignore
import Lottie from "lottie-react";
import JsonLoading from "./lf30_editor_owgxnbds.json";
type Props = {}
const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const Popup = (props: Props) => {
    const { currentAudio, windowDimensions, setCurrentAudio } = useModal();
    const [trigger1, setTrigger1] = React.useState(true);
    const [popupFlag, setPopupFlag] = useBoolean(false);
    const [loading, setLoading] = React.useState<boolean>(false);


    const handerTransfrom = {
        "open": {
            top: 0,
            transition: {
                duration: 1,
            }
        },
        "closed": {
            top: windowDimensions.height,
            transition: {
                duration: 1,
            }
        }
    }

    React.useEffect(() => {
        // @ts-ignore
        window.setTrigger1 = setTrigger1;
    }, [])
    return (
        <ChakraBox
            variants={handerTransfrom}
            animate={currentAudio && trigger1 ? "open" : "closed"}
            height={windowDimensions.height}
            position="absolute"
            zIndex={500}
            width="100%"
            backgroundColor={"rgb(228, 151, 166)"}
            display={"flex"}
            flexDirection={"column"}
        >
            <Header leftFucntion={setTrigger1} rightFunction={setCurrentAudio} />
            <Box
                width={windowDimensions.width * 0.6}
                height={windowDimensions.width * 0.6}
                maxWidth={"260px"}
                maxHeight={"260px"}
                margin={"auto"}
                marginTop={windowDimensions.height * 0.03}
            >
                <Box
                    backgroundImage={currentAudio?.cover}
                    backgroundColor={"rgb(228, 151, 166)"}
                    backgroundSize={"cover"}
                    backgroundPosition={"center"}
                    borderRadius={"10%"}
                    width={"100%"}
                    height={"100%"}
                    overflow="hidden"
                >
                    {
                        loading ? <Box
                            display={"flex"}
                            justifyContent="center"
                            height={"100%"}
                            width={"100%"}
                            backgroundColor="rgba(255,255,255,0.4)"
                        ><Lottie style={{ width: "30%" }} animationData={JsonLoading} /></Box> : ""
                    }

                    <Scaner />
                </Box>

                <Box
                    marginTop={windowDimensions.height * 0.03}
                >
                    <Heading
                        as="h4"
                        textAlign={"center"}
                        fontSize={"1rem"}
                        color={"black"}
                    >
                        {currentAudio?.subtitle}
                    </Heading>
                    <Heading
                        as="h4"
                        fontSize={"1rem"}
                        color={"black"}
                        textAlign={"center"}
                    >
                        {currentAudio?.title}
                    </Heading>
                </Box>
            </Box>
            <AudioPlayer setPopupFlag={setPopupFlag} setLoading={setLoading} loading={loading} />
            <Popinner setPopupFlag={setPopupFlag} popupFlag={popupFlag} />
        </ChakraBox >
    )
}

export default Popup;