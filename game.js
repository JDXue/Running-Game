//with help from frank poth's tutorial https://github.com/frankarendpoth/frankarendpoth.github.io/tree/master/content/pop-vlog/javascript/2017/009-control

// Frank Poth 08/13/2017

var context, controller, player, loop;
var stageheight = 300;
var stagewidth = 540;

context = document.querySelector("canvas").getContext("2d");

context.canvas.height = stageheight;
context.canvas.width = stagewidth;

player = {

  height:10,
  jumping:true,
  width:10,
  x:144, // center of the canvas
  x_velocity:0,
  y:0,
  y_velocity:0

};

controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

      case 37:// left key
        controller.left = key_state;
      break;
      case 38:// up key
        controller.up = key_state;
      break;
      case 39:// right key
        controller.right = key_state;
      break;

    }

  }

};

loop = function() {

  if (controller.up && player.jumping == false) {

    player.y_velocity -= 20;
    player.jumping = true;

  }

  if (controller.left) {

    player.x_velocity -= 0.5;

  }

  if (controller.right) {

    player.x_velocity += 0.5;

  }

  player.y_velocity += 0.5;// gravity
  player.x += player.x_velocity;
  player.y += player.y_velocity;
  player.x_velocity *= 0.9;// friction
  player.y_velocity *= 0.9;// friction

  // if player is falling below floor line
  if (player.y > stageheight - 5 - 32) {

    player.jumping = false;
    player.y = stageheight - 5 - 32;
    player.y_velocity = 0;

  }

  // if player is going off the left of the screen
  if (player.x < -32) {

    player.x = stagewidth;

  } else if (player.x > stagewidth) {// if player goes past right boundary

    player.x = -32;

  }

  context.fillStyle = "#202020";
  context.fillRect(0, 0, stagewidth, stageheight);// x, y, width, height
  context.fillStyle = "#ffffff";// hex for red
  context.beginPath();
  context.arc(player.x, player.y, 15, player.width, player.height*Math.PI,false);
  context.fill();
  context.strokeStyle = "#202830";
  context.lineWidth = 4;
  context.beginPath();
  context.moveTo(0, 284);
  context.lineTo(stagewidth, 284);
  context.stroke();

  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);
