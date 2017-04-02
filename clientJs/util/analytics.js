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
  }
}

export default SA
