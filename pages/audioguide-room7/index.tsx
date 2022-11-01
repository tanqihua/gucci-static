import { Box, Text } from '@chakra-ui/react'
import Innerpage from "../../component/innerpage";
import Preload from '../../component/preload';

export default function Home() {
    // chakra with framer motion

    return (
        <Box
            maxW={500}
            backgroundColor="black"
            margin={"auto"}
            position="relative"
        >
            <Innerpage play={"room-7"} />
            <Preload toggle={true} />

            <Box
                position={"absolute"}
                zIndex={1000}
                color={"black"}
                fontSize={"1vh"}
                width={"100%"}
                textAlign={"center"}
                left="50%"
                transform={"translateX(-50%)"}
                height={"2vh"}
                backgroundColor={"rgb(228, 151, 166)"}
            >
                <Text
                >
                    ®️ ALL RIGHTS RESERVED BY GUCCI. POWERED BY {" "}
                    <Text color={"white"} textDecoration="underline">
                        CONTEN.T
                    </Text>
                </Text>
            </Box>
        </Box>
    )
}
