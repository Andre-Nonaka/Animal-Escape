

function House(x,y){
  this.x = x;
  this.y = y;
  this.radius = 16;

  this.show = function(){
    //imageMode(CENTER)
    image(houseImg,this.x, this.y);
  }
}