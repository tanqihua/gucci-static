import { Box } from '@chakra-ui/react'
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
            <Innerpage play={"room-5"} />
            <Preload toggle={true} />
        </Box>
    )
}
