import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SignImg from '../signImg'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGAAnalytics from '../../hooks/useGAAnalytics'
import { Mixpanel } from '../../hooks/useMixpanel'

const Login = () => {
    const { gtag } = useGAAnalytics();

    const history = useNavigate();

    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    })

    const getdata = (e) => {
        // console.log(e.target.value);


        const { value, name } = e.target;
        // console.log(value,name);


        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })

    }

    useEffect(() => {
        document.body.classList.remove('sticky-header');

        gtag('page_view', {
            page_title: 'Login',
            page_location: window.location.href
        });

        //mixpanel
        Mixpanel.track('Page View', {
            page_title: 'Login',
            page_location: window.location.href
        });
    }, [gtag])

    const addData = (e) => {
        e.preventDefault();

        const getuserArr = localStorage.getItem("useryoutube");

        const { email, password } = inpval;
        if (email === "") {
            toast.error('email field is requred', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('please enter valid email address', {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error('password field is requred', {
                position: "top-center",
            });
        } else if (password.length < 5) {
            toast.error('password length should be greater than five', {
                position: "top-center",
            });
        } else {

            if (getuserArr && getuserArr.length) {
                const userdata = JSON.parse(getuserArr);
                const userlogin = userdata.filter((el, k) => {
                    return el.email === email && el.password === password
                });
                if (userlogin.length === 0) {
                    toast.error('Invalid email id or password', {
                        position: "top-center",
                    });
                    Mixpanel.track('Unsuccessful login', { "email": email, "error_message": 'Invalid email id or password' });

                } else {
                    Mixpanel.identify(userlogin?.[0]?.id);
                    Mixpanel.track('Successful login');
                    Mixpanel.people.set({
                        $first_name: userlogin?.[0]?.name,
                        $email: userlogin?.[0]?.email,
                    });
                    localStorage.setItem("user_login", JSON.stringify(userlogin))

                    history("/details")
                }
            } else {
                toast.error('Invalid email id or password', {
                    position: "top-center",
                });
                Mixpanel.track('Unsuccessful login', { "email": email, "error_message": 'Invalid email id or password' });
            }
        }

    }

    const isLoggedIn = () => {
        const getuser = localStorage.getItem("user_login");
        if (getuser && getuser.length) {
            history("/details");
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, [isLoggedIn])

    return (
        <>
            <div className="container mt-3 wrappers">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Login</h3>
                        <Form >

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3'>Create an account <span><NavLink to="/register">Sign Up</NavLink></span> </p>
                    </div>
                    <SignImg />
                </section>
                <ToastContainer />
            </div>
        </>
    )
}

export default Login