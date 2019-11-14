import React, { Component } from "react";
import styled from "styled-components";
import { Chart } from "react-google-charts";

const Body = styled.div.attrs({
    className: "dataBody"
})``

const Column = styled.div.attrs({
    className: "col-sm-6",
    id: "blood-pressure"
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
            options1: {
                title: "Most Recent Blood Pressure Readings",
                colors: ["#5f81a7", "#dc3912"],
                hAxis: {
                    title: "Blood Pressure",
                    minValue: 0,
                },
                vAxis: {
                    title: "Time of Day",
                    textStyle: {
                        fontSize: 10,
                        color: "#777"
                    }
                },
                // animation: {
                //     startup: true,
                //     easing: 'linear',
                //     duration: 1500,
                // },
            },
            options2: {
                title: "Heart Rate During Blood Pressure Readings",
                colors: ["#76A7FA"],
                hAxis: {
                    title: "Heart Rate",
                    minValue: 0,
                    textStyle: {
                        color: "#ccc"
                    }
                },
                vAxis: {
                    title: "Time of Day",
                    textStyle: {
                        fontSize: 10,
                        color: "#777"
                    }
                },
                // legend: {
                //     position: "left"
                // }
            },
        }
    }


    massageData = (dataIn) => {
        let dataOut = [];
        let BP = [], HR = [];

        //set col headers
        BP.push(["Time of Day", "Systolic", "Diastolic"]);
        HR.push(["Time of Day", "Heart Rate"]);

        //set column data
        dataIn.map((curObj, ix) => {
            let dateStr = curObj.date + " " + curObj.time;
            let Systolic = curObj.Systolic;
            let Diastolic = curObj.Diastolic;
            let HeartRate = curObj.HeartRate;

            BP.push([dateStr, Systolic, Diastolic]);
            HR.push([dateStr, HeartRate]);
        });

        dataOut.push(BP, HR);

        // console.log("dataOut\r");
        // console.log(dataOut);
        return dataOut;
    }

    componentWillReceiveProps({ data, type }) {
        this.setState({ chartData: data, chartType: type });
    }


    render() {
        const { chartData, chartType, options1, options2 } = this.state;
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
                                    options={options1}
                                    data={data[0]} />
                            </ChartWrap>
                        </Row>

                        <p>&nbsp;</p>

                        <Row id="bgChart">
                            <ChartWrap>
                                <Chart
                                    chartType={chartType}
                                    width="100%"
                                    height="400px"
                                    options={options2}
                                    data={data[1]} />
                            </ChartWrap>
                        </Row>

                    </Container>
                </Body>
            </Col>
        )
    }
}


export default BloodPressure