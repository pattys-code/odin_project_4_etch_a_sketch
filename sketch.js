const grid = document.querySelector('.grid');
const resetBtn = document.querySelector('.reset');
const rainbowBtn = document.querySelector('.rainbow');
const finishBtn = document.querySelector('.finish');
const menu = document.querySelector('.menu-container');
let trigger = false;
let rainbowActive = false;
const sizeSlider = document.querySelector('#size');

function getRandomColor () {
    const colorArray = [];
    for (let idx = 0; idx < 3; idx++) {
         let randomNum = Math.floor(Math.random()*256);
        colorArray.push(randomNum);
    }
   return 'rgb('+colorArray.join(',')+')';
}

function setPixelListeners() {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        let color = 'rgb(107, 80, 101)';
        if (rainbowActive===true) {
            color = getRandomColor();
        }
        pixel.addEventListener('mouseenter', (event) => {
            event.preventDefault();
            if (trigger) {
                pixel.style.background = color; 
            }
        });
        pixel.addEventListener('mousedown', (event) => {
            pixel.style.background = color; 
        });
    });
}

function resetGrid () {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.style.background='rgb(230, 213, 222)';
    })
}

function changeSizeGrid () {
    grid.innerHTML = '';
    const size = document.querySelector('#size').value;
    for (let idx_row = 0; idx_row < size; idx_row++) {
        const pixel_row = document.createElement('div');
        pixel_row.classList.add('pixel_row');
        grid.appendChild(pixel_row); 
        for (let idx_col = 0; idx_col < size; idx_col++) {
            const pixel_col = document.createElement('div');
            pixel_col.classList.add('pixel');
            pixel_row.appendChild(pixel_col); 
        }
    }
    setPixelListeners();
    const sizeText = document.querySelector('#size-text');
    sizeText.innerHTML= size+'x'+size; 
}

// initialize
changeSizeGrid();

// draw
document.addEventListener('mousedown', function(){
    trigger = true;
});
document.addEventListener('mouseup', function(){
    trigger = false;
});

// reset color
resetBtn.addEventListener('click', resetGrid);

//rainbow mode
rainbowBtn.addEventListener('click', () => {
    rainbowActive = !rainbowActive;
    rainbowBtn.innerHTML= rainbowActive ? 'deactivate rainbow mode':'activate rainbow mode';
    setPixelListeners();
})

// change size
sizeSlider.addEventListener('input',()=> {
    changeSizeGrid();
});

finishBtn.addEventListener('click', () => {
    menu.innerHTML = '';
    const finishMessage = document.createElement('div');
    const startAgainBtn = document.createElement('button');
    finishMessage.textContent = 'Well done! Wanna draw again?';
    startAgainBtn.textContent = 'Yes';
    finishMessage.classList.add('pad-text');
    menu.appendChild(finishMessage);
    menu.appendChild(startAgainBtn);
    startAgainBtn.addEventListener('click', () => {
        location.reload();
    })
})
