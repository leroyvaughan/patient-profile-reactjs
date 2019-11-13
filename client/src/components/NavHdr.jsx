import React, { Component } from 'react';
import styled from 'styled-components';



const SiteTitle = styled.div.attrs({
    className: "col-sm-8",
    id: "navHdr"
})`
    color: #032861;
    text-align:center;
`



class NavHdr extends Component {
    render() {
        return (
            <SiteTitle>
                My 3rd MERN App: Patient Profile
            </SiteTitle>
        )
    }

}


export default NavHdr;