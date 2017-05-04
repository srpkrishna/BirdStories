import React, { Component } from 'react';
import SA from './util/analytics';
import Styles from './css/competition.css';
import { Link } from 'react-router';

class Competition extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
    document.title = window.getString("Competition") + " -"+window.getString("companyPromo");
    SA.sendPageView('competition');

    window.onbeforeunload = () => {
        SA.sendEvent('Competition','close','competition');
      }
  }

  componentWillUnmount(){
    SA.sendEvent('Competition','close','competition');
    window.onbeforeunload = undefined;
  }


  render() {
    return (
      <div className="competition">
        <div className="pageHeader">
          <div className="topLeftTitle">సు’కథ’ నిర్వహణలో..</div>
          <div className="topRightTitle">కథల పోటీ..</div>
          <div className="mainTitle">పాత్రకి జీవం పోయండి </div>
          <ul className="prizes">
            <li className="prize">
              <div className="prizeTitle">మొదటి బహుమతి</div>
              <div className="prizeImage"></div>
              <div className="prizeRupees">₹15000/-</div>
            </li>
            <li className="prize">
              <div className="prizeTitle">రెండవ బహుమతి </div>
              <div className="prizeImage"></div>
              <div className="prizeRupees">₹7000/-</div>
            </li>
            <li className="prize">
              <div className="prizeTitle">మూడవ బహుమతి</div>
              <div className="prizeImage"></div>
              <div className="prizeRupees">₹3000/-</div>
            </li>
          </ul>
        </div>
        <div className="addressInfo">ఈ క్రింది 12 పాత్రల నుండి ఏవైనా కనీసం 2 పాత్రలను ప్రధాన పాత్రలుగా చిత్రీకరిస్తూ , 1500 పదాలు మించకుండా
          కథ రాసి <span className="highlight">storyboard@sukatha.comకి మే 21వ</span> తేదీ లోపు పంపండి.. మీ సృజనా శక్తికి తగిన గుర్తింపు పొందండి!
        </div>

        <ul className="characters">
          <li className="character">
           <span className="highlight">నన్ (Nun): </span>వయస్సు 22-26. జీసస్ మరియు చర్చి ఫాదర్ ని అమితంగా ప్రేమిస్తుంది. కాని
           నన్ (Nun) గా ఉండటం ఆమెకి ఇష్టం లేదు. ప్రపంచం చూడాలని, తనకి నచ్చినట్టు స్వేచ్ఛగా బ్రతకాలని
           ఆశ.తనను పెంచి పెద్ద చేసిన చర్చి ఫాదర్ కోరిక మేరకు ఇష్టం లేకపోయినా నన్ (Nun) గా జీవితం
           కొనసాగిస్తూ ఉంటుంది.
          </li>
          <li className="character">
           <span className="highlight">ఉంగరం(Ring): </span> ఒక మాయా ఉంగరం. కోరుకున్నది ఇస్తుంది. కానీ ఇచ్చిన ప్రతి దానికి బదులుగా మన దగ్గర్నించి ఏదో ఒకటి తీసుకుంటుంది.
          </li>
          <li className="character">
           <span className="highlight">సరిహద్దులో ఒక హోటల్ యజమాని: </span>భారతదేశ సరిహద్దులో ఒక చిన్న హోటల్ యజమాని. ముస్లిం
            మతస్థుడు. యుద్ధం కారణంగా హోటల్ ఎక్కడ కూలిపోతుందో అని భయపడుతూ ఉంటాడు.
          </li>
          <li className="character">
           <span className="highlight">జీవితంలో ఏదో లోపించింది అనుకునే ఒక అమ్మాయి: </span>వయసు 25. తనపై తనకు నమ్మకం ఎక్కువ. తెలివి, ధైర్యం ఉన్న అమ్మాయి.
            కాని తన ఇష్టాయిష్టాలకు అతీతంగా, ఇతరులు చెప్పింది చేయకుండా ఉండటానికి మాత్రమె ప్రాధాన్యత ఇస్తూ ఉంటుంది.
            అలా చేస్తూ ఉండటం వలన, తనకు నచ్చినట్టే చేస్తున్నా కూడా జీవితంలో ఏదో తెలియని వెలితి ఉంటుంది.
          </li>
          <li className="character">
           <span className="highlight">యువరాజు: </span>రాజుకి ఒక్కగానొక్క కొడుకు.
           ఇంకో ఏడాది లో రాజు కావాల్సిన వాడు. మిగతా అన్ని విద్యలలో ఆరితెరినా కూడా తనకి చేతి బొటన వేలు లేని కారణంగా యుద్ధ విద్యలు నేర్చుకోలేకపోతాడు.
           ఆ కారణం చేత తను సింహాసనాన్ని అధిష్టించటానికి అనర్హుడని తన నమ్మకం.
          </li>
          <li className="character">
           <span className="highlight">ఖైది: </span>20-32 సంవత్సరాల మధ్యలో ఉండే అతి ముఖ్యమైన యవ్వన దశ మొత్తం జైలులో గడిపిన 32 ఏళ్ళ యువకుడు. ఎంతో జాలి గుణం కలవాడు. ఒక మెకానిక్
            షెడ్ లో పనిచేస్తూ, సమాజం తనపై చూపించే వివక్షని సానుకూల దృక్పథంతో ఎదుర్కొంటూ, పోగొట్టుకున్న తన కుటుంబాన్ని తలచుకుంటూ జీవిస్తూ ఉంటాడు.
          </li>
          <li className="character">
           <span className="highlight">రాజకీయ నాయకుడు: </span>లంచగొండి. కానీ బుర్ర తక్కువ వాడు. తన అబద్ధాలు పలు మార్లు
            బహిరంగంగానే తేటతెల్లం అయినా కూడా తన పధ్ధతిలోనే అవివేకంగా ఉంటూ ఉంటాడు.
          </li>
          <li className="character">
           <span className="highlight">ఇద్దరు పిల్లలున్న ఒక గృహిణి: </span>తన స్నేహితులతో కలిసి ఒక బిజినెస్ లో డబ్బులు పెట్టుబడి పెట్టు అంత పోగొట్టుకుని కష్టాలలో పడుతుంది.
          </li>
          <li className="character">
           <span className="highlight">స్కూల్ విద్యార్ధి: </span>తోటి విద్యార్థుల కన్నా చాలా తెలివైన వాడు/అమ్మాయి. ఎపుడూ ఏదో కొత్త విషయం తెలుసుకోవాలన్న ఆసక్తి.
          </li>
          <li className="character">
           <span className="highlight">మిలిటరీ ఆఫీసర్: </span>32 ఏళ్ళు. ఇంకా పెళ్లి కాలేదు.
            సైన్యం లో ఫస్ట్ లెఫ్టనెంట్. కండబలం, బుద్ధిబలం, దూకుడు ఉన్న వ్యక్తి. ఆడవాళ్లన్నా, పాకిస్తాన్ అన్నా ద్వేషం. పిల్లలు, ప్రకృతి, పల్లెటూరు అంటే మహా ఇష్టం.
          </li>
          <li className="character">
           <span className="highlight">M.B.B.S విద్యార్ధి: </span>తెలివితేటలు, పట్టుదల, డాక్టర్ అయ్యి వీలైనంతమంది ప్రాణాలు కాపాడాలి అన్న
             ఆశయం ఉన్న అబ్బాయి/అమ్మాయి. కాని అకస్మాత్తుగా తనకు ఒక సమస్య ఉన్నట్టు తెలుస్తుంది.
             అదే రక్తం చుస్తే వెంటనే కళ్ళు తిరిగి పడిపోవటం.
          </li>
          <li className="character">
           <span className="highlight">రైతు: </span>పేదవాడు. కానీ తెలివైన వాడు. తాతల కాలం నుండి చేస్తున్న వృత్తి కనుక వ్యవసాయం చేస్తూ ఉంటాడు.
           కానీ అకాల వర్షాలు, స్వార్థపూరిత వ్యవస్థ వలన చాలా ఎదురుదెబ్బలు తింటాడు. పన్నులు కట్టలేక పరిష్కారం కోసం చూస్తూ ఉంటాడు.
          </li>
        </ul>

        <ul className="ps">
          <li><span className="highlight">గమనిక: </span>ఒక రచయిత ఒకటి కన్నా ఎక్కువ కథలు పంపవచ్చు. గెలిచిన కథలుతో పాటు బాగున్న ప్రతి కథ ‘సుకథ’ లో ప్రచురించబడుతుంది. సాధారణ ప్రచురణకి ఎంపికైన ప్రతి కథకి ₹500/- పారితోషకం ఇవ్వబడును.</li>
        </ul>

        <ul className="finalWords">
          <li><span className="highlight">గడువు తేది: </span>May 21, 2017</li>
          <li><span className="highlight">మరిన్ని వివరాలకు: </span>+91-9902431300</li>
          <li><span className="highlight">మెయిల్ చిరునామా: </span>storyboard@sukatha.com</li>
        </ul>

        <div className="home"> <Link to="/">← Home</Link> </div>
      </div>
    );
  }
}

export default Competition;
