//useAnalytics consists of analytics util functions
const useGAAnalytics = () => {

    //send events to google analytics
    const gtag = (eventName, args) => {
        if(!process.env.REACT_APP_LOAD_GA_SCRIPT === 'true') return //check if REACT_APP_LOAD_GA_SCRIPT true check from env variables
        if (typeof window !== "undefined") {
          if (typeof window.gtag === "undefined") {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function gtag() {
              window.dataLayer.push(arguments);
            };
          }

          window.gtag('event',eventName, {...args}); //send events to google analytics
        }
    };

    return { gtag }
}

export default useGAAnalytics;