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

var moveLeftBtn = document.getElementById('moveLeftBtn');
var moveRightBtn = document.getElementById('moveRightBtn');
var moveUpBtn = document.getElementById('moveUpBtn');
var moveDownBtn = document.getElementById('moveDownBtn');

// Flag if bar was already created:
var existBar = false;

// Instantiate global and default img objects:
var img = new Image();
var imgDefaultFB = new Image();
var imgDefaultWebsite = new Image();
var image_x;
var image_y;

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

moveLeftBtn.addEventListener('click', moveImageLeft, false);
moveRightBtn.addEventListener('click', moveImageRight, false);
moveUpBtn.addEventListener('click', moveImageUp, false);
moveDownBtn.addEventListener('click', moveImageDown, false);

// First, disable all controls:
disableAll();

// Enable all controls
function enableAll() {
  moveLeftBtn.disabled = false;
  moveRightBtn.disabled = false;
  moveUpBtn.disabled = false;
  moveDownBtn.disabled = false;
  clearCanvasBtn.disabled = false;
  generateBtn.disabled = false;
  downloadBtn.disabled = false;

  document.getElementById('title').disabled = false;
  document.getElementById('subtitle').disabled = false;
  document.getElementById('credit').disabled = false;
  document.getElementById('creditColor').disabled = false;

  document.getElementById('logoColor').disabled = false;
  document.getElementById('logosCombo').disabled = false;
  document.getElementById('bannerCombo').disabled = false;

}

// Enable all controls
function disableAll() {
  moveLeftBtn.disabled = true;
  moveRightBtn.disabled = true;
  moveUpBtn.disabled = true;
  moveDownBtn.disabled = true;
  clearCanvasBtn.disabled = true;
  generateBtn.disabled = true;
  downloadBtn.disabled = true;

  document.getElementById('title').disabled = true;
  document.getElementById('subtitle').disabled = true;
  document.getElementById('credit').disabled = true;
  document.getElementById('creditColor').disabled = true;

  document.getElementById('logoColor').disabled = true;
  document.getElementById('logosCombo').disabled = true;
  document.getElementById('bannerCombo').disabled = true;
}

// Load image from file using file input field
function loadImage(e){
    // Enable all controls
    enableAll();

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
function clearFbCanvas(e){
    existBar = false;
    ctxFb.clearRect(0, 0, ctxFb.canvas.width, ctxFb.canvas.height);
}

function clearWebsiteCanvas(e){
    existBar = false;
    ctxWebsite.clearRect(0, 0, ctxWebsite.canvas.width, ctxWebsite.canvas.height);
}

function clearCanvas(e){
    existBar = false;
    clearFbCanvas(e)
    clearWebsiteCanvas(e)
}

// Clear input box
function clearInputbox(){
    document.getElementById('imageLoader').value = "";
}


// Generate the meme composed of the image and the black bar
function generateMeme(e){
    var blackBarRatio = 0.79; // Ratio of meme height to black bar

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

    image_x = 0;
    image_y = 0;
}

function moveImageLeft() {
    clearFbCanvas();
    image_x += 20;
    if (img.width >= img.height) {
        ctxFb.drawImage(img, image_x, image_y, img.height, img.height, 0, 0, canvasFb.width, canvasFb.height);
    }
    if (img.width < img.height) {
        ctxFb.drawImage(img, image_x, image_y, img.width, img.width, 0,0, canvasFb.width, canvasFb.height);
    }
}

function moveImageRight() {
    clearFbCanvas();
    image_x -= 20;
    if (img.width >= img.height) {
        ctxFb.drawImage(img, image_x, image_y, img.height, img.height, 0, 0, canvasFb.width, canvasFb.height);
    }
    if (img.width < img.height) {
        ctxFb.drawImage(img, image_x, image_y, img.width, img.width, 0, 0, canvasFb.width, canvasFb.height);
    }
}

function moveImageUp() {
    clearFbCanvas();
    image_y += 20;
    if (img.width >= img.height) {
        ctxFb.drawImage(img, image_x, image_y, img.height, img.height, 0,0, canvasFb.width, canvasFb.height);
    }
    if (img.width < img.height) {
        ctxFb.drawImage(img, image_x, image_y, img.width, img.width, 0, 0, canvasFb.width, canvasFb.height);
    }
}

function moveImageDown() {
    clearFbCanvas();
    image_y -= 20;
    if (img.width >= img.height) {
        ctxFb.drawImage(img, image_x, image_y, img.height, img.height, 0, 0, canvasFb.width, canvasFb.height);
    }
    if (img.width < img.height) {
        ctxFb.drawImage(img, image_x, image_y, img.width, img.width, 0, 0, canvasFb.width, canvasFb.height);
    }
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
    ctxFb.font = "bold 150px Alef";
    ctxFb.fillStyle = "white";
    ctxFb.fillText(titleText, canvasFb.width * 0.98, canvasFb.height * blackBarRatio * 1.095);
    ctxFb.font = "80px Alef";
    wrapText(ctxFb, subtitleText, canvasFb.width * 0.98, canvasFb.height - 160, canvasFb.width * 0.78, 100);

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
    ctxFb.rotate(-90 * Math.PI / 180);
    ctxFb.fillText(creditText,  -canvasFb.height * 0.25, canvasFb.width * 0.02);
    ctxFb.rotate(90 * Math.PI / 180);
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

    // Always set the logo color to white for the fb meme
    logoFb.src = "logos/transparent-" + logoComboVal + "_white.png";
    logoWebsite.src = "logos/transparent-" + logoComboVal + "_" + logoColor + ".png";
    websiteLogoAspectRatio = 1.127

    logoFb.onload = function(){
        ctxFb.drawImage(logoFb, 0, 0, logoFb.width, logoFb.height, -15, canvasFb.width  - 405,
          canvasFb.width * 0.18, canvasFb.height * 0.2);
        ctxWebsite.drawImage(logoWebsite, 0, 0, logoWebsite.width, logoWebsite.height, -10,
          canvasWebsite.height * blackBarRatio * 0.9, canvasWebsite.width * 0.15, canvasWebsite.width * 0.15 * websiteLogoAspectRatio);
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
            ctxFb.drawImage(banner, 0, 0, banner.width, banner.height, -70, canvasFb.width*0.025, canvasFb.height*0.2, canvasFb.height*0.2*0.723);
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
