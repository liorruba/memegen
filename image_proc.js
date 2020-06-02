// Get elements from HTML
var canvasFb = document.getElementById('fbMemeCanvas');
var canvasWebsite = document.getElementById('websiteImageCanvas');
var ctxFb = canvasFb.getContext('2d');
var ctxWebsite = canvasWebsite.getContext('2d');

// Force canvas to be square (responsive)
canvasFb.height = canvasFb.width;

var imageLoader = document.getElementById('imageLoader');
var clearCanvasBtn = document.getElementById('clearCanvasBtn');
var generateBtn = document.getElementById('generateBtn');
var downloadBtn = document.getElementById('downloadBtn');

// Flag if bar was already created:
var existBar = false;

// Instantiate global and default img objects:
var img = new Image();
var imgDefaultFB = new Image();
var imgDefaultWebsite = new Image();

// Always show a default meme on startup:
imgDefaultFB.onload = function(){
    ctxFb.drawImage(imgDefaultFB, 0, 0, imgDefaultFB.height, imgDefaultFB.height, 0,0,canvasFb.width, canvasFb.height);
    ctxWebsite.drawImage(imgDefaultWebsite, 0, 0, imgDefaultWebsite.width, imgDefaultWebsite.width/(1220.0/675.0), 0,0,canvasWebsite.width, canvasWebsite.height);
}
imgDefaultFB.src = "default_meme.png";
imgDefaultWebsite.src = "website_default_meme.png";

// Set global event listeners:
imageLoader.addEventListener('change', loadImage, false);
clearCanvasBtn.addEventListener('click', clearCanvas, false);
clearCanvasBtn.addEventListener('click', clearInputbox, false);
generateBtn.addEventListener('click', generateMeme, false);
downloadBtn.addEventListener('click', downloadMemes, false);

