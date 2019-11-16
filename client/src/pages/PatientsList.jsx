import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import styled from 'styled-components'


const Wrapper = styled.div.attrs({
    id: "patientsListWrapper",
})`
    padding: 40px;
    position: relative;
`

const Background = styled.div`
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.1;
    background: url("/img/bck2.jpg") repeat;
`

const WhiteSpaceImg = styled.img.attrs({
    src: "../../img/patient-data-profile.png",
})`
    margin-top: 42px;
    max-width: 100%;
`



class PatientsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patients: [],
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        let response = await fetch('/api/patients');
        let data = await response.json();

        this.setState({
            patients: data.data
        });
    }

    render() {
        const { patients } = this.state;
        let showTable = true;

        if (!patients.length) {
            showTable = false;
        }

        return (
            <Wrapper>
                <Background />
                {showTable && (

                    <Table>
                        <Thead>
                            <Tr>
                                <Th>PatientId</Th>
                                <Th>Name</Th>
                                <Th className="age">Age</Th>
                                <Th>Gender</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {patients.map((curObj, ix) => {
                                let pID = curObj.patientId;
                                let name = curObj.name;
                                let age = curObj.age;
                                let gender = curObj.gender;
                                let url = "/patient/" + pID;


                                return <Tr key={ix}>
                                    <Td>
                                        <Link to={url} className="viewLink">{pID}</Link>
                                    </Td>
                                    <Td>{name}</Td>
                                    <Td className="age">{age}</Td>
                                    <Td>{gender}</Td>
                                </Tr>
                            })
                            }
                        </Tbody>
                    </Table>

                )}
                <div className="container">
                    <WhiteSpaceImg />
                </div>
            </Wrapper>
        )
    }
}

export default PatientsList