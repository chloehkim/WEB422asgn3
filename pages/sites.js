/********************************************************************************
*  WEB422 – Assignment 3
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: _____Chloe Kim______ Student ID: ____101504207____ Date: ________________
*
*  Vercel API (Deployed) Link: ______web-422-lmjrnbvpw-chloekims-projects-df0e0deb.vercel.app_______

********************************************************************************/



import PageHeader from "@/components/PageHeader";
import  useSWR  from 'swr';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Pagination, Table } from 'react-bootstrap';

export default function Sites(){
 
  // page: current page number, setPage: the function to change the page 
  const [ page, setPage ] = useState(1);
  const [ pageData, setPageData ] = useState([])
  const router = useRouter();
  const queryString = new URLSearchParams(router.query).toString();
  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/sites?page=${page}&perPage=10&${queryString}`);
  
  useEffect(()=>{
    if(data){
      setPageData(data); //for the data save 
    }
  }, [data])

  function previous(){
    if(page >1){
      setPage(page - 1);
    }
  }

  function next(){
    setPage(page+1);
  }

  return (
    <>
      <PageHeader text="Search Results" subtext={router.query}/>
      <Table striped hover>
        <thead>
          <tr>
            <th className="col-7">Site</th>
            <th className="col-5">Location</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((site)=>(
            <tr key={site._id} onClick={()=> router.push(`sites/${site._id}`)}>
              <td>{site.siteName}</td>
              <td>{`${site?.location?.town}, ${site?.provinceOrTerritory?.code}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={previous}/>
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  )
}