// Load image from file using file input field
function loadImage(e){
    // clearCanvas();
    var reader = new FileReader();
    reader.onload = function(event){
        img.onload = function() {
            drawImg(img);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
}

// Clear canvas
function clearCanvas(e){
    existBar = false;
    ctxFb.clearRect(0, 0, ctxFb.canvas.width, ctxFb.canvas.height);
    ctxWebsite.clearRect(0, 0, ctxWebsite.canvas.width, ctxWebsite.canvas.height);
}

// Clear input box
function clearInputbox(){
    document.getElementById('imageLoader').value = "";
}


// Generate the meme composed of the image and the black bar
function generateMeme(e){
    var blackBarRatio = 0.75; // Ratio of black bar to meme height

    if (existBar) {
        drawImg();
    }

    drawBlackBar(blackBarRatio);
    drawText(blackBarRatio);
    drawLogo(blackBarRatio);
    drawBanner(blackBarRatio);
}

// Draw image wrapper
function drawImg() {
    // Else, load the global image:
    if (img.width >= img.height) {
        ctxFb.drawImage(img, 0, 0, img.height, img.height, 0, 0, canvasFb.width, canvasFb.height);
    }
    if (img.width < img.height) {
        ctxFb.drawImage(img, 0, 0, img.width, img.width, 0, 0, canvasFb.width, canvasFb.height);
    }

    ctxWebsite.drawImage(img, 0, 0, img.width, img.width/(1220.0/675.0), 0,0,canvasWebsite.width, canvasWebsite.height);
}

// Draw the black ribbon on the bottom:
function drawBlackBar(blackBarRatio) {
    ctxFb.fillStyle = 'rgba(0,0,0,0.8)';
    ctxFb.fillRect(0, canvasFb.height*blackBarRatio, canvasFb.width, canvasFb.height*(1-blackBarRatio));

    existBar = true;
}

// Draw text on canvas:
function drawText(blackBarRatio) {
    var titleText = document.getElementById('title').value;
    var subtitleText = document.getElementById('subtitle').value;
    var creditText = document.getElementById('credit').value;
    var creditColor = document.getElementById('creditColor').value;

    // Title and substitle:
    ctxFb.font = "bold 160px Alef";
    ctxFb.fillStyle = "white";
    ctxFb.fillText(titleText, canvasFb.width * 0.98, canvasFb.height * blackBarRatio * 1.12);
    ctxFb.font = "85px Alef";
    wrapText(ctxFb, subtitleText, canvasFb.width * 0.98, canvasFb.height * blackBarRatio * 1.2, canvasFb.width * 0.78, 100);

    // Credit color:
    if (creditColor === "white") {
        ctxFb.fillStyle = "white";
        ctxWebsite.fillStyle = "white";
    }
    else {
        ctxFb.fillStyle = "black";
        ctxWebsite.fillStyle = "black";
    }
    ctxFb.font = "35px Alef";
    ctxFb.fillText(creditText,  ctxFb.measureText(creditText).width + 40, canvasFb.height * 0.73);
    ctxWebsite.font = "20px Alef";
    ctxWebsite.fillText(creditText, canvasWebsite.width * 0.99, canvasWebsite.height * 0.97);
}

// Draw madgab logo
function drawLogo(blackBarRatio) {
    var logoFb = new Image;
    var logoWebsite = new Image;
    var logoColor = document.getElementById('logoColor').value;
    var logoComboVal = document.getElementById('logosCombo').value;

    if (logoColor === "") {
        logoColor = "white";
    }

    logoFb.src = "logos/transparent-" + logoComboVal + "_white.png";
    logoWebsite.src = "logos/transparent-" + logoComboVal + "_" + logoColor + ".png";

    logoFb.onload = function(){
        ctxFb.drawImage(logoFb, 0, 0, logoFb.width, logoFb.height, -10, canvasFb.height * blackBarRatio * 0.99, canvasFb.width*0.25, canvasFb.width*0.25*1.127);
        ctxWebsite.drawImage(logoWebsite, 0, 0, logoWebsite.width, logoWebsite.height, -10, canvasWebsite.height * blackBarRatio * 0.82, canvasWebsite.width*0.2, canvasWebsite.width*0.2*1.127);
    }
}

// Draw special banner (hot from the oven, etc)
function drawBanner(blackBarRatio) {
    var banner = new Image;
    var bannerComboVal = document.getElementById('bannerCombo').value;

    if (bannerComboVal === "empty") {
        // do nothing
    }
    else {
        banner.src = "logos/transparent-" + bannerComboVal + ".png"
        banner.onload = function(){
            ctxFb.rotate(-10 * Math.PI / 180);
            ctxFb.drawImage(banner, 0, 0, banner.width, banner.height, -20, canvasFb.width*0.05, canvasFb.height*0.27, canvasFb.height*0.27*0.723);
            ctxFb.rotate(10 * Math.PI / 180);

            ctxWebsite.rotate(20 * Math.PI / 180);
            ctxWebsite.drawImage(banner, 0, 0, banner.width, banner.height, canvasWebsite.width*0.82, -canvasWebsite.height*0.52, canvasWebsite.height*0.27, canvasWebsite.height*0.27*0.723);
            ctxWebsite.rotate(-20 * Math.PI / 180);
        }
    }
}

// Some code I found online to download canvas as image
function downloadMemes(){
    imagefb = fbMemeCanvas.toDataURL("image/jpeg").replace("image/png", "image/octet-stream");
    imagefb.crossorigin = 'anonymous';
    var link = document.createElement('a');
    link.download = "fb_meme.jpeg";
    link.href = imagefb;
    link.click();

    imageweb = websiteImageCanvas.toDataURL("image/jpeg").replace("image/png", "image/octet-stream");
    imageweb.crossorigin = 'anonymous';
    var link = document.createElement('a');
    link.download = "website_meme.jpeg";
    link.href = imageweb;
    link.click();
}

// A function I found online to wrap text
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}
