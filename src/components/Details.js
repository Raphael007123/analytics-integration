import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import useGAAnalytics from '../hooks/useGAAnalytics'
import { Mixpanel } from '../hooks/useMixpanel'

const Details = () => {

    const [logindata, setLoginData] = useState([]);


    const history = useNavigate();

    const [show, setShow] = useState(false);

    var todayDate = new Date().toISOString().slice(0, 10);
    const { gtag } = useGAAnalytics();


    useEffect(()=>{
      gtag('page_view', {
        page_title: 'Home',
        page_location: window.location.href
      });

      //mixpanel
      Mixpanel.track('Page View', { 
        page_title: 'Home',
        page_location: window.location.href 
    });
  }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const Birthday = () => {
        const getuser = localStorage.getItem("user_login");
        if (getuser && getuser.length) {
            const user = JSON.parse(getuser);
         
            setLoginData(user);


            const userbirth = logindata.map((el, k) => {
                return el.date === todayDate
            });

            if (userbirth) {
                setTimeout(() => {
                    handleShow();
                }, 3000)
            }
        } else {
            history("/login");
        }
    }

    const userlogout = ()=>{
        localStorage.removeItem("user_login")
        history("/login");
    }

    useEffect(() => {
        Birthday();
    }, [])

    return (
        <div className='wrapper-details'>
            {
                logindata.length === 0 ? "errror" :
                    <>
                        <h1>{`Welocome, ${logindata[0].name}`}</h1>
                        <Button onClick={userlogout}>Logout</Button>

                {/* {
                    logindata[0].date === todayDate ? 
                    <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{logindata[0].name} 😄</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Wish you many many happy returns of the day ! 🍰</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>:""
                }    */}
                     
                    </>
            }
        </div>
    )
}

export default Details






















