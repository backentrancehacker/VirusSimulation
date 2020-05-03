class Human{
	constructor(){
		this.position = createVector(random(width), random(height))
		
		this.maxSpeed = 3
		this.radius = 17.5

		this.stats = {
			recovery: Math.random(2) * 2,
			contraction: random(30, 60),
			hp: 100,
			max_hp: 100
		}
		this.infected = false

		this.velocity = p5.Vector.random2D()
		this.velocity.setMag(random(1,3))
		this.acceleration = createVector()
	}
	recover(){
		if(this.stats.hp < 100){
			this.stats.hp += this.stats.recovery / 20
		}
		if(this.stats.hp > 90 && this.infected != 'carrier'){
			this.infected = false
		}
	}
	move(){
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.acceleration.mult(0)

	}
	render(){
		stroke('#fff')
		fill("#afa")
		rect(this.position.x - 35, this.position.y - 50, 70, 10, 10)
		
		fill("#02eb02")
		rect(this.position.x - 35, this.position.y - 50, 70 * (this.stats.hp / this.stats.max_hp), 10, 10)

		stroke('#000')

		// if
		switch(this.infected){
			case true: 
				fill('#B53737')
				break
			case false:
				fill('#fff')
				break
			default: 
				fill('#ffff00')
		}

		ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2)
	}	
	intersects(other){
		let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
		if(d < this.radius + other.radius + 10) return true
		else return false
	}
	edge(){
		if (this.position.x > width){
			this.position.x = 0
		}
		else if (this.position.x < 0){
			this.position.x = width
		}
		if (this.position.y > height){
			this.position.y = 0
		}
		else if (this.position.y < 0){
			this.position.y = height
		}
	}
}