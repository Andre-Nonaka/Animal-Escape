function Cat(x, y, img) {
  this.x = x;
  this.y = y;
  this.img = img;
  this.direction = 0;
  this.radius = 16;
      this.frame = 0;
  this.movement = true;
this.isWeak = false;
  this.show = function() {
    if(this.isWeak === false)
    image(img, this.x, this.y, 32, 32, 0 ,0, 32, 32);

    else {
      image(weakCat,this.x,this.y,32,32,0,0,32,32)   
    }
  }

  this.move = function(bricks) {
    if(this.movement === false){
    var d = floor(random(4));
    this.direction = d;
    }
    var lastx = this.x;
    var lasty = this.y;

     if(this.direction === 0){
      this.x += 16;
    }
    if(this.direction === 1){
      this.y += 16;
    }
        if(this.direction === 2){
      this.x -= 16;
  }
        if(this.direction === 3){
      this.y -= 16;
}
    for(var i = 0; i < bricks.length; i++ ){
      if(this.colission(bricks[i])){
      this.x = lastx;
      this.y = lasty;
      this.movement = false;
      this.move(bricks);
    }
      else {
        this.movement = true;
    }
    }
        if(this.x < 0)
      this.x = width - 32;
    if(this.x >= width)
      this.x = 0;
}

this.colission = function(house){
      var dis = dist(this.x, this.y, house.x, house.y);
      if(dis<this.radius + house.radius)
        return true;
      return false;
  }
  this.leave = function(p) {
   if(p.platform[this.y / 32-2] [this.x / 32] === 'd')
     this.y -= 64;
   if(p.platform[this.y / 32-3] [this.x / 32] === 'd')
     this.y -= 96;
  }
}
