import PageHeader from '@/components/PageHeader';
import { Container, Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favoritesAtom } from '@/store';
import SiteCard from '@/components/SiteCard';

export default function Favourites(){

    const [ favouritesList, setFavouritesList ] = useAtom(favoritesAtom);

    if(!favouritesList){
        return null;
    }

    return (
        <>
            <PageHeader text={favouritesList.length === 0 ? "Nothing Here" : "Favourites"} subtext={favouritesList.length === 0 ? "Try adding a site to the list" : "All your favourite sites, in one place"} /> 
                 <Container>
                    <Row className="gy-4">
                         {favouritesList.map((siteId)=> (
                             <Col lg={3} md={6} key={siteId}>   
                                <SiteCard siteId={siteId} />
                            </Col>
                         ))}                       
                    </Row>
                </Container>
        </>
    )
}

