
import React from 'react'
import { chakra, Heading, Box, shouldForwardProp, Center, useBoolean, Image, transition } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
import { useModal } from './context';

const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})
const handerTransfrom = {
    "open": {
        opacity: 0,
        transition: {
            duration: 1,
        }
    },
    "closed": {

    }
}

type Props = {
    toggle?: boolean
}

const Preload = (props: Props) => {
    // motion with chakra
    const [preloadFlag, setPreloadFlag] = useBoolean(false);
    const { windowDimensions, setLanguage } = useModal();

    const [allLoaded, setAllLoaded] = React.useState(false);
    const [trigger, setTrigger] = React.useState(props.toggle);
    React.useEffect(() => {
        // @ts-ignore
        window.setPreloadFlag = setPreloadFlag;

        if (props.toggle) {
            let language = localStorage.getItem("language");
            if (language) {
                setLanguage(language);
            }
            else {
                setLanguage("eng");
            }
            setTimeout(() => {
                setTrigger(false);
            }, 2000)


            setPreloadFlag.on()
        }
    }, [])

    if (allLoaded) {

    }
    return (
        <ChakraBox
            backgroundColor={"rgb(228, 151, 166)"}
            position="absolute"
            top={0}
            height={windowDimensions.height}
            width="100%"
            variants={handerTransfrom}
            animate={preloadFlag ? "open" : "closed"}
            pointerEvents={preloadFlag ? "none" : "auto"}
            zIndex={1000}
            display={trigger ? "none" : "block"}
        >
            <Center
                height={windowDimensions.height * 0.55}
                display={"flex"}
                flexDirection="column"
            >
                <Heading
                    as="h3"
                    textAlign={"center"}
                    color={"black"}
                    fontSize={"1.6em"}
                    marginTop={windowDimensions.height * 0.05}
                    marginBottom={windowDimensions.height * 0.03}
                >ARCHETYPES
                </Heading>
                <Box
                    width={"85vw"}
                    maxWidth={"300px"}
                    position="relative"
                    className='checkload'
                >
                    <Image src="/gif/preloader-nostars.9308bf1.gif" width="100%" height="100%" />
                    {
                        [...Array(19)].map(() => {
                            let delta: number = Math.round((Math.random() * 2));

                            let ramdomsRotate = [
                                [0, -360, 0, -30, 0, 30, 0],
                                [20, -180, 0, 360, 30, 0, 20],
                                [-40, 120, 10, 30, 0, -30, -40]
                            ]
                            let randomsScale = [
                                [1, 1, 0.8, 1.2, 1, 0.9, 1],
                                [0.7, 1, 1.2, 1.2, 0.7, 1.2, 0.7],
                                [0.8, 1.1, 0.7, 1.2, 1, 1.2, 0.8]
                            ]

                            return (
                                <ChakraBox
                                    className="star"
                                    key={Math.random()}
                                    position={"absolute"}
                                    animate={
                                        {
                                            rotate: ramdomsRotate[delta],
                                            scale: randomsScale[delta],
                                            transition: {
                                                duration: 8,
                                                repeat: Infinity,
                                            }
                                        }
                                    }
                                >
                                    <Star />
                                </ChakraBox>
                            )
                        })
                    }
                </Box>
            </Center>
            <Center
                height={windowDimensions.height * 0.45}
                alignItems="flex-start"
            >
                <Box
                    textAlign={"center"}
                >
                    <Heading
                        fontSize={"1rem"}
                        color={"black"}
                    >
                        Gucci Garden
                        <br />
                        Archetypes
                    </Heading>
                    <Box height={windowDimensions.height * 0.07} />
                    <Heading
                        fontSize={"1rem"}
                        color={"black"}
                        onClick={() => {
                            setLanguage("eng");
                            localStorage.setItem("language", "eng");
                            setPreloadFlag.toggle()
                        }}
                    >English</Heading>
                    <Box height={windowDimensions.height * 0.03} />
                    <Heading
                        fontSize={"1rem"}
                        color={"black"}
                        onClick={() => {
                            // @ts-ignore
                            setLanguage("chi");
                            localStorage.setItem("language", "chi");
                            setPreloadFlag.toggle()
                        }}
                    >中文</Heading>
                </Box>
            </Center>
        </ChakraBox>
    )
}


