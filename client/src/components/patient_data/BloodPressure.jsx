import React, { Component } from "react";
import styled from "styled-components";
import { Chart } from "react-google-charts";

const Body = styled.div.attrs({
    className: "dataBody"
})``


const Col = styled.div.attrs({
    className: "col colData"
})``


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




class BloodPressure extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chartData: this.props.data,
            chartType: this.props.type,
            options: {
                title: "Most Recent Blood Pressure Readings",
                colors: ["#5f81a7", "#dc3912", "#33ac71"],
                hAxis: {
                    title: "Time of Day",
                    textStyle: {
                        fontSize: 10,
                        color: "#777",
                        slantedText: true
                    }
                },
                vAxis: {
                    // title: "Blood Pressure",
                    minValue: 0
                },
                pointSize: 5,
                pointsVisible: true,
                // axes: {
                //     x: {
                //         0: { side: 'top' }
                //     }
                // }

            }
        }
    }


    massageData = (dataIn) => {
        let dataOut = [];

        //set col headers
        dataOut.push(["Time of Day", "Systolic", "Diastolic", "Heart Rate"]);

        //set column data
        dataIn.forEach((curObj) => {
            let dateStr = curObj.date + " " + curObj.time;
            let Systolic = curObj.Systolic;
            let Diastolic = curObj.Diastolic;
            let HeartRate = curObj.HeartRate;

            dataOut.push([dateStr, Systolic, Diastolic, HeartRate]);
        });

        return dataOut;
    }

    componentWillReceiveProps({ data, type }) {
        this.setState({ chartData: data, chartType: type });
    }


    render() {
        const { chartData, chartType, options } = this.state;
        let data = this.massageData(chartData);

        return (
            <Col>
                <Hdr>Blood Pressure Chart</Hdr>
                <Body>
                    <Container>

                        <Row id="bpChart">
                            <ChartWrap>
                                <Chart
                                    chartType={chartType}
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


export default BloodPressure