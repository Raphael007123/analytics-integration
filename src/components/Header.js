import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button, ButtonGroup, Dropdown, DropdownButton, NavDropdown } from 'react-bootstrap'

const Header = () => {
    const analyticsVal = localStorage.getItem('analytics-value');
    const location = useLocation()
    const history = useNavigate();
    const [logindata, setLoginData] = useState([]);
    const [analytics, setAnalytics] = useState(analyticsVal)
    const pathname = location?.pathname
    const getData = () => {
        const getuser = localStorage.getItem("user_login");
        if (getuser && getuser.length) {
            const user = JSON.parse(getuser);
            setLoginData(user);
        } else {
            setLoginData([]);
        }
    }

    useEffect(() => {
        getData();
    },[location])

    const onClick = (val) => {
        setAnalytics(val);
        localStorage.setItem('analytics-value', val); 
    }

    const navigate = (path) => {
        history(path)
    }

    const userlogout = ()=>{
        localStorage.removeItem("user_login")
        history("/login");
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container fluid>
                    <Navbar.Brand onClick={()=> navigate('/')}>Analytics</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=> navigate('/details')}>Home</Nav.Link>
                        {logindata?.length && <Nav.Link onClick={()=> navigate('/profile')}>Profile</Nav.Link>}
                        {!logindata?.length && (pathname === "/login") && <Nav.Link onClick={()=> navigate('/register')}>Signup</Nav.Link>}
                        {!logindata?.length && (pathname === "/register") && <Nav.Link onClick={()=> navigate('/login')}>Login</Nav.Link>}
                        {/* <NavDropdown title={analytics ? analytics : "Analytics"} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={()=>{onClick('Google Analytics')}}>Google Analytics</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={()=>{onClick('Mixpanel')}}>Mixpanel</NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    {logindata?.length &&<Button onClick={userlogout}>Logout</Button>}
                </Container>
            </Navbar>
        </>
    )
}

export default Header