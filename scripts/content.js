let speed = 1;

console.log('changeSpeed.js loaded');

const videoObj = document.querySelector('video');

chrome.storage.sync.get('speed', (result) => {
    console.log(result);
    if(result != undefined && result.speed != undefined){
        speed = result.speed;
        videoObj.playbackRate = speed;
        console.log(`Ustawiono prędkość na ${videoObj.playbackRate}`);
    }
})
 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    speed = request.speed;
    videoObj.playbackRate = speed;
    console.log(`Ustawiono prędkość 3 na ${speed}`);
});