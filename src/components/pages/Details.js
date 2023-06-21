import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import useGAAnalytics from '../../hooks/useGAAnalytics'
import { Mixpanel } from '../../hooks/useMixpanel'
import { list } from '../../constants/productList'
import { SecondaryHeader } from '../jumbotron'

const Details = () => {

    const [logindata, setLoginData] = useState([]);
    const history = useNavigate();
    const { gtag } = useGAAnalytics();

    useEffect(() => {
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
        document.body.classList.add('sticky-header');
        getUserDetails();
    }, [])

    const openTab = (content) => {
        window.open(content?.link, "_blank");
        gtag('interaction', {
            button_title: 'More Info',
            name: content?.name,
            action: content?.link,
            event_type: 'click',
        });

        //mixpanel
        Mixpanel.track('Interaction', {
            button_title: 'More Info',
            name: content?.name,
            action: content?.link,
            event_type: 'click',
        });
    }

    return (
        <>
            <SecondaryHeader />
            <div className='container-wrapper'>
                {
                    logindata.length === 0 ? "No Data Found" :
                        <>
                            <h2>{`About Analytics Tools`}</h2>
                            <div class="wrapper">
                                <div class="">
                                    <div class="row g-1">
                                        {list.map(content => (

                                            // <li>
                                            //     <div className="product">
                                            //         <div className="product-image">
                                            //             <img src={content.image} />
                                            //         </div>
                                            //         <div className="product-imformation">
                                            //             <h4>{content.name}</h4>
                                            //             <div className="specification">
                                            //                 <span>{content.ram} RAM</span>
                                            //                 <small className="line"></small>
                                            //                 <span>{content.ssd} SSD</span>
                                            //             </div>
                                            //             <span>${content.price}</span>
                                            //         </div>
                                            //     </div>
                                            // </li>
                                            <div className="col-md-3">
                                                <div className="card p-3">
                                                    <div className="text-center logo-image"> <img src={content?.image} width="200" /> </div>
                                                    <div className="product-details">
                                                        <h4>{content?.name}</h4>
                                                        <span className="font-weight-bold description-card">{content?.description}</span>
                                                        <div className="buttons d-flex flex-row">
                                                            <button onClick={() => openTab(content)} className="btn btn-success cart-button btn-block">
                                                                More Info
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                        }

                                    </div>
                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default Details






















