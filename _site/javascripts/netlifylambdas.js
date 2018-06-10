/*
_____________________________
DUAS @mericas GROUP 
____________________________

 Version: 0.1
  Author: Aslan Varoqua
 Website: http://duasamericasgroup.com
    Docs: http://DUASmaeircasgroup.com
    Repo: http://github.com/aslanvaroqua/duasamericasgroup
  Issues: http://github.com/kenwheeler/duasamericasgroup/issues
 Address: 444 17th St Denver,5th Floor Suite 7, Colorado 80202 
  Email:ceo@duasamericasgroup.com
 */
var protocol = "https";
var base = "cosmicjs-lambda-microservices";
var functionsFolder  = "cosmicjs-lambda-microservices";
var url = `${protocol}://${base}/.netlify/${functionsFolder}/${id}`;

var i = 0;

function log(s) {
    console.log(s);
    // $('#log').val($('#log').val() + '\n' + (++i) + ': ' + s);
}


function netlify(id) {
  $.ajax({
    url: url,
    success: function(data) {
      log('in success callback');
      log('received data: ' + data);
      //enable the button
      $(`#${id}`).text(data);
    },
  });
}

log('after ajax call');

$(document).ready(function() {
    log('document ready');
    
    var lambdas = ["corporate_title"];
        for (i = 0; i < lambdas.length; i++) {
            netlify(lambdas[i])
        }

    setTimeout(function() {
    
        log('timeout');
    }, 1000);
});

