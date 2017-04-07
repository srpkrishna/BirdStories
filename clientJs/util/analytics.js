import Server from './server';

const SA = {
  sendPageView:function(title,appendToPath){
    ga('set','title', title);

    var path = location.pathname
    if(appendToPath){
      path = path +"="+ appendToPath.replace(" ","_")
    }
    ga('send', 'pageview',path);
  },
  setUserId:function(user){
    Server.connect('POST','user',user,function(data){
        if(!data.code){
            ga('set','userId',data.id)
        }
    });
  },
  setClientId:function(){
    if (typeof(Storage) !== "undefined") {
      var clientUID = localStorage.clientUID
      if(!clientUID){
        clientUID = "client"+Math.floor(Math.random() * 8999999999 + 1000000000)
        localStorage.setItem("clientUID", clientUID);
      }
      ga('set','userId',clientUID)
    }
  },
  sendEvent:function(eventId,eventType,eventFor){
    ga('send', 'event', eventId, eventType, eventFor);
  }

}

export default SA
