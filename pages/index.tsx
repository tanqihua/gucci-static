import { Box } from '@chakra-ui/react'
import Innerpage from '../component/innerpage';
import { useModal } from '../component/context';
import { useEffect } from 'react';
export default function Home() {
  // chakra with framer motion

  const { setCurrentAudio } = useModal();


  useEffect(() => {
    setCurrentAudio("room-1")
  })

  return (
    <Box
      maxW={500}
      backgroundColor="black"
      margin={"auto"}
      position="relative"
    >
      <Innerpage />
    </Box>
  )
}
