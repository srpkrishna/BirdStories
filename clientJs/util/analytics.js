import Server from './server';

const SA = {
  sendPageView:function(title,appendToPath,category){
    ga('set','title', title);

    var path = location.pathname
    if(appendToPath){
      path = path +"="+ appendToPath.replace(" ","_")
    }
    ga('send', 'pageview',path);

    var content_category = title;
    if(category){
      content_category = category;
    }

    var id = window.location.search;
    fbq('track', 'PageView');
    fbq('track', 'ViewContent', {
      content_name: title,
      content_category: content_category,
      content_ids: [id]
     });

  },
  setUserId:function(user){
    Server.connect('POST','user',user,function(data){
        if(!data.code){
            ga('set','userId',data.id)
            fbq('init', '1936911573209430',{em:user.email});
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
      ga('set','userId',clientUID);
    }
  },
  sendEvent:function(eventId,eventType,eventFor,value){

    if(value){
      ga('send', 'event', eventId, eventType, eventFor,value);
      fbq('trackCustom', eventId, {
        eventType: eventType,
        eventFor: eventFor,
        value:value
      });
    }else{
      ga('send', 'event', eventId, eventType, eventFor);
      fbq('trackCustom', eventId, {
        eventType: eventType,
        eventFor: eventFor
      });
    }


  }

}

export default SA
