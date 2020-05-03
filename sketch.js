let humans = []
function setup() {
  	createCanvas(windowWidth, windowHeight)
	for(let i = 0; i < 30; i++){
		humans.push(new Human())
	}
	humans[0].infected = true
	humans[0].stats.hp = 0
}

function draw() {
	background('#fff');
	for(let human of humans){
		human.edge()
		human.move()
		human.render()
		human.recover()
		for(let other of humans){
			if((other.infected && human.infected) || human == other) continue
			if(human.intersects(other) && other.infected && !human.infected){
				let probability = random(0, 100)
				if(probability < human.stats.contraction){
					if(human.stats.contraction < 32){
						human.infected = 'carrier'
					}
					else {
						human.infected = true
					}

					human.stats.hp = 25

					human.stats.contraction = human.stats.contraction / 2
					human.velocity = p5.Vector.random2D()
					human.velocity.setMag(random(1,3))
				}
			}
		}
	}
	// if (mouseIsPressed) {
	// 	fill(0)
	// } else {
	// 	fill(255)
	// }
	// ellipse(mouseX, mouseY, 80, 80)
}
function windowResized() {
  	resizeCanvas(windowWidth, windowHeight);
}