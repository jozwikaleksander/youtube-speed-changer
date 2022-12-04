const form = document.querySelector('form');
const numberForm = document.querySelector('.num-input');
const slider = document.querySelector('.slider');

let speed = 1;
slider.value = speed*4;

chrome.storage.sync.get('speed', (result) => {
    if(result && result.speed){
        speed = result.speed;
        slider.value = speed*4;
        numberForm.value = speed;
    }
})

slider.addEventListener('input', (e) => {
    speed = e.target.value/4;
    numberForm.value = speed;
});
numberForm.addEventListener('change', (e) => {
    speed = e.target.value;
    slider.value = speed*4;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    speed = parseFloat(numberForm.value);
    chrome.storage.sync.set({'speed': speed});
    console.log(speed);

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {speed: speed});
    });
});