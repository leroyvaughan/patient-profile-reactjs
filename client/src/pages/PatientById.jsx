import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Allergies, Conditions, Immunizations, Medications, Procedures } from '../components';



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
            options: [
                { label: 'Smart, Timmy', value: '4342012' },
                { label: 'Paddack, Dustin Lee', value: '861933' },
            ]
        }



        console.log("patientById()");
    }




    getData = async (pID) => {

        if (!pID) {
            pID = this.state.patientId;
        }

        console.log("getData:\t" + pID)

        let response = await fetch("/api/patient/" + pID);
        let patient = await response.json();
        let pObj = patient.data;

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

        console.log(this.state.name);
    }



    handleChange = (selectedOption) => {
        console.log("id?: " + selectedOption.value);

        this.setState({
            patientId: selectedOption.value
        });

        this.getData(selectedOption.value);
    }



    componentDidMount = () => {
        this.getData(this.patientId);
    }


    render() {
        const {
            patientId, name, allergies, conditions, immunizations, medications,
            procedures, sensorData, age, gender, dob, ethnicity, careProvider,
            options
        } = this.state;

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

                            </Row>

                        </Container>














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