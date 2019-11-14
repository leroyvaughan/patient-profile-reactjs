import React, { Component } from 'react';
import styled from 'styled-components';
import Scrollbar from 'react-scrollbars-custom';



const Body = styled.div.attrs({
    className: "dataBody"
})``

const Column = styled.div.attrs({
    className: "col-sm-6",
    id: "conditions"
})`
`
const Col = styled.div.attrs({
    className: "col colData"
})``


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





class Conditions extends Component {
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
        if (data.length > 8) {
            return (
                <Column>
                    <Hdr>Conditions</Hdr>
                    <Body>
                        <Container>
                            <Scrollbar id="conditions-scrollarea">

                                {
                                    data.map((curObj, ix) => {
                                        let desc = curObj.description;
                                        let date = curObj.dateRecorded;

                                        return <Row
                                            key={ix}>
                                            <Col className="col-sm-9">{desc}</Col>
                                            <Col>{date}</Col>
                                        </Row>
                                    })
                                }

                            </Scrollbar>

                        </Container>
                    </Body>
                </Column>
            )
        }
        else {

            return (
                <Column>
                    <Hdr>Conditions</Hdr>
                    <Body>
                        <Container>

                            {
                                data.map((curObj, ix) => {
                                    let desc = curObj.description;
                                    let date = curObj.dateRecorded;

                                    return <Row
                                        key={ix}>
                                        <Col className="col-sm-9">{desc}</Col>
                                        <Col>{date}</Col>
                                    </Row>
                                })
                            }

                        </Container>
                    </Body>
                </Column>
            )
        }
    }
}

export default Conditions