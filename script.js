// add canvas to html
const imgSlider = document.querySelector('.slider_container');

let isRunning = true;

const MEASUREMENT = {
	width: 323,
	height: 600,
  starting_posY: 400,
  gapY: 10,
  // img_width: 323,
  // img_height: 400,
  img_width: 323,
  img_height: 400,
  gravety: 2
};

const canvas = document.createElement('canvas');

canvas.id = 'CursorLayer';
canvas.width = MEASUREMENT.width;
// canvas.height = 790;
canvas.height = MEASUREMENT.height;
canvas.style.border = '1px solid #ccc';

const ctx = canvas.getContext('2d');

if (imgSlider) {
	imgSlider.appendChild(canvas);
}

// ============================= img class =============================

class Img_Item {

	constructor(src, posY) {
		this.width = MEASUREMENT.img_width;
		this.height = MEASUREMENT.img_height;
		this.isLoaded = false;

    this.position = {
      // x: MEASUREMENT.width/2,
      x: 0,
      y: posY
    }

		this.image = new Image();
		this.image.src = src;
		this.image.onload = () => {
			this.isLoaded = true;
		};

	}

  draw() {
    // ctx.fillStyle = this.cl;
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.position.y += MEASUREMENT.gravety;
  }


}

// ============================= ctx =============================


// const item_list = [
//   new Img_Item('red', 0),
//   new Img_Item('green', MEASUREMENT.img_height * 1 + 10),
//   new Img_Item('blue', MEASUREMENT.img_height * 2 + 20)
// ]

const item_list = [
	new Img_Item(
    '/images/img_03.jpeg', 
    MEASUREMENT.starting_posY
  ),
	new Img_Item(
		'/images/img_04.jpeg', 
		MEASUREMENT.starting_posY - (MEASUREMENT.img_height + MEASUREMENT.gapY)
	),
	new Img_Item(
		'/images/img_05.jpeg', 
		MEASUREMENT.starting_posY - (MEASUREMENT.img_height * 2 + MEASUREMENT.gapY * 2)
	),
];

let posY_lastItem = 0;

const animate = () => {
	if (!ctx) return null;


	// ================= ctx update 
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, MEASUREMENT.width, MEASUREMENT.height);

	// ================= ctx update
  item_list.forEach(el => {

    el.update();

    // check if item pass the bottom
    if(el.position.y > MEASUREMENT.height) {

      if(posY_lastItem === 0) {
        const lastItem = item_list[item_list.length-1];
        posY_lastItem = lastItem.position.y - (MEASUREMENT.img_height+MEASUREMENT.gapY);
      }

      // change pos of target item
      el.position.y = posY_lastItem;
    }

  });

  if(isRunning) {
    requestAnimationFrame(animate);
  }

};

animate();

// ========================= handle event =========================

imgSlider.addEventListener('mouseenter', () => {

  // if animate is running, then stop it
  if(isRunning) {
    isRunning = false;
    animate();
  }

})

imgSlider.addEventListener('mouseleave', () => {


  // if animate is not running, then start it
  if(!isRunning) {
    isRunning = true;
    animate();
  }

})
