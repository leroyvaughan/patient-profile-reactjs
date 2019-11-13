import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from "react-router-dom";

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
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        let response = await fetch('/api/patients');
        let data = await response.json();

        this.setState({
            patients: data.data,
            isLoading: false,
        });
    }

    render() {
        const { patients, isLoading } = this.state

        const columns = [
            {
                Header: 'Patient ID',
                accessor: 'patientId',
            },
            {
                Header: 'Name',
                accessor: 'name',
                className: 'name'
            },
            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Gender',
                accessor: 'gender',
            },
            {
                Header: '',
                accessor: '',
                Cell: function (props) {
                    let url = "/patient/" + props.original.patientId;
                    return (
                        <Link to={url} className="viewLink">view</Link>
                    )
                },
            },
        ]

        let showTable = true
        if (!patients.length) {
            showTable = false;
        }

        return (
            <Wrapper>
                <Background />
                {showTable && (
                    <ReactTable
                        data={patients}
                        columns={columns}
                        loading={isLoading}
                        // defaultPageSize={10}
                        showPageSizeOptions={false}
                        minRows={0}
                    />
                )}
                <div className="container">
                    <WhiteSpaceImg />
                </div>
            </Wrapper>
        )
    }
}

export default PatientsList