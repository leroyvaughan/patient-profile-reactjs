import React, { Component } from 'react';
import styled from 'styled-components';


const LogoImg = styled.img.attrs({
    src: "/img/logo_final.gif",
    alt: "",
    title: "GoTo Patient Profile Home Page",
})`
`


const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

class Logo extends Component {
    render() {
        return (
            <div className="col-sm-4">
                <Wrapper href="/">
                    <LogoImg />
                </Wrapper>
            </div>
        )
    }
}

export default Logo;