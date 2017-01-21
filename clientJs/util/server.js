var server={requestURL:"", reqType:"",reqdata:"",callBackSuccess:""};
var BaseURL = "/api/";
var errorMessage = "internal_error";

function servercall_success(msg)
{
	try{

		server.callBackSuccess(msg);

	}catch(e){

	}
};

function servercall_error(msg)
{
		var data;
		if(404 === msg.status){
			server.callBackSuccess(data,"matches_not_found");
		}else if(408 === msg.status || 200 > msg.status || 3 === msg.code){
			server.callBackSuccess(data,"network_failed");
		}else if(401 === msg.status){
			server.callBackSuccess(data,"invalid_session");
		}else{
			server.callBackSuccess(data,errorMessage);
		}

};

const serverCall = {
	fetch:function(url,successFunction){
		this.connect('GET',url,'',successFunction);
	},
	connect:function (reqType,reqURL,reqdata,successFunction,contentType)
	{
		try
		{
			var body = JSON.stringify(reqdata);
			server.reqType = reqType;
			server.reqdata = body;
			server.callBackSuccess = successFunction;
			server.requestURL = reqURL;

			var type = contentType;
			if(!contentType)
			{
					type = "application/json";
			}

			makeServerCall(reqType,BaseURL+reqURL,body,servercall_success,servercall_error,type);
		}
		catch (e)
		{
			if (e instanceof TypeError)
			{
				alert("Type Error encountered. The description is " + e.message);
			}
			else if (e instanceof SyntaxError)
			{
				alert("Syntax Error encountered. The description is " + e.message);
			}
			else
			{
				alert("Error encountered. The description is " + e.message);
			}
		}
	}

};

function makeServerCall(reqType,serviceUrl,reqdata,successFunction,errorFunction,contentType)
{


		$.ajax({
			// beforeSend			:  function (xhr){
			// 											xhr.setRequestHeader('authorization', '');
			// 											xhr.setRequestHeader('access-control-allow-origin','*');
			// 									},
			cache						: false,
			complete				: function (xhr) {},
			type            : reqType, //GET or POST or PUT or DELETE verb
			url             : serviceUrl, // Location of the service
			data            : reqdata, //Data sent to server
			contentType     : contentType, // content type sent to server
			processdata     : false, //True or False
			timeout			    : 60000,
			xhrFields       : {withCredentials: true},
			success         : successFunction,
			error						: errorFunction,

		});
}
export default serverCall
