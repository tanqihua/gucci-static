// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import "../styles/globals.css";
// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react'

import { ContextProvider } from '../component/context';
import { useEffect } from 'react';

// 2. Extend the theme to include custom colors, fonts, etc
import { Global } from "@emotion/react"

function MyApp({ Component, pageProps }: any) {

  const theme = extendTheme({
    fonts: {
      heading: "GucciSans-Bold",
      body: "GucciSans",
    }
  })
  useEffect(() => {
    console.log(theme);
  })

  return (
    <ContextProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ContextProvider>
  )
}

export default MyApp