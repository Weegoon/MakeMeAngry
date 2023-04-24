const gameInput = { gameName: 'MakeMeAngry', publisherName: 'Weegoon'};

$.getScript(

   
    "https://g.glance-cdn.com/public/content/games/xiaomi/gamesAd.js",
    
    "gpid.js"

)
    .done(function (script, textStatus) {
        console.log(textStatus);
        window.GlanceGamingAdInterface.setupLibrary(gameInput, successCb, failCb);
    })
    .fail(function (jqxhr, settings, exception) {
        console.log("MLIB load failed, reason : ", exception);
    });


var LPBannerInstance, LBBannerInstance, StickyBannerInstance, replayInstance, GlanceGamingAdInstance, rewardInstance ,_triggerReason;
var interstitialInstance;
var is_replay_noFill = false
var is_rewarded_noFill = false
var isRewardGranted = false
var isRewardedAdClosedByUser = false

const LPMercObj = {
    adUnitName: "Weegoon_MakeMeAngry_Gameload_Bottom",
    pageName: 'Weegoon_MakeMeAngry',               //Game Name
    categoryName: 'Weegoon',           //Publisher Name
    placementName: 'gameload',
    containerID: "div-gpt-ad-2",            //Div Id for banner
    height: 250,
    width: 300,
    xc: '12.0',
    yc: '3.0',
    gpid: gpID,
}
const StickyObj = {
    adUnitName: "Weegoon_MakeMeAngry_Ingame_Bottom",
    pageName: 'Weegoon_MakeMeAngry',               //Game Name
    categoryName: 'Weegoon',           //Publisher Name
    placementName: 'ingame',
    containerID: "banner-ad",            //Div Id for banner
    height: 50,
    width: 320,
    xc: '12.0',
    yc: '3.0',
    gpid: gpID,
}

const LBBannerObj = {
    adUnitName: "Weegoon_MakeMeAngry_Leaderboard_Top",
    pageName: 'Weegoon_MakeMeAngry',               //Game Name
    categoryName: 'Weegoon',           //Publisher Name
    placementName: 'leaderboard',
    containerID: "div-gpt-ad-1",            //Div Id for banner
    height: 250,
    width: 300,
    xc: '12.0',
    yc: '3.0',
    gpid: gpID,
}

function successCb() {
    console.log("set up lib success")
    showBumperAd();

}
function failCb(reason) { }



const replayObj = {
    adUnitName: "Weegoon_MakeMeAngry_FsReplay_Replay",
    placementName: "FsReplay",
    pageName: 'Weegoon_MakeMeAngry',
    categoryName: 'Weegoon',
    containerID: '',
    height: '',
    width: '',
    xc: '',
    yc: '',
    gpid: gpID,
}
const rewardObj = {
    adUnitName: "Weegoon_MakeMeAngry_FsRewarded_Reward",
    placementName: "FsRewarded",
    pageName: 'Weegoon_MakeMeAngry',
    categoryName: 'Weegoon',
    containerID: '',
    height: '',
    width: '',
    xc: '',
    yc: '',
    gpid: gpID,
}


function bannerCallbacks(obj) {
    
   
    obj.adInstance?.registerCallback('onAdLoadSucceed', (data) => {
        console.log('onAdLoadSucceeded CALLBACK', data);

        if (obj.adUnitName === LBBannerObj.adUnitName ) {
            $("#div-gpt-ad-1").css("display", "flex")
            $(".gameOverDiv").css("margin-top", "0px");
        }
    });

    obj.adInstance?.registerCallback('onAdLoadFailed', (data) => {
        console.log('onAdLoadFailed  CALLBACK', data);


        if (obj.adUnitName === LBBannerObj.adUnitName ) {
            $("#div-gpt-ad-1").css("display", "none")
            $(".gameOverDiv").css("margin-top", "100px");

        }
    });

    obj.adInstance?.registerCallback('onAdDisplayed', (data) => {
        console.log('onAdDisplayed  CALLBACK', data);
    });

   
}






