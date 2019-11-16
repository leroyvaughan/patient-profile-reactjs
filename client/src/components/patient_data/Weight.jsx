import React, { Component } from "react";
import styled from "styled-components";
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




class Weight extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chartData: this.props.data,
            chartType: this.props.type,
            options: {
                title: "Most Recent Weight Scale Readings",
                colors: ["#f76f08", "#673AB7", "#607D8B"],
                hAxis: {
                    title: "Time of Day",
                    minValue: 0,
                    textStyle: {
                        fontSize: 10,
                        color: "#777"
                    }
                },
                vAxis: {
                    // title: "Weight (lbs) + BMI"
                    minValue: 0,
                    maxValue: 350
                },
                pointSize: 5,
                // axes: {
                //     x: {
                //         0: { side: 'top' }
                //     }
                // }
            },
        }

    }


    massageData = (dataIn) => {
        let dataOut = [];

        //set col headers
        dataOut.push(["Time of Day", "Weight", "Body Water", "BMI"]);

        //set column data
        dataIn.forEach((curObj) => {
            let dateStr = curObj.date + " " + curObj.time;
            let Weight = curObj.Weight;
            let Water = curObj.BodyWater;
            let BMI = curObj.BMI;

            dataOut.push([dateStr, Weight, Water, BMI]);
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
                <Hdr>Weight Chart</Hdr>
                <Body>
                    <Container>

                        <Row id="WeightChart">
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


export default Weight