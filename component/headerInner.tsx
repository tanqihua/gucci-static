import React, { useEffect } from 'react'
import { Box, Image, Heading } from '@chakra-ui/react';
import Next from "./svgs/next";
import Back from "./svgs/back";
import { dataEng, dataChi } from "./database";
import { useModal } from "./context";
type Props = {

}

const Header = (props: Props) => {
    const { windowDimensions, language, currentAudio, setCurrentAudio } = useModal();
    const [typeData, setTypeData] = React.useState(dataEng);

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
            <Heading
                textAlign={"center"}
                color={"black"}
                marginTop={windowDimensions.height * 0.05}
                as="h3"
                fontSize={"1.4em"}
            >ARCHETYPES</Heading>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                width={"85%"}
                margin={"auto"}
                alignItems={"center"}
                marginTop={"15px"}
            >
                <Box
                    onClick={() => {
                        // @ts-ignore
                        window.setPreloadFlag.toggle();
                        // @ts-ignore
                        setCurrentAudio(null);
                    }}
                >
                    <Back />
                </Box>
                <Box>
                    <Image
                        width={windowDimensions.width * 0.25}
                        maxWidth={"120px"}
                        src="/img/guccilogo.png"
                    />
                </Box>
                <Box
                    onClick={() => {
                        // @ts-ignore
                        window.setTrigger1(true);
                        setCurrentAudio(typeData["intro"])
                    }}
                >
                    <Next />
                </Box>
            </Box>
        </Box >

    )
}

export default Header;

