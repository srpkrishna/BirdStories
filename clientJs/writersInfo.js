import React, { Component } from 'react';
import Styles from './css/writersInfo.css';
import { Link } from 'react-router';
import SA from './util/analytics';

class WritersInfo extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
    document.title = window.getString("WritersInfo") + " -"+window.getString("companyPromo");
    SA.sendPageView('writersInfo');

    window.onbeforeunload = () => {
        SA.sendEvent('WritersInfo','close','writersInfo');
      }
  }

  componentWillUnmount(){
    SA.sendEvent('WritersInfo','close','writersInfo');
    window.onbeforeunload = undefined;
  }

  render() {
    return (
      <div className="writersInfo">
        <p>మీ కథలను పంపిస్తూ మమ్మల్ని ప్రోత్సహిస్తున్న రచయితలందరికీ సుకథ మనఃపూర్వక ధన్యవాదాలు. మీతో మా అనుబంధాన్ని మరింత ముందుకు తీసుకెళ్లే దిశగా మేము ‘వెబ్ సిరీస్’ ప్రారంభిస్తున్నాము. మీ దగ్గర ఉన్న పెద్ద కథలను, ఉపకథలు(ఎపిసోడ్)గా ప్రచురించే కార్యాచరణ ఇది.</p>

        <div className="header">‘వెబ్ సిరీస్’ యొక్క మార్గదర్శకాలు:</div>
        <ul>
          <li>మీ పూర్తి కథను మాకు ముందే పంపవలసి ఉంటుంది.</li>
          <li>ప్రతి ఎపిసోడ్ <span className = "highlight"> 800-1000 </span> పదాల మధ్య ఉండాలి.</li>
          <li>ఎపిసోడ్ కి <span className = "highlight"> ₹300 </span>చొప్పున చెల్లించడం జరుగుతుంది.</li>
          <li>మీ కథ కనీసం <span className = "highlight">3 ఎపిసోడ్లు </span> కలిగి ఉండాలి.</li>
          <li>మీ కథ ఎంపిక గురించిన వివరాలు <span className = "highlight">3 వారాల</span>  లోపు తెలియజేస్తాము.</li>
          <li>మీ కథ మరెక్కడా ప్రచురింపబడలేదు అని, <span className = "highlight">{window.getString("companyPromo")}</span> లో ప్రచురించబడ్డ కథలు మారెక్కడా ప్రచురణకు పంపమని కూడా వ్రాత పూర్వకంగా ధృవీకరించండి.</li>
        </ul>
        <div className ="footer">మీ ప్రశ్నలు/సందేహాలతో సంప్రదించవలసిన చిరునామా <span className = "highlight">storyboard@sukatha.com</span></div>
        <div className="home"> <Link to="/">← Home</Link> </div>
      </div>
    );
  }
}

export default WritersInfo;
