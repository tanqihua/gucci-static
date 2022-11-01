
import React, { useEffect } from 'react'
import { dataEng, dataChi } from "./database";
import { Box, Heading, Text } from '@chakra-ui/react'
import { useModal } from './context';
import Popup from "./popup";
import HeaderInner from "./headerInner";
type Props = {
    play?: string
}

const Innerpage = (props: Props) => {
    const { language, setCurrentAudio, windowDimensions, currentAudio } = useModal();
    const [typeData, setTypeData] = React.useState(dataEng);


    useEffect(() => {
        const texts = document.querySelectorAll(".detectText");
        for (let i = 0; i < texts.length; i++) {
            if (texts[i].innerHTML === currentAudio?.room || texts[i].innerHTML === currentAudio?.title) {
                texts[i].classList.add("bold");
            }
            else {
                texts[i].classList.remove("bold");
            }
        }
    }, [currentAudio])

    useEffect(() => {
        let tempData: any;
        switch (language) {
            case "eng":
                setTypeData(dataEng);
                tempData = dataEng;
                break;
            case "chi":
                setTypeData(dataChi);
                tempData = dataChi;
                break;
        }

        if (props.play) {
            setCurrentAudio(tempData[props.play]);
        }
    }, [language]);

    return (
        <Box
            width={"100%"}
            backgroundColor={"rgb(228, 151, 166)"}
            height={windowDimensions.height}
            overflow="hidden"
            position={"relative"}
        >
            <HeaderInner />

            <Box height={windowDimensions.height * 0.05} />
            <Box
                width={"85%"}
                margin={`auto`}
                height={windowDimensions.height * 0.7}
                overflow="auto"
            >
                {
                    Object.keys(typeData).map((key, index) => {
                        return (
                            <Box
                                key={index}
                                display={"flex"}
                                height={windowDimensions.height * 0.09}
                                alignItems="center"
                                onClick={() => {
                                    // @ts-ignore
                                    window.setTrigger1(true);
                                    setCurrentAudio(typeData[key])
                                }}
                            >
                                <Text className='detectText' color={"black"} fontWeight={100} fontSize={"0.8rem"} fontFamily={"GucciSans"} as={'h4'} flex={"1 1 40%"}>{typeData[key].room}</Text>
                                <Text className='detectText' color={"black"} fontWeight={100} fontSize={"0.8rem"} fontFamily={"GucciSans"} as={'h4'} flex={"1 1 60%"}>{typeData[key].title}</Text>
                            </Box>
                        )
                    })
                }
            </Box>
            <Popup />
        </Box>
    )
}

export default Innerpage;