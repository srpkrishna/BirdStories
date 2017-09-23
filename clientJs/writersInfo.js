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

    var backHomeClass = "home"
    if(this.props.location.query && this.props.location.query.app){
        backHomeClass = "home hide";
    }

    return (
      <div className="writersInfo">
        <p>మీలో ప్రతిభకి వెలుగు చూపే మార్గం కోసం ఇక వేచి చూడాల్సిన అవసరం లేదు. నేడే మీ రచనలను మాకు ఈ-మెయిల్ ద్వారా <span className = "highlight">storyboard@sukatha.com</span> కి పంపండి. శ్రద్ధగా ఎంపిక చేయబడిన ఎన్నో అద్భుతమైన కథల మధ్య మీ రచనకు కూడా చోటు కల్పించండి. మీలోని రచయితని ప్రోత్సహించటానికి సుకథ ఎపుడూ సిద్ధంగా ఉంటుంది. మేము లఘు కథలు (short stories)తో పాటు సిరీస్ (సీరియల్స్, నవలలు, పెద్ద కథలు) కూడా స్వీకరిస్తాము.</p>
        <div className="header">ప్రచురణకి సంబంధించిన మరిన్ని వివరాలు:</div>
        <ul>
          <li>ఇప్పటికే వేరే వెబ్సైట్లలో (online) ప్రచురింపబడిన రచనలను మేము అంగీకరించట్లేదు. కేవలం కొత్త కథలను మరియు ప్రింట్ మీడియాలో (offline) మాత్రమే ప్రచురింపబడిన కథలు పంపగలరు.</li>
          <li>కొత్త రచనను పంపుతున్నట్లు అయితే అది ఇంతవరకు ఎక్కడా ప్రచురింపబడలేదని వ్రాత పూర్వక హామీ ఇవ్వవలెను. ఇది వరకు ప్రింట్ మీడియాలో (offline) ప్రచురింపబడితే ఎక్కడ, ఎప్పుడు ప్రచురింపబడినదో తెలుపవలసి ఉంటుంది.</li>
          <li>మీ రచన ఎంపిక వివరాలను లఘు కథ (short story) అయితే <span className = "highlight">2 వారాల </span> లోపు, సిరీస్ (పెద్దకథ/సీరియల్/నవల) అయినట్లయితే <span className = "highlight">4 వారాల  </span> లోపు తెలియపరుస్తాము. ఎంపిక అయిన 1 నెల లోపు మీ రచన ప్రచురింపబడుతుంది. </li>
          <li>మీ రచన ప్రచురణకి ఎంపిక అయితే దానికి తగిన నగదు పారితోషకం ఉంటుంది. పూర్తి వివరాలు మీకు ఈ-మెయిల్ లో పంపుతాము.</li>
          <li>మీ కథలను <span className = "highlight">MS Word, PDF </span> ఫార్మాట్ లోనే పంపవలసి ఉంటుంది. మీకు ఇలా పంపటంలో ఏ మాత్రం ఇబ్బంది ఉన్నా మమ్మల్ని కాల్/ఈ-మెయిల్ ద్వారా సంప్రదించగలరు. మేము మీకు సహాయపడగలము. మా ఈ-మెయిల్ id మరియు ఫోన్ నెంబర్ కింద ఇవ్వబడింది.</li>
          <li>లఘు కథలు సుమారుగా <span className = "highlight"> 1500 పదాలు </span> మించకుండా ఉండాలి. సిరీస్ నిడివి (length) యొక్క వివరాలు ఈ క్రింది సెక్షన్లో ఉన్నాయి.</li>
        </ul>
        <div className="header">ప్రత్యేకంగా వెబ్ సిరీస్ కు సంబంధించిన మరిన్ని వివరాలు:</div>
        <ul>
          <li>మీ పూర్తి కథను మాకు ముందే పంపవలసి ఉంటుంది.</li>
          <li>ప్రతి ఎపిసోడ్ <span className = "highlight"> 1000 </span> పదాలకు తగ్గకుండా ఉండాలిి.</li>
          <li>మీ కథ కనీసం <span className = "highlight">3 ఎపిసోడ్లు </span> కలిగి ఉండాలి.</li>
          <li>మీ కథ ఎంపిక గురించిన వివరాలు <span className = "highlight">4 వారాల</span>  లోపు తెలియజేస్తాము.</li>
          <li>మీ కథ మరెక్కడా ప్రచురింపబడలేదు అని, <span className = "highlight">{window.getString("companyPromo")}</span> లో ప్రచురించబడ్డ కథలు మారెక్కడా ప్రచురణకు పంపమని కూడా వ్రాత పూర్వకంగా ధృవీకరించండి.</li>
        </ul>
        <div className ="footer">మీకు ఇంకా ఏమైనా ప్రశ్నలు/సందేహాలు ఉన్నట్లయితే <span className = "highlight">storyboard@sukatha.com</span>కి ఈమెయిలు చేయగలరు లేదా  <span className = "highlight">+91-9902431300</span> కి కాల్ చేయగలరు</div>
        <div className={backHomeClass}> <Link to="/">← Home</Link> </div>
      </div>
    );
  }
}

export default WritersInfo;
