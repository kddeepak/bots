var slackBot = require('slackbots');
var axios = require('axios');

var bot = new slackBot({
    
    token : 'xoxb-376238464612-375919827937-4a54oM30fntWAGtIAU5uZ1cH',
    name : 'jokebot'

});


//starting the bot

bot.on('start',()=>{

    var params ={
        icon_emoji :':smiley:'
    };

    bot.postMessageToChannel('general','get updated with comp coding contests send -live to see running contests and -future to view upcoming contests',params);
});


//error

bot.on('error',(err)=>{

    console.log(err);
});

bot.on('message',(data)=>{

      if(data.type !=='message'){
          return;
      }  
      handleMessage(data.text);
});

function handleMessage(message){

    if(message.includes(' live')){
        trackContest();
    }
    else if(message.includes(' future')){

        trackContestFuture();
    }
};

function trackContest(){

    axios.get('https://contesttrackerapi.herokuapp.com/').then((res) =>{//in case of single parameter no need to use brackets
        var live  = res.data.result.ongoing;
        var params ={
            icon_emoji :':laughing:'
        };
       // console.log(joke);
        for(var i=0;i<live.length;i++){
        bot.postMessageToChannel('general',`${live[i].Name} ${live[i].url}`,params);
        }
    });
};

function trackContestFuture(){

    axios.get('https://contesttrackerapi.herokuapp.com/').then(res =>{//in case of single parameter no need to use brackets
        var futureContest  = res.data.result.upcoming;
        var params ={
            icon_emoji :':book:'
        };
       console.log(futureContest);
        for(var i=0;i<futureContest.length;i++){
        bot.postMessageToChannel('general',`${futureContest[i].Name} ${futureContest[i].url}`,params);
        }
    });
};