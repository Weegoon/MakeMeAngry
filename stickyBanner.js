

//This function will ad the stickyBanner UI
function addStickyBanner() {
    var stickyBannerDiv = `<div id="bannerOverlay">
                            <div id="banner-ad">
            
                            </div>
                        </div>`;

    $("body").append($(stickyBannerDiv));
    console.log("stickyBannerDiv added...");
}

function addBannerAd() {
    $("#bannerOverlay").css("display", "flex");
    var stickyBannerDiv = `<div id="banner-ad">
                        </div>`;
    $("body").append($(stickyBannerDiv));
    console.log("stickyBannerDiv added...");
}

function refreshStickyBannerAd() {
    console.log("refreshStickyBannerAd")
    addStickyBanner();
    showStickyBannerAd();

    var timesRun = 0;
    const runInterval = setInterval(()=> {
       
        if(StickyBannerInstance){
			console.log( StickyBannerInstance,"if in interval")
			StickyBannerInstance.destroyAd();
		}
		
		StickyBannerInstance =  window.GlanceGamingAdInterface.showStickyBannerAd(StickyObj,bannerCallbacks);
    }, 30000);
}

function showStickyBannerAd(){
    $("#bannerOverlay").css("display","flex");
}