var formProcessor = (function(){

  "use strict";

  var constraints = {
      name: {
          presence: true,
          length: {
              minimum: 2,
              maximum: 30,
              message: "must be longer."
            }
        },
      email: {
        presence: true,
        email: true,
      },
      subject: {
        presence: true,
        length: {
          minimum: 1,
            message: "must be selected."
          }
      },
      message: {
        presence: true,
          length: {
               minimum: 10,
               maxumum: 4000,
               message: "must be longer."
            }
      },
      robot: {
        presence: {
        	allowEmpty: true
        },
        length: {
            is: 0,
            message: "must be filled out."
        }
      }
  };

  function formAlert(text) {
      document.getElementById("responsemsg").innerHTML = "<br><p><em>" + text + "</em></p>";
    };
  function responseAlert(text) {
     document.getElementById("serverresponse").innerHTML = "<br><p><em>" + text + "</em></p>";
  };

  function sendData(data, url) {
    formAlert("One second...");
    var postURL = (url || "https://api.your-blog.com/v1/contact");
    var http = new XMLHttpRequest();
    http.open("POST", postURL, true);
    http.setRequestHeader("Content-Type", "application/json");
    data.source_url = window.location.href;
    http.send(JSON.stringify(data));
    http.onload = function() {
        formAlert("Thank you, your message has been sent!");
        if(url != undefined){
        	responseAlert("Only the demo should display the server response: " + http.responseText);
    	}
        document.getElementById("contact-form").reset();
    }
  };

  return ({
    process: function(url) {
        var attributes = {
        	name: document.forms["contact-form"]["name"].value,
        	email: document.forms["contact-form"]["email"].value,
        	subject: document.forms["contact-form"]["subject"].value,
        	message: document.forms["contact-form"]["message"].value,
        	robot: document.forms["contact-form"]["_norobots"].value
    	};
      	validate.async(attributes, constraints)
      	.then(function(success) {
        	//console.log("Success", success);
         	sendData(success, url);
      })
      .catch(function(error) {
      	//console.log("ValidationError", error);
        formAlert(Object.values(error)[0][0]);
      })  
    }
  });

}());
