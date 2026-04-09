import { Container, Row, Col } from 'react-bootstrap';
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { favoritesAtom } from '@/store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData'; 
export default function SiteDetails({site, siteId, showFavouriteBtn=true}){
  const [ favouritesList, setFavouritesList ] = useAtom(favoritesAtom);
  const [ showAdded, setShowAdded ] = useState(false)

  async function favouritesClicked(){
    if(showAdded){
      setFavouritesList(await removeFromFavourites(siteId));
      setShowAdded(false);
    } else{
      setFavouritesList(await addToFavourites(siteId));
      setShowAdded(true);
    }
  }
      useEffect(()=>{
        setShowAdded(favouritesList?.includes(siteId))
    }, [favouritesList])

  return (
    <>
      <Container>
        <Row>
          <Col lg="5">
           <img src={site.image} alt="Site Image" className="img-fluid w-100" 
           onError={(event) => {
              event.target.onerror = null; 
              event.target.src =
                  "https://placehold.co/400x600?text=Cover+Not+Available";
              }} />
          <br />
          <br />
          </Col>
          <Col lg="7">
          <h3>{site.siteName}</h3>
            <p>{site.description}</p>
            <hr />

            <h5>Dates</h5>
            {site.dates?.map((date)=>{
              return <span key={date._id}>{date.year}</span>
            })}
            <br /><br />

            <h5>Designated</h5>
            {site.designated}
            <br /><br />

            <h5>GPS Coordinates</h5>
            {site?.location?.latitude}, {site?.location?.longitude}
            <br /><br />

            <h5>Location</h5>
            {site?.location?.town}
            <br /><br />

            <h5>Region</h5>
            {site?.provinceOrTerritory?.region}
            <br /><br />
            {showFavouriteBtn && (<button onClick={favouritesClicked} className={`btn ${showAdded ? "btn-primary" : "btn-primary"}`} type="button"> {showAdded ? "+ Favourites (added)" : "+ Favourite"}</button>)}
          </Col>
        </Row>
      </Container>
    </>
  )
}