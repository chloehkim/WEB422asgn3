import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';

export default function PageHeader({text, subtext}){
  const router = useRouter();

  return (
    <>
        <Card className="bg-light bg-primary">
            <Card.Body> 
                <div>
                  <h1 className="text-primary rounded-3 text-center">{text}</h1>
                  {subtext && (
                    <h5 className="text-dark text-center">
                       {typeof subtext === "string" && subtext}
                       {typeof subtext === "object" && Object.keys(subtext).map((key)=>(<span key={key} className="subtext">{key}:{subtext[key]} </span>))} 
                    </h5>
                  )}
                </div>
            </Card.Body>
        </Card>
        <br />
    </>
  )
}

