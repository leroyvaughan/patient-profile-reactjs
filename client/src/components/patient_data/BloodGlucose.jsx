import React, { Component } from 'react';
import styled from 'styled-components';
import { Chart } from "react-google-charts";

const Body = styled.div.attrs({
    className: "dataBody"
})``


const Col = styled.div.attrs({
    className: "col colData"
})`
    margin-top: 50px;
`


const Container = styled.div.attrs({
    className: "container"
})`
`

const Row = styled.div.attrs({
    className: "row data-row"
})`
    padding: 15px;
    margin-bottom: 21px;
`

const Hdr = styled.div.attrs({
    className: "dataObjectHdr"
})``

const ChartWrap = styled.div`
    padding: 7px;
    width: 100%;
`





class BloodGlucose extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chartData: this.props.data,
            options: {
                title: "Most Recent Blood Glucose Readings",
                colors: ["#76A7FA"],
                hAxis: {
                    title: "Glucose Level (mg/dL)",
                    minValue: 0,
                },
                vAxis: {
                    title: "Time of Day",
                    textStyle: {
                        fontSize: 10,
                        color: "#777"
                    },
                    hAxis: {
                        textStyle: {
                            color: "#ccc"
                        }
                    }
                }
            }
        }
    }


    massageData = (dataIn) => {
        let dataOut = [];

        //set col headers
        dataOut.push(["Date", "Glucose Level"]);

        //set column data
        dataIn.forEach((curObj) => {
            let dateStr = curObj.date + " " + curObj.time;
            let BG = curObj.BG;

            dataOut.push([dateStr, BG]);
        });

        return dataOut;
    }

    componentWillReceiveProps({ data }) {
        this.setState({ chartData: data });
    }


    render() {
        const { chartData, options } = this.state;
        let data = this.massageData(chartData);

        return (
            <Col>
                <Hdr>Blood Glucose Chart</Hdr>
                <Body>
                    <Container>
                        <Row>
                            <ChartWrap>

                                <Chart
                                    chartType="BarChart"
                                    width="100%"
                                    height="400px"
                                    options={options}
                                    data={data} />

                            </ChartWrap>
                        </Row>
                    </Container>
                </Body>
            </Col>
        )
    }
}


export default BloodGlucose