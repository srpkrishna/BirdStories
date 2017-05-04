'use strict';

function BlockedStore(){

  var hackedIps = [];

  this.addIp = function(ip){

    if(hackedIps.indexOf(ip) < 0 ){
      hackedIps.push(ip)
    }
    setInterval(this.removeIp, 1000*60*60*24*2);
  }

  this.shouldBlockIp = function(ip){
    if(hackedIps.indexOf(ip) > -1){
      return true;
    }else{
      return false;
    }

  }

  this.print = function(){
    console.log("blocked ips so far ==");
    console.log(hackedIps);
  }

  this.removeIp =  function(){
    hackedIps.shift();
  }

}

module.exports = BlockedStore;
