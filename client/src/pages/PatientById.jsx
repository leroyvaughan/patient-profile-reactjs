import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Allergies, Conditions, Immunizations, Medications } from '../components';
// import { Procedures } from '../components';

import { BloodPressure } from '../components';
import { BloodGlucose } from '../components';
import { Weight } from '../components';




const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
margin: 0 30px;
`

const SelectWrapper = styled.div.attrs({
    id: "select-wrapper"
})`
`


const Title = styled.h1.attrs({
    className: 'h1',
})``

const BlockLabel = styled.label`
    display: block;
    margin: 0px;
`

const Label = styled.label`
    margin: 0;
`

const Container = styled.div.attrs({
    className: "container",
    id: "data-objects-wrapper"
})`
    margin-top: 21px;
`

const Row = styled.div.attrs({
    className: "row"
})``

const BPWrapper = styled.div`
    margin-top: 50px;
    text-align: right;
`

const Button = styled.div.attrs({
    className: "btn btn-secondary"
})`
    font-size: 0.8em !important;
    padding: 3px 10px !important;
`


class PatientById extends Component {
    constructor(props) {
        super(props)

        this.state = {
            patientId: this.props.match.params.id,
            name: '',
            allergies: '',
            conditions: '',
            immunizations: '',
            info: '',
            medications: '',
            procedures: '',
            sensorData: '',
            age: '',
            dob: '',
            ethinicity: '',
            gender: '',
            careProvider: '',
            isMounted: false,
            chartType: "Line",
            options: [
                { label: 'Smart, Timmy', value: '4342012' },
                { label: 'Paddack, Dustin Lee', value: '861933' },
            ]
        }
    }




    getData = async (pID) => {
        if (!pID) {
            pID = this.state.patientId;
        }

        // console.log("getData:\t" + pID)

        let response = await fetch("/api/patient/" + pID);
        let patient = await response.json();
        let pObj = patient.data;
        window.history.pushState("Patient Id Change", "Patient Profile", "/patient/" + pID);

        this.setState({
            name: pObj.name,
            allergies: pObj.allergies,
            conditions: pObj.conditions,
            immunizations: pObj.immunizations,
            info: pObj.info,
            medications: pObj.medications,
            procedures: pObj.procedures,
            sensorData: pObj.sensorData,
            age: pObj.info.age,
            dob: pObj.info.dob,
            ethnicity: pObj.info.ethnicity,
            gender: pObj.info.gender,
            careProvider: pObj.info.careProvider[0].display,
            isMounted: true,
        });
    }



    handleChange = (selectedOption) => {
        this.setState({
            patientId: selectedOption.value
        });

        this.getData(selectedOption.value);
    }

    changeBPChartType = () => {
        this.setState({
            chartType: (this.state.chartType === "Bar") ? "Line" : "Bar",
            sensorData: this.state.sensorData
        })
    }


    componentDidMount = () => {
        this.getData(this.patientId);
    }


    render() {
        const {
            patientId, name, allergies, conditions, immunizations, medications,
            sensorData, age, gender, dob, ethnicity, careProvider, options, chartType
            // , procedures
        } = this.state;

        let chartTxt = (chartType === "Bar") ? "Line" : "Bar";

        return (
            <Wrapper>
                {this.state.isMounted && (
                    <div className="mt-4">
                        <SelectWrapper>
                            <Select
                                id="patient-select"
                                onChange={this.handleChange}
                                options={options}
                                defaultValue={{ label: name, value: patientId }}
                                autoFocus={true}
                            />
                        </SelectWrapper>


                        <Title>{name}</Title>

                        <Label>{age} years old</Label>&nbsp;&nbsp;
                        <Label>{ethnicity},</Label>
                        <Label>&nbsp;{gender}</Label>

                        <BlockLabel>Born on {dob}</BlockLabel>
                        <BlockLabel>Care Provider: {careProvider}</BlockLabel>

                        <Container className="no-gutters">
                            <Row>
                                <Allergies data={allergies} />
                                <Medications data={medications} />
                            </Row>

                            <Row>
                                <Immunizations data={immunizations} />
                                <Conditions data={conditions} />
                            </Row>

                            { /*not enough data for the two sample patients */}
                            {/* <Row>
                                 <Procedures data={procedures} />
                             </Row> */}


                            <Row>
                                <BloodGlucose data={sensorData.bloodGlucose} />
                            </Row>

                            <BPWrapper>
                                <Button
                                    onClick={this.changeBPChartType}
                                    className="btn btn-primary">
                                    View as {chartTxt} Chart
                                </Button>

                                <Row>
                                    <BloodPressure
                                        data={sensorData.bloodPressure}
                                        type={chartType}
                                    />
                                </Row>
                            </BPWrapper>


                            <Row>
                                <Weight
                                    data={sensorData.weight}
                                    type="LineChart"
                                />
                            </Row>
                        </Container>

                        <br />
                        <br />
                        <br />


                        <Link
                            id="backBtn"
                            className="btn btn-primary"
                            to={'/patients/list'}>Back</Link>
                    </div>
                )}
            </Wrapper>
        )

    }
}

export default PatientById