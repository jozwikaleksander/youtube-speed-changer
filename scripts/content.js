let speed = 1;

console.log('changeSpeed.js loaded');

const videoObj = document.querySelector('video');

const changeSpeed = () => {
    videoObj.playbackRate = speed;
}

chrome.storage.sync.get('speed', (result) => {
    console.log(result);
    if(result != undefined && result.speed != undefined){
        speed = result.speed;
        changeSpeed();
    }
})
 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    speed = request.speed;
    changeSpeed();
});

var observer = new MutationObserver(function(mutations) {
    mutations.forEach(mutation => {
        if(mutation.attributeName === 'src'){
            changeSpeed();
        }
    })
});
observer.observe(videoObj, {
    attributes: true
});