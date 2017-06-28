import React, { Component } from 'react';
import { Link } from 'react-router';
import SA from './util/analytics';


const policyStyle = {
  padding: "0.25em",
  letterSpacing: "0.02em",
  textIndent: "10%",
  lineHeight:" 1.25rem",
  textAlign:"left",
  color: "#dcdcdc"
}

const para = {
  padding: "1em"
}

class Policy extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = window.getString("policy") + " -"+window.getString("companyPromo");
    SA.sendPageView('policy');
    window.onbeforeunload = () => {
        SA.sendEvent('Policy','close','policy');
      }
  }

  render() {
    return (

      <div style={policyStyle}>
      <div className="pageHeader">{window.getString("policy")}</div>
      <p style={para}>We collect only the following information about you from your social profile.</p>
      <ul>
        <li>Name</li>
        <li>Email id</li>
        <li>Profile picture </li>
      </ul>
      <p style={para}>We may keep this information indefinitely. You can access this information (mentionedabove) by
      signing into your account. We do not share this personally identifiable information with any third
      party companies or advertising agencies/networks. We do not use cookies or unique device identifiers
      to get any identifiable or anonymous information about your activity, location or device. We take
      reasonable steps to secure your personally identifiable information against unauthorized access or
      disclosure.</p>

      <p style={para}>This privacy policy was last updated on 8-Jul- 2017. Our privacy policy may change from
      time to time. If we make any material changes to our policies, we will place a prominent notice on
      our website or application. If the change materially affects registered users, we will send a notice to
      you by email, push notification or text. If you have any questions or concerns about our policy,
      please contact us at storyboard@sukatha.com. </p>
      </div>
    );
  }
}

export default Policy;
