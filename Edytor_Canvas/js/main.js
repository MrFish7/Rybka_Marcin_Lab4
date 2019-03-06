let plotno = document.querySelector('#plotno');
const zdjecie = "./img/zdjecie.jpg";
let ctx = plotno.getContext('2d');
let btnRun = document.querySelector('#run');
let btnBrightplus = document.querySelector('#brightplus');
let btnBrightminus = document.querySelector('#brightminus');
let contrast = document.querySelector("#contrast");
let contrast_value = document.querySelector("#contrast-value");
let saturation_counter = document.querySelector("#saturation-counter");
let saturation = document.querySelector("#saturation");
let saturation1 = document.querySelector("#saturation1");
let saturation2 = document.querySelector("#saturation2");
let invert = document.querySelector('#invert');
let img = new Image();

img.src = zdjecie;

//Canvas
img.addEventListener('load', (e) => {
    ctx.drawImage(img, 0, 0, plotno.width, plotno.height);
});

function draw() {
    ctx.drawImage(img, 0, 0, plotno.width, plotno.height)
}

//Invert
invert.addEventListener('click', (e) => {
    let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height)
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = imageData.data[i] ^ 255
        imageData.data[i + 1] = imageData.data[i + 1] ^ 255
        imageData.data[i + 2] = imageData.data[i + 2] ^ 255
    }
    ctx.putImageData(imageData, 0, 0)
})

btnRun.addEventListener('click', (e) => {
    let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height);
    console.log(imageData);
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = Math.min(255, imageData.data[i] + 50);
        imageData.data[i] = Math.min(255, imageData.data[i + 1] + 50);
        imageData.data[i] = Math.min(255, imageData.data[i + 2] + 50);
    }
    ctx.putImageData(imageData, 0, 0);
});

//Jasność
btnBrightplus.addEventListener('click', (e) => {
    let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] += 50;
        imageData.data[i + 1] += 50;
        imageData.data[i + 2] += 50;
    }
    ctx.putImageData(imageData, 0, 0);
});

btnBrightminus.addEventListener('click', (e) => {
    let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] -= 50;
        imageData.data[i + 1] -= 50;
        imageData.data[i + 2] -= 50;
    }
    ctx.putImageData(imageData, 0, 0);
})

//Kontrast
function truncateColor(value) {
    if (value < 0) {
        value = 0;
    } else if (value > 255) {
        value = 255;
    }
    return value;
}

contrast.addEventListener("input", (e) => {
    draw()
    let imageData = ctx.getImageData(0, 0, plotno.width, plotno.height)

    let value = (e.target.value)
    contrast_value.innerHTML = value
    let factor = ((259.0 * (value + 255.0)) / (255.0 * (259.0 - value))) / 10
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = truncateColor(factor * (imageData.data[i] - 128.0) + 128.0)
        imageData.data[i + 1] = truncateColor(factor * (imageData.data[i + 1] - 128.0) + 128.0)
        imageData.data[i + 2] = truncateColor(factor * (imageData.data[i + 2] - 128.0) + 128.0)
    }
    ctx.putImageData(imageData, 0, 0)
})

//Nasycenie
saturation.addEventListener("input", (e) => {
    console.log(ctx.fillStyle)
    saturation_counter.innerHTML = `hsl(${saturation.value}, ${saturation1.value}%, ${saturation2.value}%)`
    ctx.globalCompositeOperation = "saturation"
    ctx.fillStyle = `hsl(${e.target.value},${saturation1.value}%,${saturation2.value}%)`
    ctx.fillRect(0, 0, plotno.width, plotno.height)
});
saturation1.addEventListener("input", (e) => {
    saturation_counter.innerHTML = `hsl(${saturation.value}, ${saturation1.value}%, ${saturation2.value}%)`
    ctx.globalCompositeOperation = "saturation"
    ctx.fillStyle = `hsl(${saturation.value},${e.target.value}%,${saturation2.value}%)`
    ctx.fillRect(0, 0, plotno.width, plotno.height)
});
saturation2.addEventListener("input", (e) => {
    saturation_counter.innerHTML = `hsl(${saturation.value}, ${saturation1.value}%, ${saturation2.value}%)`
    ctx.globalCompositeOperation = "saturation"
    ctx.fillStyle = `hsl(${saturation.value},${saturation2.value}%,${e.target.value}%)`
    ctx.fillRect(0, 0, plotno.width, plotno.height)
});
