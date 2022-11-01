import { Box, Text } from '@chakra-ui/react'
import Innerpage from '../component/innerpage';
import Preload from '../component/preload';

// span in chakra ui 

export default function Home() {
  // chakra with framer motion

  return (
    <Box
      maxW={500}
      backgroundColor="black"
      margin={"auto"}
      position="relative"
    >
      <Innerpage />
      <Preload toggle={false} />
    </Box>
  )
}
