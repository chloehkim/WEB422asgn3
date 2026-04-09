import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
// import { useEffect } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

export default function SearchForm(){
    const router = useRouter();

    const { register, handleSubmit, setValue, formState: { errors }} = useForm({
        defaultValues: {
            name: "",
            description: "",
            year: "",
            town: "",
            provinceOrTerritoryCode: "",
        }
    })
     //When user clicks the submit button, submitForm would work. 
      function submitForm(data) { 
        console.log("data:", data);

        // router.push: move to the next page.. /sites?query
        router.push({
            pathname: '/sites',
            query: Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== '')) 
        });
    }
    
    return (
        <>
            <Form onSubmit={(handleSubmit(submitForm))}>
                <Row>
                    <Col xs={12}>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Name (contains)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name (e.g. 'can' or 'Canadian')"
                                className={errors.name && "is-invalid"}{...register("name", { required: true })}
                            />
                             {errors.name?.type === "required" && <span className="is-invalid text-danger">Name is required</span>}
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col lg={6}>
                        <Form.Group controlId="description" className="mb-3">
                            <Form.Label>Description (contains)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter description (e.g. 'min' or 'terminal')"
                                {...register("description")}
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group controlId="year" className="mb-3">
                            <Form.Label>Year (of opened, completed, ...)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter year (e.g. 1908)"
                                {...register("year")}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-4">
                    <Col lg={6}>
                        <Form.Group controlId="town" className="mb-3">
                            <Form.Label>Town / City (contains)</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter town code (e.g. 'tt' or 'Ottawa')"
                                maxLength="3"
                                {...register("town")}
                            />
                        </Form.Group>
                    </Col>
                    <Col lg={6}>
                        <Form.Group controlId="provinceOrTerritoryCode" className="mb-3">
                            <Form.Label>Province or Territory Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter province or territory code (e.g. ON)"
                                {...register("provinceOrTerritoryCode")}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={12}>
                        <Button variant="primary" type="submit" className="w-100 py-3 fs-5" disabled={Object.keys(errors).length>0}>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
