
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/font-awesome-4.7.0/css/font-awesome.min.css'
import '../styles/icons/iconfont.css'
import '../styles/globals.less'
import {BaseLayout} from '../layout'

import '../styles/about.less'
import '../styles/buy.less'
import '../styles/contact.less'
import '../styles/detail.less'
import '../styles/finance.less'
import '../styles/home.less'
import '../styles/offers.less'
import '../styles/sell.less'
import '../styles/tyre.less'

import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import localFont from '@next/font/local'

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'KronaOne';
    src: url('/static/fonts/KronaOne/KronaOne.ttf') format('truetype');

  }
  @font-face {
    font-family: 'Manrope';
    src: url('/static/fonts/Manrope/Manrope.ttf') format('truetype');

  }
  @font-face {
    font-family: 'Manrope-Bold';
    src: url('/static/fonts/Manrope/Manrope-Bold.ttf') format('truetype');

  }

`;

function MyApp({ Component, pageProps }) {
  return (
    <BaseLayout>
      <GlobalStyle/>
      <Component {...pageProps} />
    </BaseLayout>
  )
}

export default MyApp
