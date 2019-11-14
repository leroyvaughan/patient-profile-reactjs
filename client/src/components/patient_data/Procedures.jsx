import React, { Component } from 'react';
import styled from 'styled-components';


const Body = styled.div.attrs({
    className: "dataBody"
})``

const Column = styled.div.attrs({
    className: "col-sm-6",
    id: "procedures"
})`
`
const Col = styled.div.attrs({
    className: "col colData"
})`
    text-align: left !important;
`

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





class Procedures extends Component {
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
                    <Hdr>Procedures</Hdr>
                    <Body>
                        <Container>

                            {
                                data.map((curObj, ix) => {
                                    let desc = curObj.description;

                                    return <Row
                                        key={ix}>
                                        <Col>{desc}</Col>
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
                    <Hdr>Procedures</Hdr>
                    <Body>
                        <Container>
                            <Row>
                                <Center>No Procedures Recorded!</Center>
                            </Row>
                        </Container>
                    </Body>
                </Column>
            )

        }
    }
}

export default Procedures