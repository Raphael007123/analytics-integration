import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useGAAnalytics from '../../hooks/useGAAnalytics';
import { Mixpanel } from '../../hooks/useMixpanel';

const Error = () => {

  const { gtag } = useGAAnalytics();

  const history = useNavigate();

  useEffect(() => {
    document.body.classList.remove('sticky-header');

    gtag('page_view', {
      page_title: '404',
      page_location: window.location.href
    });

    //mixpanel
    Mixpanel.track('Page View', {
      page_title: '404',
      page_location: window.location.href
    });
  }, [])

  return (
    <>
      <div className='container wrappers'>
        <div className="error d-flex flex-column justify-content-lg-center align-items-center">
          {/* <img src="./404.png" alt="error" className='errorimg' /> */}
          <h4>404 Error ! Page Not Found 😭</h4>
          <button className='btn btn-primary' onClick={() => history("/")}>Redirect Login Page</button>
        </div>

      </div>
    </>
  )
}

export default Error