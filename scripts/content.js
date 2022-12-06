let speed = 1;

console.log('changeSpeed.js loaded');

const videoObj = document.querySelector('video');

const changeSpeed = () => {
    videoObj.playbackRate = speed;
    console.log(`Speed set on ${videoObj.playbackRate}`);
}

chrome.storage.sync.get('speed', (result) => {
    console.log(result);
    if(result != undefined && result.speed != undefined){
        speed = result.speed;
        changeSpeed();
    }
})
 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    speed = request.speed;
    changeSpeed();
});

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(mutation => {
        if(mutation.attributeName === 'src'){
            console.log('src changed');
            changeSpeed();
        }
    })
});
observer.observe(videoObj, {
    attributes: true
});