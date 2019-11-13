import React, { Component } from 'react';
import styled from 'styled-components';


const Column = styled.div.attrs({
    className: "col-sm-6",
    id: "medications"
})`
`

const Body = styled.div`
    border: 1px solid #777;
    border-radius: 0 0 7px 7px;
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

const Desc = styled.span`
    color: #3F51B5;
`
const Dosage = styled.span`
    color: #009688;
`





class Medications extends Component {
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
                <Hdr>Medications</Hdr>
                <Body>
                    <Container>

                        {
                            data.map((curObj, ix) => {
                                let desc = curObj.description;
                                let dosage = curObj.dosageInstruction;

                                return <Row
                                    key={ix}>
                                    <Col>
                                        <Desc>{desc}</Desc>.&nbsp;
                                        <Dosage>{dosage}</Dosage>
                                    </Col>
                                </Row>
                            })
                        }

                    </Container>
                </Body>
            </Column>

        )
    }
}


export default Medications