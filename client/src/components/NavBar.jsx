import React, { Component } from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import NavHdr from './NavHdr';

const Container = styled.div.attrs({
    className: 'container-fluid',
})`
    border-bottom: 1px solid #000;
`

const Nav = styled.nav.attrs({
    className: 'row',
})`
    margin-bottom: 20 px;
`

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Logo />
                    <NavHdr />
                </Nav>
            </Container>
        )
    }
}

export default NavBar;