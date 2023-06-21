import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'

import styled from 'styled-components';
import techImage from '../../assets/tech.png';
import { useNavigate } from 'react-router-dom';

const Styles = styled.div`
  .jumbo {
    background: url(${techImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

export const SecondaryHeader = () => {
    const [logindata, setLoginData] = useState([]);

    const history = useNavigate();

    const getUserDetails = () => {
        const getuser = localStorage.getItem("user_login");
        if (getuser && getuser.length) {
            const user = JSON.parse(getuser);
            setLoginData(user);
        } else {
            history("/login");
        }
    }

    useEffect(() => {
        getUserDetails();
    }, [])

    return (
        <Styles>
            <div class="jumbo jumbotron jumbotron-fluid">
                <div className="overlay"></div>
                <Container>
                    <h1>{`Welcome, ${logindata?.[0]?.name}`}</h1>
                    <p>Analytics integration using Mixpanel</p>
                </Container>
            </div>
        </Styles>
    )
}
