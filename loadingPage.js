//bumperAd scripts start

const isBumperAd = typeof BumperAd !== "undefined" ? true : false;
const isSdkNew = typeof GlanceAndroidInterface !== "undefined" ? true : false;

let bumperAdStatus = false;
let bumperCallback = false;
let isAdLoaded;

var isMRECEnabledOnLP = false;
try {
  isMRECEnabledOnLP = location.search.substring(1).split("&").find((a) => {return a.startsWith('LPMREC')}).split("=")[1];
} catch (error) {
  console.log("LoadingPage macro missing from URL - ",error); 
}

let isNormalGame = (isBumperAd == true && isMRECEnabledOnLP != 'true') ? false : true; //true means playing in browser

function sendCustomAnalyticsEvent(eventType, extras) {
  console.log("sendCustomAnalyticsEvent", eventType, extras);
  if (isSdkNew) {
    const data = JSON.stringify(extras);
    GlanceAndroidInterface.sendCustomAnalyticsEvent(eventType, data);
  }
}
function showBumperAd() {
  if(isMRECEnabledOnLP === 'true'){
    LPBannerInstance =  window?.GlanceGamingAdInterface?.showLoadingPageBannerAd(LPMercObj ,bannerCallbacks);
  } else {
    if (isBumperAd) {
      console.log("Bumper Ad...");
      isAdLoaded = BumperAd.isAdLoaded();
      sendCustomAnalyticsEvent("Game_loading_screen_start", {});
      isNormalGame = false;
      BumperAd.showAd();
    }
    else{
      LPBannerInstance =  window?.GlanceGamingAdInterface?.showLoadingPageBannerAd(LPMercObj ,bannerCallbacks);
    }
  }

}

function gameReady() {
  // console.log("gameReady",bumperCallback," ",bumperAdStatus, " ", BumperAd.isAdLoaded()) ;
  if (isBumperAd) {
    if ((bumperCallback && !bumperAdStatus) || !isAdLoaded) {
      $("#blankScreen").css("display", "block");
      sendCustomAnalyticsEvent("Game_loading_Screen_end", {});
      $("#gotoGame").trigger("click");
    }

    bumperAdStatus = true;
    BumperAd.gameReady();
    // setTimeout(function(){ }, 1500);
  }
}

function onBumperAdError() {
  bumperCallback = true;
  console.log("onBumperAdError");
  if (bumperAdStatus) {
    $("#blankScreen").css("display", "block");
    sendCustomAnalyticsEvent("Game_loading_Screen_end", {});
    $("#gotoGame").trigger("click");
  }
  // else {
  //     $("#blankScreen").css("display", 'block')
  // }
}

function onBumperAdSkipped() {
  bumperCallback = true;
  console.log("onBumperAdSkipped");
  if (bumperAdStatus) {
    $("#blankScreen").css("display", "block");
    sendCustomAnalyticsEvent("Game_loading_Screen_end", {});
    $("#gotoGame").trigger("click");
  }
  // else {
  //     $("#blankScreen").css("display", 'block')
  // }
}

function onBumperAdCompleted() {
  bumperCallback = true;
  console.log("onBumperAdCompleted");
  if (bumperAdStatus) {
    $("#blankScreen").css("display", "block");
    sendCustomAnalyticsEvent("Game_loading_Screen_end", {});
    $("#gotoGame").trigger("click");
  }
  // else {
  //     $("#blankScreen").css("display", 'block')
  // }
}

//bumperAd scripts end

//loader scripts start

//This function will add the loader UI
function addLoader() {
  timerForLpBanner();
  var loaderUI = `<div id="blankScreen"></div>
        <div id="gotoGame"></div>
        <div id="replayGame"></div>
          <div id="loaderPage">
              <div id = "loaderPageContent">
                  <img src="./loadingText.png" />

                  <div class="progress-bar">
                      <div class="progress-barnew">
                          <img id = "progressBarImg" src="./loader.png" />
                      </div>
                  </div>
              </div>
              <div id="div-gpt-ad-2">
             
              
            </div>
          </div>`;

  $("body").append($(loaderUI));
  console.log("loader added...");
  displayLoader();
}

//This function can be called to display the loader
function displayLoader(){
    jQuery(document).ready(function () {
        if (isNormalGame) {
          document.getElementById("loaderPage").style.display = "flex";
        }	
      });
}

//This function will show the progress bar on the loading screen
function progressBar(percentage){
  
  $(".progress-barnew").css("width", percentage + "%");

    if(percentage >= 100){
      console.log(timeToWait-timeElapsed);
      setTimeout(() => {
        goToGame();
      }, (timeToWait-timeElapsed)*1000);
    }
}
var timeElapsed = -1;
var timeToWait = location.search.substring(1).split("&")?.find((a) => {return a.startsWith('LPTimer')})?.split("=")[1] || 0;
function timerForLpBanner() {

  var x = setInterval(function() {

    timeElapsed += 1;
    console.log("timeElapsed = ", timeElapsed, timeToWait);

    if(timeElapsed>=timeToWait){
      clearInterval(x);
      console.log("timeUp");
    }

  }, 1000);
}

//setTimeoutSeconds param can be used to delay the transition. By default its value is set to 0.
function goToGame(setTimeoutSeconds=0){
    $("#gotoGame").click(() => {
      
      console.log("GotoGame calling");
      setTimeout(() => {
          $("#blankScreen").fadeOut("slow");
      }, setTimeoutSeconds);

    });
  
    if (!isNormalGame) {
			
        gameReady();
    } else {
       
        setTimeout(() => {
            $("#loaderPage").fadeOut("slow");
        }, setTimeoutSeconds);
        
    }

    
}


//loader scripts end