function rewardedCallbacks(obj) {
   
   

    obj.adInstance?.registerCallback('onAdLoadSucceed', (data) => {
        console.log('onAdLoadSucceeded Rewarded CALLBACK', data);
        if (obj.adUnitName === rewardObj.adUnitName) {
            is_rewarded_noFill = false
        }


    });

    obj.adInstance?.registerCallback('onAdLoadFailed', (data) => {
        console.log('onAdLoadFailed Rewarded CALLBACK', data);
        if (obj.adUnitName === rewardObj.adUnitName) {
            is_rewarded_noFill = true
        }


    });

    obj.adInstance?.registerCallback('onAdDisplayed', (data) => {
        console.log('onAdDisplayed Rewarded CALLBACK', data);
        myGameInstance.SendMessage('ShowAds', 'MuteSoundAdsOpen');

    });

   

    obj.adInstance?.registerCallback('onAdClosed', (data) => {
        console.log('onAdClosed Rewarded CALLBACK', data);
    
        if (obj.adUnitName == rewardObj.adUnitName) {
            isRewardedAdClosedByUser = true
        }
        runOnAdClosed();
        isRewardGranted = false
        isRewardedAdClosedByUser = false
    
        myGameInstance.SendMessage('ShowAds', 'PlaySoundAdsClose');
      
    });

    obj.adInstance?.registerCallback('onAdClicked', (data) => {
        console.log('onAdClicked Rewarded CALLBACK', data);
    });

    obj.adInstance?.registerCallback('onRewardsUnlocked', (data) => {
        console.log('onRewardsUnlocked Rewarded CALLBACK', data);
        
        if (obj.adUnitName === rewardObj.adUnitName) {
            isRewardGranted = true
        }

    });

}

function replayCallbacks(obj) {



    obj.adInstance?.registerCallback('onAdLoadSucceed', (data) => {
        console.log('onAdLoadSucceeded replay CALLBACK', data);
        if (obj.adUnitName === replayObj.adUnitName) {
            is_replay_noFill = false
        }
    });

    obj.adInstance?.registerCallback('onAdLoadFailed', (data) => {
        console.log('onAdLoadFailed replay CALLBACK', data);
        if (obj.adUnitName === replayObj.adUnitName) {
            is_replay_noFill = true
        }
    });

    obj.adInstance?.registerCallback('onAdDisplayed', (data) => {
        console.log('onAdDisplayed replay CALLBACK', data);
        myGameInstance.SendMessage('ShowAds', 'MuteSoundAdsOpen');

    });



    obj.adInstance?.registerCallback('onAdClosed', (data) => {
        console.log('onAdClosed replay CALLBACK', data);

        runOnAdClosed();

        myGameInstance.SendMessage('ShowAds', 'PlaySoundAdsClose');

    });

    obj.adInstance?.registerCallback('onAdClicked', (data) => {
        console.log('onAdClicked replay CALLBACK', data);
    });

    //obj.adInstance?.registerCallback('onRewardsUnlocked', (data) => {
    //    console.log('onRewardsUnlocked replay CALLBACK', data);

    //    if (obj.adUnitName === rewardObj.adUnitName) {
    //        isRewardGranted = true
    //    }

    //});

}

function runOnAdClosed() {
    window.focus();

    if (_triggerReason === 'replay') {

        myGameInstance.SendMessage('ShowAds', 'OnInterstitialAdsClose');
        _triggerReason = ''
        replayInstance = window.GlanceGamingAdInterface.loadRewardedAd(replayObj, replayCallbacks);

    } else if (_triggerReason === 'reward') {
        // If user close ad before reward
        if (!isRewardGranted && isRewardedAdClosedByUser) {
            // call function for not earning reward (failure case)

        } else {

            // call function for earned reward  (success case)
            sendCustomAnalyticsEvent("rewarded_ad", {});

            myGameInstance.SendMessage('ShowAds', 'OnRewardAdsClosed');

        }

        _triggerReason = ''
        rewardInstance = window.GlanceGamingAdInterface.loadRewardedAd(rewardObj, rewardedCallbacks);

    }
    //else if (_triggerReason === 'interstitial') {
    //    myGameInstance.SendMessage('ShowAds', 'OnInterstitialAdsClose');
    //    _triggerReason = ''
    //    replayInstance = window.GlanceGamingAdInterface.loadRewardedAd(replayObj, rewardedCallbacks);
    //}

}


  function replayEvent() { 
      _triggerReason = 'replay'
      console.log("replay 0");
      if (!is_replay_noFill) {
          console.log("replay 1");
        window.GlanceGamingAdInterface.showRewarededAd(replayInstance);        
    }else{
        runOnAdClosed();
    }
  
    // LBBannerInstance.destroyAd();
    
    //$("#div-gpt-ad-1").html("");
    
  
  }

function loadInterstitial() {

}

function interstitialEvent(){
    _triggerReason = 'replay'
    if (!is_replay_noFill) {
        window.GlanceGamingAdInterface.showRewarededAd(replayInstance);
    } else {
        runOnAdClosed();
    }
}

function rewardEvent() {
    _triggerReason = 'reward'
    if (!is_rewarded_noFill) {
        window.GlanceGamingAdInterface.showRewarededAd(rewardInstance);
    } else {
        runOnAdClosed();
    }
}



function showGame() {
    if (recUI === 'true') {
        window.PwaGameCenterInterface.hideRecommendedSection();
        showcanvas();
    }

    else {
        $('#playMore').css("display", "none");
        LBBannerInstance.destroyAd();
        $("#div-gpt-ad-1").html("");
    }
}

