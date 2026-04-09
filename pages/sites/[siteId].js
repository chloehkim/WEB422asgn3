import { useRouter } from 'next/router';
import useSWR from 'swr';
import SiteDetails from '@/components/SiteDetails'
import Error from 'next/error'
import PageHeader from '@/components/PageHeader';

export default function Site(){
  const router = useRouter();
  const { siteId } = router.query;
  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}`);

  //if it's loading
  if(isLoading){
    return null
  // if data is invalid or error 
  } else if (!data || error){
    return (
      <>
        <Error statusCode={404}></Error>
      </>
    )
  }
  //everything was successful
  return (
    <>
        <PageHeader text={data.siteName}></PageHeader>
        <SiteDetails site={data} siteId={siteId}></SiteDetails>
    </>
  )
}

