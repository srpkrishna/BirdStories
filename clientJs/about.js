import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div className="about">
        <p>Theres always room for a story that can transport people to another place.” ― J.K. Rowling</p>
        <p>“If history were taught in the form of stories, it would never be forgotten.” - Rudyard Kipling</p>
        <p>“You become writer by writing. It is a yoga.” ― R.K. Narayan</p>
        <p>"Once Upon a time, there lived a king....." Did that take you down the
            memory lane to the golden days of your life where you forgot yourself
            in the lap of your grandparents? If yes, Bingo! That’s what we do.
            We firmly believe in the philosophy of storytelling and what can be a
            better medium than native language for telling effective stories!
            This thought was the driving force behind the inception of  “SuKatha”.</p>

        <div className="block">
          <div className="header">Our Vision</div>
          <p>We want to be the one-stop-destination for native creative content of
              highest quality and diversity. Building sustainable interest in native
              language in the era of massive globalization while providing a global
              stage for creative talent is our motto!</p>
        </div>
        <div className="block">
          <div className="header">Who are we?</div>
          <p>We are an online platform to connect talented and passionate writers
              with ardent readers across the world. We encourage all types of
              creative works in the form of short stories, poems, lyrics, Arts,
              cartoons, captivating articles, and many more. After all, every art
              form tells a story!</p>
        </div>
        <div className="block">
          <div className="header">What do we do?</div>
          <p>We deeply believe in the fact that a win-win relationship is the only
              sustainable mode of engagement with our writers/readers. This motivates
              us to strive for the betterment of our partners. Apart from bridging
              the gap between readers and writers by creating greater visibility,
              we help our writers enhance the quality of their work through various
              means, giving our readers the best possible experience in the process.</p>
        </div>
      </div>
    );
  }
}

export default About;
