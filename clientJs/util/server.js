var BaseURL = "/api/";

const serverCall = {
	fetch:function(url,successFunction){
		this.connect('GET',url,'',successFunction);
	},
	connect:function (reqType,reqURL,reqdata,successFunction,contentType)
	{
		try
		{
			var body = JSON.stringify(reqdata);
			var type = contentType;
			if(!contentType)
			{
					type = "application/json";
			}

			makeServerCall(reqType,BaseURL+reqURL,body,successFunction,successFunction,type);
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
			error						: function (jqXHR, exception) {
													if (jqXHR.status === 429) {
														window.location.replace("/tooManyReqs");
													}else{
														errorFunction();
													}

												},

		});
}
export default serverCall
