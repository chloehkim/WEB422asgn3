import "@/styles/globals.css";
import '@/styles/bootstrap.min.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import RouteGuard from '@/components/RouteGuard';

import Layout from '@/components/Layout';
import { SWRConfig } from 'swr';

// import 'bootstrap/dist/css/bootstrap.css'

  const fetcher = async (...args) => {
  const response = await fetch(...args);

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  return response.json();
};


export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value = {{ fetcher }}>
        <RouteGuard>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </RouteGuard>
    </SWRConfig>
  )
}