const Star = () => {
    return (
        <svg data-v-13611082="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="starinner"
        >
            <path data-v-13611082=""
                d="M14.675 19.97c.123-.46-.482-.499-.505-.874-.022-.375-.336-.582-.71-.56-.376.023-.169-.29-.253-.436-.084-.146.062-.23-.022-.376-.084-.145-.544-.268-.337-.582l-.336-.582c-.313-.207-.71-.56-1.293-.223-.582.336-.812.274-1.271.151-.46-.123-.375.023-.437.252l-.582.336c-.23-.061-.46-.123-.52.107-.062.23-.46-.123-.437.252l-.146.084-.75.045-.728.42c-.352.398-.605-.039-.834-.1l-.168-.291c.145-.084.29-.169.375-.023l.291-.168.039-.605.291-.168c-.252-.436.269-.543.246-.918-.022-.375.498-.482.621-.941l.706-.795.307-1.148c-.084-.146-.168-.291-.313-.207-.146.084-.796-.705-1.193-1.058-.398-.353 0 0-.084-.146-.084-.145-.191-.666-.65-.789-.46-.123-.314-.207-.398-.353-.084-.145-.65-.789-1.338-.973-.69-.185-.168-.291-.19-.667-.023-.375-.107-.52.29-.168l1.165-.672.459.123c.123-.46.23.062.375-.022l.145-.084c.169.29.23.061.46.123l.29-.168c.314.207.751-.046.92.246l.458.123.728-.42.683-1.171c.061-.23-.314-.207-.252-.437l.582-.336c.061-.23-.023-.375.29-.168l.124-.459.33-.773.414-.627c.314.207.75-.045 1.064.162.314.207.084.146-.061.23a.168.168 0 00-.062.23c.605.038.107.52.42.727.314.207.482.498.359.957-.123.46.459.123.336.582-.123.46.46.123.252.437-.207.314-.039.605.482.498.52-.106-.062.23.022.375.084.146.398.353.42.728.023.375.314.207.69.185l.251.436c.462.162.955.21 1.44.14l.604.039c.834.1 1.691.576 2.503.301l.543.269c.084.146-.123.46-.039.605.084.145-.145.084-.29.168-.146.084-.27.543-.729.42-.459-.123-.268.543-.727.42-.46-.123-.123.46-.583.336l-.436.252c-.375.023-.582.337-.706.796l-1.164.672c-.414.627-.33.773-.201 1.668l-.269.544a.673.673 0 01.107.52l-.224 1.294c-.061.23.398.352.046.75-.353.398-.062.23-.124.46.16.403.212.84.152 1.27l-.146.084c-.375.023-.604-.039-.772-.33z"
                fill="#000"></path>
            <path data-v-13611082=""
                d="M17.971 15.931c-.313-.207.185-.689-.42-.728l.146-.084.33-.772c.52-.107.957-.359 1.21.078.251.436.397.352.42.727a.504.504 0 01-.185.69l-.291.167c-.185.689-.79.65-1.21-.078zM9.562 18.846l.874-.505c-.062.23.459.123.397.353-.061.23.466 1.478-.055 1.585l-1.042.213a1.345 1.345 0 01-.71-.56l.1-.834.436-.252zM3.054 13.288l.583-.337.123-.459c.145-.084.268-.543.52-.106l.146-.084c.689.184.918.246.88.85-.04.605.022.376-.27.544l-.727.42-.46-.123c-.022-.375-.542-.269-.397-.353.146-.084-.168-.29-.398-.352zM15.617 6.811l.145-.084c.062-.23-.022-.375.123-.46l.56-.71c.168.29.605.038.857.475l.168.291a1.68 1.68 0 01-.162 1.064l-.75.045c-.382-.078-.72-.3-.941-.621zM8.276 6.197c-.353.398-.689-.184-1.064-.162-.375.023-.358-.957-.297-1.187l1.019-.588.711.56-.039.605c.107.52.13.895-.33.772z"
                fill="#000"></path>
        </svg>
    )
}

export default Preload;