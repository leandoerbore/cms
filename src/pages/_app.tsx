import type { AppProps } from 'next/app'
import { Layout } from '../Components/Layout'
import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
  return <Layout><Component {...pageProps} /></Layout>
}

// function App() {
//   return (
//     <Layout>
//       <Route path="/" />
//       <Route path="/redirects" element={<Redirects />} />
//     </Layout>
//   )
// }

// export default App