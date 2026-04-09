import  useSWR  from 'swr';
import Error from "next/error";
import Card from 'react-bootstrap/Card';
import Link from "next/link";

export default function SiteCard({siteId}){
      const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/sites/${siteId}`);

    if(!data || error) return <Error statusCode={404} />
 
     return (
        <>
          <Card className="bg-light bg-primary" >
              <img src={data.image} alt="Site Image" className="img-fluid w-100" 
                    onError={(event) => {
                    event.target.onerror = null; 
                    event.target.src =
                        "https://placehold.co/400x600?text=Cover+Not+Available";
                    }} />
            <Card.Body> 
                <Card.Title className="text-dark">{data.siteName}</Card.Title>
                <Card.Text>Location: {data.location?.town || 'N/A'}{','} {data.provinceOrTerritory?.code || 'N/A'}</Card.Text>
                <Link href={`/sites/${siteId}`}><button className="btn btn-primary">View Site</button></Link>
            </Card.Body>
        </Card>
        </>
     )
}

 