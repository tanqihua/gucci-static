import React, { useEffect } from 'react'
import { Box, shouldForwardProp, chakra, Heading, } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion';
import Menu from "./svgs/menu";
import Close from "./svgs/close";
import { useModal } from "./context";
import { dataEng, dataChi } from "./database";

type Props = {
    popupFlag: boolean;
    setPopupFlag: any;
}
const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

const popupinner = (props: Props) => {
    const { windowDimensions, language, setCurrentAudio } = useModal();
    const [typeData, setTypeData] = React.useState(dataEng);
    const handerTransfrom = {
        "open": {
            bottom: 0,
            transition: {
                type: "linear.easeIn",
            }
        },
        "closed": {
            bottom: -windowDimensions.height * 0.6,
            transition: {
                type: "linear.easeOut",
            }
        }
    }
    useEffect(() => {
        switch (language) {
            case "eng":
                setTypeData(dataEng);
                break;
            case "chi":
                setTypeData(dataChi);
                break;
        }
    }, [language])

    return (
        <Box>
            <Box
                position="absolute"
                top={0}
                left={0}
                width={windowDimensions.width}
                height={windowDimensions.height}
                backgroundColor={props.popupFlag ? "rgba(0,0,0,0.55)" : ""}
                transition="all 0.3 s ease-in-out"
                zIndex={1}
                pointerEvents={"none"}
            />
            <ChakraBox
                position={"absolute"}
                width={"90%"}
                left={"50%"}
                transform={"translateX(-50%)"}
                height={windowDimensions.height * 0.6}
                backgroundColor={"rgb(228, 151, 166)"}
                variants={handerTransfrom}
                animate={props.popupFlag ? "open" : "closed"}
                borderRadius={"20px 20px 0 0"}
                zIndex={100}
            >
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width="90%"
                    margin={"auto"}
                    height={windowDimensions.height * 0.15}
                >
                    <Box width={6}><Menu /></Box>
                    <Heading
                        textAlign={"center"}
                        textTransform={"uppercase"}
                        fontSize={"1em"}
                        as="h3"
                        lineHeight={1.1}
                    >ARCHETYPES<br />PLAYLIST
                    </Heading>
                    <Box
                        width={7}
                        alignSelf={"baseline"}
                        marginTop={"25px"}
                        onClick={() => props.setPopupFlag.toggle()}
                    >
                        <Close width={"1.8rem"} height={"1.8rem"} />
                    </Box>
                </Box>

                <Box
                    overflowY={"scroll"}
                    height={windowDimensions.height * 0.5}
                    width={"90%"}
                    margin={"auto"}
                    paddingBottom={"60px"}
                >
                    {
                        Object.keys(typeData).map((key, index) => {
                            return (
                                <Box
                                    key={index}
                                    display={"flex"}
                                    onClick={() => {
                                        props.setPopupFlag.toggle();
                                        setCurrentAudio(typeData[key])
                                    }}
                                    alignItems={"center"}
                                    height={windowDimensions.height * 0.09}
                                >
                                    <Heading className='detectText' color={"black"} fontWeight={100} fontSize={"0.8rem"} fontFamily={"GucciSans"} as={'h4'} flex={"1 1 40%"}>{typeData[key].room}</Heading>
                                    <Heading className='detectText' color={"black"} fontWeight={100} fontSize={"0.8rem"} fontFamily={"GucciSans"} as={'h4'} flex={"1 1 60%"}>{typeData[key].title}</Heading>
                                </Box>
                            )
                        })
                    }
                </Box>
            </ChakraBox>
        </Box>
    )
}

export default popupinner;