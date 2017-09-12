import React, { Component } from 'react';
import Styles from './css/contact.css';
import SA from './util/analytics';

class Contact extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
    document.title = window.getString("contactUs") + " -"+window.getString("companyPromo");
    SA.sendPageView('contactUs');
    window.onbeforeunload = () => {
        SA.sendEvent('ContactUs','close','contactUs');
      }
  }

  componentWillUnmount(){
    SA.sendEvent('ContactUs','close','contactUs');
    window.onbeforeunload = undefined;
  }

  render() {
    return (
      <div className="contact">
      <div className="pageHeader">{window.getString("contactUs")}</div>
      <div className="block idea">
        {window.getString("contactIntro")}
      </div>
      <div className="block">
        <div className="header">{window.getString("contactWriter")}</div>
        <p>{window.getString("contactWriterInfo")}</p>
      </div>
      <div className="block">
        <div className="header">{window.getString("contactMarketing")}</div>
        <p>{window.getString("contactMarketingInfo")}</p>
      </div>
      <div className="block">
        <div className="header">{window.getString("contactSupport")}</div>
        <p>{window.getString("contactSupportInfo")}</p>
      </div>
      </div>
    );
  }
}

export default Contact;
