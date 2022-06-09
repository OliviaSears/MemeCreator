import './general';

class Memes {
  constructor() {
    console.log("Memes JS File");
    this.$topTextInput = document.getElementById("topText");
    this.$bottomTextInput = document.getElementById("bottomText");
    this.$imageInput = document.getElementById("image"); 
    this.$downloadButton = document.getElementById("downloadMeme");
    this.$canvas = document.getElementById("imgCanvas");
    // these are not in the book
    this.$defaultImage = document.querySelector('#defaultImage');
    this.image = this.$defaultImage
    this.$context = this.$canvas.getContext('2d');
    this.deviceWidth = window.innerWidth;
    this.createCanvas();
    this.createMeme();
    this.addEventListeners();

  }

  createCanvas() {
    this.$canvas.width = Math.min(640, this.deviceWidth - 30);
    this.$canvas.height = Math.min(480, this.deviceWidth);
  }

  createMeme() {
    //clear the image
    this.$context.clearRect(0,0, this.$canvas.height, this.$canvas.width);

    //draw the image
    this.$canvas.height = this.image.height;
    this.$canvas.width = this.image.width;
    this.resizeCanvas(this.$canvas.height, this.$canvas.width);
    this.$context.drawImage(this.image, 0, 0);

    //setup the tezt for drawing
    const fontSize = ((this.$canvas.width+this.$canvas.height)/2)*4/100;
    this.$context.font = `${fontSize}pt sans-serif`;
    this.$context.textAlign = 'center';
    this.$context.textBaseline = 'top';
    this.$context.lineJoin = 'round';
    this.$context.lineWidth = fontSize/5;
    this.$context.strokeStyle = 'black';
    this.$context.fillStyle = 'white';

    //get the default text from the UI
    const topText = this.$topTextInput.value.toUpperCase();
    const bottomText = this.$bottomTextInput.value.toUpperCase();
    this.$context.strokeText(topText, this.$canvas.width/2, this.$canvas.height*(5/100));
    this.$context.fillText(topText, this.$canvas.width/2, this.$canvas.height*(5/100));
    this.$context.strokeText(bottomText, this.$canvas.width/2, this.$canvas.height*(90/100));
    this.$context.fillText(bottomText, this.$canvas.width/2, this.$canvas.height*(90/100));
    
  }

  addEventListeners() {
    this.createMeme = this.createMeme.bind(this);
    let inputNodes = [this.$topTextInput, this.$bottomTextInput];

    inputNodes.forEach(element => element.addEventListener('keyup', this.createMeme));
    inputNodes.forEach(element => element.addEventListener('change', this.createMeme));
 
    this.downloadMeme = this.downloadMeme.bind(this);
    this.$downloadButton.addEventListener('click', this.downloadMeme);

    this.loadImage = this.loadImage.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.$imageInput.addEventListener('change', this.loadImage, this.resizeCanvas);
  }

  downloadMeme() {
    const imageSource = this.$canvas.toDataURL('image/png');
    this.$downloadButton.href = imageSource;   //does same thing -- this.$downloadButton.setAttribute('href', imageSource);   

  }

  loadImage() {
    if (this.$imageInput.files && this.$imageInput.files[0]) {
      let reader = new FileReader();
      reader.onload = () => {   //this sets up the asynchornous call
        this.image = new Image();
        this.image.onload = () => {
          this.createMeme();
        };
        this.image.src = reader.result;
      };
      reader.readAsDataURL(this.$imageInput.files[0]);
    }
  }

  resizeCanvas(canvasHeight, canvasWidth) {
    let height = canvasHeight;
    let width = canvasWidth;
    while (height > Math.min(1000, this.deviceWidth-30) &&
            width > Math.min(1000, this.deviceWidth-30)) {
              height /= 2;
              width /= 2;
    }
    this.$canvas.style.height = `${height}px`;
    this.$canvas.style.width = `${width}px`;
            
  }
}

window.onload = () => {new Memes();};