// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import "../styles/globals.css";
// 1. Import the extendTheme function
import { extendTheme, Box } from '@chakra-ui/react'
import { ContextProvider } from '../component/context';

// 2. Extend the theme to include custom colors, fonts, etc

function MyApp({ Component, pageProps }: any) {

  const theme = extendTheme({
    fonts: {
      heading: "GucciSans-Bold",
      body: "GucciSans",
    },
    styles: {
      global: {
        body: {
          bg: "rgb(228, 151, 166)",
        }
      }
    }
  })

  return (
    <ContextProvider>
      <ChakraProvider theme={theme}>
        <Box>
          <Component {...pageProps} />
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
            bottom={"0"}
            backgroundColor={"rgb(228, 151, 166)"}
          >
            <p
            >
              ®️ ALL RIGHTS RESERVED BY GUCCI. POWERED BY {" "}
              <span onClick={() => {
                window.open("https://conten.tech", "_blank")
              }} style={{ color: "black", textDecoration: "underline" }}>
                CONTEN.T
              </span>
            </p>
          </Box>
        </Box>
      </ChakraProvider>
    </ContextProvider>
  )
}

export default MyApp