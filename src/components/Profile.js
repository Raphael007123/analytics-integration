import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useGAAnalytics from '../hooks/useGAAnalytics';
import { Mixpanel } from '../hooks/useMixpanel';

const Profile = () => {
    const [logindata, setLoginData] = useState([]);
    const history = useNavigate();
    const { gtag } = useGAAnalytics();

    const getData = () => {
        const getuser = localStorage.getItem("user_login");
        if (getuser && getuser.length) {
            const user = JSON.parse(getuser);
            setLoginData(user?.[0]);
        } else {
            history("/login");
        }
    }
    

    useEffect(()=>{
        getData();
    },[])

    useEffect(()=>{
        gtag('page_view', {
          page_title: 'Profile',
          page_location: window.location.href
        });

        //mixpanel
        Mixpanel.track('Page View', { 
            page_title: 'Profile',
            page_location: window.location.href 
        });
    }, [])

    return (
        <section className="bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mb-4 mb-sm-5">
                        <div className="card card-style1 border-0">
                            <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                <div className="row align-items-center">
                                    <div className="col-lg-6 mb-4 mb-lg-0">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="..." />
                                    </div>
                                    <div className="col-lg-6 px-xl-10">
                                        <div className="d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                            <h3 className="h2 text-black font-weight-600">{logindata.name}</h3>
                                        </div>
                                        <ul className="list-unstyled mb-1-9">
                                            <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Date of Birth:</span> {logindata?.date}</li>
                                            <li className="mb-2 mb-xl-3 display-28"><span className="display-26 text-secondary me-2 font-weight-600">Email:</span> {logindata?.email}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 mb-4 mb-sm-5">
                        <div>
                            <span className="section-title text-primary mb-3 mb-sm-4">About Me</span>
                            <p>Edith is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <p className="mb-0">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile;