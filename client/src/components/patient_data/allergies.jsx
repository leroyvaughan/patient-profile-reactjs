import React, { Component } from 'react';
import styled from 'styled-components';


const Body = styled.div`
    border: 1px solid #777;
    border-radius: 0 0 7px 7px;
`

const Column = styled.div.attrs({
    className: "col-sm-6",
    id: "allergies"
})`
`
const Col = styled.div.attrs({
    className: "col colData"
})``

const ColHdr = styled.div.attrs({
    className: "col colHdr"
})`
    padding-left: 7px;
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





class Allergies extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: this.props.data
        }
    }

    componentDidMount = () => {
        const { data } = this.state;

        console.log(data);
    }

    componentWillReceiveProps({ data }) {
        this.setState({ data });
    }




    render() {
        const { data } = this.state;

        return (
            <Column>
                <Hdr>Allergies</Hdr>
                <Body>
                    <Container>
                        <Row>
                            <ColHdr>Description</ColHdr>
                            <ColHdr>Allergy Risk</ColHdr>
                        </Row>

                        {
                            data.map((curObj, ix) => {
                                let desc = curObj.description;
                                let risk = (curObj.criticality) ? curObj.criticality : "unknown";

                                return <Row
                                    key={ix}>
                                    <Col>{desc}</Col>
                                    <Col
                                        className={(risk === "High Risk") ? "text-danger" : "text-warning"}
                                    >{risk}</Col>
                                </Row>
                            })
                        }

                    </Container>
                </Body>
            </Column>

        )
    }
}

export default Allergies