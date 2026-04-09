import Link from "next/link";
import Card from "react-bootstrap/Card";
import SiteDetails from "@/components/SiteDetails";
import PageHeader from "@/components/PageHeader";

export async function getStaticProps() {
  let url = 'https://web-422-theta-peach.vercel.app/api/sites/6988e2d361466170cc1d5a57';
  const res = await fetch(url);
  const data = await res.json();

  return { props: { site: data } };
}


export default function About({site}){
    
  return (
    <>
        <PageHeader text="About the Developer" subtext="Chloe Kim" />
        <dev>
          <p>Hello, My name is Chloe Kim.<br />
          I am a fourth semester student at Seneca Polytechnic, majoring in Computer Programming & Analysis. 
          This academic experience is my first journey into computer programming.
          I am enjoying learning and studying in this field, even though it has been challenging at times.
          This project demonstrates the use of a Web API and Next.js to display site information. </p>
        </dev>
        <SiteDetails site={site} siteId={"6988e2d361466170cc1d5a57"} showFavouriteBtn={false} />
    </>
  )
}