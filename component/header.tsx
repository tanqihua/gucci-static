import React, { useEffect } from 'react'
import { Box, Image, Heading } from '@chakra-ui/react';
import Next from "./svgs/next";
import Back from "./svgs/back";
import { dataEng, dataChi } from "./database";
import { useModal } from "./context";
type Props = {
    leftFucntion: (e: any) => void;
    rightFunction: () => void;
}

const Header = (props: Props) => {
    const { windowDimensions, language, currentAudio, setCurrentAudio } = useModal();
    const [typeData, setTypeData] = React.useState(dataEng);

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
                as="h3"
                textAlign={"center"}
                color={"black"}
                fontSize={"1.4em"}
                marginTop={windowDimensions.height * 0.05}
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
                        props.leftFucntion(false);
                    }}
                >
                    <Back fill={"black"} />
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
                        nextAudio();
                    }}
                >
                    <Next />
                </Box>
            </Box>
        </Box >

    )
}

export default Header;

