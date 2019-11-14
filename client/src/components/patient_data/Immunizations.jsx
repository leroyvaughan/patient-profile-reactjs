import React, { Component } from 'react';
import styled from 'styled-components';


const Body = styled.div.attrs({
    className: "dataBody"
})``

const Column = styled.div.attrs({
    className: "col-sm-6",
    id: "immunizations"
})`
`
const Col = styled.div.attrs({
    className: "col colData"
})``

const Center = styled.div.attrs({
    className: "col colData"
})`
    text-align: center !important;
`



const Container = styled.div.attrs({
    className: "container"
})`
`

const Row = styled.div.attrs({
    className: "row data-row"
})``

const Hdr = styled.div.attrs({
    className: "dataObjectHdr"
})``

const Site = styled.div`
    font-size: small;
    color: #777;
    display: block;
`



class Immunizations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data
        }
    }

    componentWillReceiveProps({ data }) {
        this.setState({ data });
    }



    render() {
        const { data } = this.state;

        if (data.length) {

            return (
                <Column>
                    <Hdr>Immunizations</Hdr>
                    <Body>
                        <Container>

                            {
                                data.map((curObj, ix) => {
                                    let desc = curObj.description;
                                    let date = curObj.dateRecorded;
                                    let doseObj = curObj.doseQuantity;
                                    let dosageTxt = doseObj.value + doseObj.unit;
                                    let site = curObj.site.text;

                                    return <Row
                                        key={ix}>
                                        <Col className="col-sm-9">
                                            {desc}&nbsp;<span>({dosageTxt})</span>
                                            <Site>{site}</Site>
                                        </Col>
                                        <Col>{date}</Col>
                                    </Row>
                                })
                            }

                        </Container>
                    </Body>
                </Column>
            )
        }
        else {
            return (
                <Column>
                    <Hdr>Immunizations</Hdr>
                    <Body>
                        <Container>
                            <Row>
                                <Center>No Immunizations Recorded!</Center>
                            </Row>
                        </Container>
                    </Body>
                </Column>
            )
        }
    }
}


export default Immunizations