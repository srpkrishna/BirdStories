import React, { Component } from 'react';
import SA from './util/analytics';
import Styles from './css/competition.css';
import { Link } from 'react-router';

class Competition extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
    document.title = window.getString("Competition") + " - "+window.getString("companyPromo");
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

    const link = "/stories/story"
    const query1 = {t:'1498649778000',a:'rammohan',n:'dongadebba'}
    const linkObj1 = {
        pathname:link,
        query:query1
    }

    const query2 = {t:'1498649418000',a:'satyavathi',n:'mayaungaram'}
    const linkObj2 = {
        pathname:link,
        query:query2
    }

    const query3 = {t:'1498649066000',a:'luckysri',n:'samidha'}
    const linkObj3 = {
        pathname:link,
        query:query3
    }

    return (
      <div className="competition">
        <div className="pageHeader">
          <div className="topLeftTitle">సు’కథ’ నిర్వహణలో..</div>
          <div className="topRightTitle">కథల పోటీ..</div>
          <div className="mainTitle">పాత్రకి జీవం పోయండి </div>
        </div>
        <div className="addressInfo">మా ఈ నూతన ప్రయోగాన్ని విజయవంతం చేసిన రచయితలకి మనఃపూర్వక ధన్యవాదాలు మరియు విజేతలకు మా అభినందనలు.</div>

        <ul className="characters">
          <li className="character">
            <div className="storyName award">మొదటి బహుమతి</div>
            <div className="storyDetails">
              <Link to={linkObj1} className="authorClick">
                <div className="storyName">దొంగ దెబ్బ</div>
                <img className="coverImage" src="https://s3.ap-south-1.amazonaws.com/bsstory/rammohan/dongadebba/cover.jpg" />
              </Link>
              <div className="authorInfo">
                <img src="https://s3.ap-south-1.amazonaws.com/bsstory/rammohan/profile.jpg" className="winnerPhoto"/>
                <div className="authorDetails">
                  <div>Koilada Rammohan Rao</div>
                  <div>Prize money ₹15,000</div>
                  <Link to="/author/rammohan"><div className="authorClick">About author</div></Link>
                </div>
              </div>
            </div>
          </li>
          <li className="character">
            <div className="storyName award">రెండవ బహుమతి</div>
            <div className="storyDetails">
              <Link to={linkObj2} className="authorClick">
                <div className="storyName">ముత్యాల రాజు  - మాయా ఉంగరం</div>
                <img className="coverImage" src="https://s3.ap-south-1.amazonaws.com/bsstory/satyavathi/mayaungaram/cover.jpg"/>
              </Link>
              <div className="authorInfo">
                <img src="https://s3.ap-south-1.amazonaws.com/bsstory/satyavathi/profile.jpg" className="winnerPhoto"/>
                <div className="authorDetails">
                  <div>Satyavathi Dinavahi</div>
                  <div>Prize money ₹7,000</div>
                  <Link to="/author/satyavathi"><div className="authorClick">About author</div></Link>
                </div>
              </div>
            </div>
          </li>
          <li className="character">
            <div className="storyName award">మూడవ బహుమతి</div>

            <div className="storyDetails">
              <Link to={linkObj3} className="authorClick">
                <div className="storyName">సమిధ</div>
                <img className="coverImage" src="https://s3.ap-south-1.amazonaws.com/bsstory/luckysri/samidha/cover.jpg"/>
              </Link>
              <div className="authorInfo">
                <img src="https://s3.ap-south-1.amazonaws.com/bsstory/luckysri/profile.jpg" className="winnerPhoto"/>
                <div className="authorDetails">
                  <div>Srinivasa Raju Uppalapati</div>
                  <div>Prize money ₹3,000</div>
                  <Link to="/author/luckysri"><div className="authorClick">About author</div></Link>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div className="home"> <Link to="/">← Home</Link> </div>
      </div>
    );
  }
}

export default Competition;
