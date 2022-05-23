var canvasElem = '.canvas-wrapper'
var scoreElem = '.realtime-score'
var maxScoreElem = '.max-score'



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}



class Config {
    constructor() {
        this.step = 0
        this.maxStep = 5
        this.sizeCell = 16
        this.sizeBerry = this.sizeCell / 3.5
        this.color = '#910033'
        this.lColor = '#E10056'
    }

    setMaxStep(maxStep) {
        this.maxStep = maxStep
    }

    setSkin(skin) {
        if (skin == 1) {
            this.color = '#910033'
            this.lColor = '#E10056'
        }
        else if (skin == 2) {
            this.color = '#120286'
            this.lColor = '#1C00EC'
        }
        else if (skin == 3) {
            this.color = '#BA0100'
            this.lColor = '#FF0100'
        }
    }
}



class Canvas {
    constructor(container) {
        this.element = document.createElement('canvas')
        this.context = this.element.getContext('2d')

        this.element.id = "game"
        this.element.width = 400
        this.element.height = 400

        container.appendChild(this.element)
    }
}



class GameLoop {
    constructor(update, draw) {
        this.update = update
        this.draw = draw

        this.config = new Config()

        this.animate = this.animate.bind(this)
        this.animate()
    }

    setMaxStep(maxStep) {
        this.config.setMaxStep(maxStep)
    }

    animate() {
        requestAnimationFrame(this.animate)
        if (++this.config.step < this.config.maxStep)
            return

        this.config.step = 0

        this.update()
        this.draw()
    }
}



class Game {
    constructor(container) {
        this.canvas = new Canvas(container)
        this.score = new Score(scoreElem, maxScoreElem)
        this.snake = new Snake(this.canvas)
        this.berry1 = new Berry(this.canvas)
        this.berry2 = new Berry(this.canvas)
        this.berry3 = new Berry(this.canvas)
        this.berries = [this.berry1, this.berry2, this.berry3]
        this.speed = localStorage.getItem('speed') || 3
        this.skin = localStorage.getItem('skin') || 1
        this.foodNum = localStorage.getItem('foodNum') || 1
        this.gameLoop = new GameLoop(this.update.bind(this), this.draw.bind(this))
        this.init()
    }

    init() {
        this.setSpeed(this.speed)
        this.setFood(this.foodNum)
        this.setSkin(this.skin)
    }

    setSpeed(speed) {
        const addClass = (item, className) => document.querySelector(item).classList.add(className)
        const removeClass = (item, className) => document.querySelector(item).classList.remove(className)
        const activate = item => addClass(item, 'active')
        const deactivate = item => removeClass(item, 'active')

        this.speed = speed
        this.gameLoop.setMaxStep(speed * 1.3)
        deactivate("#speed1")
        deactivate("#speed2")
        deactivate("#speed3")
        deactivate("#speed4")
        deactivate("#speed5")
        activate(`#speed${speed}`);

        this.save()
    }

    setFood(food) {
        const addClass = (item, className) => document.querySelector(item).classList.add(className)
        const removeClass = (item, className) => document.querySelector(item).classList.remove(className)
        const activate = item => addClass(item, 'active')
        const deactivate = item => removeClass(item, 'active')

        this.foodNum = food
        deactivate("#food1")
        deactivate("#food2")
        deactivate("#food3")
        activate(`#food${food}`)

        this.save()
    }

    setSkin(skin) {
        const addClass = (item, className) => document.querySelector(item).classList.add(className)
        const removeClass = (item, className) => document.querySelector(item).classList.remove(className)
        const activate = item => addClass(item, 'active')
        const deactivate = item => removeClass(item, 'active')

        this.skin = skin
        this.snake.setSkin(skin)
        this.berries.forEach((el) => el.setSkin(skin))

        deactivate("#skin1")
        deactivate("#skin2")
        deactivate("#skin3")
        activate(`#skin${skin}`)

        removeClass('#canvas-flex', 'color-pink')
        removeClass('#canvas-flex', 'color-blue')
        removeClass('#canvas-flex', 'color-red')
        if (skin == 1) addClass('#canvas-flex', 'color-pink')
        else if (skin == 2) addClass('#canvas-flex', 'color-blue')
        else if (skin == 3) addClass('#canvas-flex', 'color-red')

        this.save()
    }

    update() {
        this.checkButtons()
        this.snake.update(this.berries, this.foodNum, this.score, this.canvas)
    }

    save() {
        localStorage.setItem('speed', this.speed)
        localStorage.setItem('skin', this.skin)
        localStorage.setItem('foodNum', this.foodNum)
    }

    draw() {
        this.canvas.context.clearRect(0, 0, this.canvas.element.width, this.canvas.element.height)
        this.snake.draw(this.canvas.context)

        // this.berry.draw(this.canvas.context)
        for (let i = 0; i < this.foodNum; i++) {
            this.berries[i].draw(this.canvas.context)
        }
    }

    checkButtons() {
        const addClass = (item, className) => document.querySelector(item).classList.add(className)
        const removeClass = (item, className) => document.querySelector(item).classList.remove(className)
        const hide = item => addClass(item, 'hidden')
        const unhide = item => removeClass(item, 'hidden')

        /// speed
        $(document).on("click", "#speed1", () => this.setSpeed(1))
        $(document).on("click", "#speed2", () => this.setSpeed(2))
        $(document).on("click", "#speed3", () => this.setSpeed(3))
        $(document).on("click", "#speed4", () => this.setSpeed(4))
        $(document).on("click", "#speed5", () => this.setSpeed(5))

        /// food
        $(document).on("click", "#food1", () => this.setFood(1));
        $(document).on("click", "#food2", () => this.setFood(2));
        $(document).on("click", "#food3", () => this.setFood(3));

        /// skins
        $(document).on("click", "#skin1", () => this.setSkin(1));
        $(document).on("click", "#skin2", () => this.setSkin(2));
        $(document).on("click", "#skin3", () => this.setSkin(3));

        // go to Skins
        $(document).on("click", "#goto-skins", () => {
            hide('#food')
            unhide('#skins')
        });

        // go to Food
        $(document).on("click", "#goto-food", () => {
            unhide('#food')
            hide('#skins')
        });
    }
}



class Score {
    constructor(scoreBlock, maxScoreBlock, score = 0, maxScore = 0) {
        this.scoreBlock = document.querySelector(scoreBlock)
        this.maxScoreBlock = document.querySelector(maxScoreBlock)
        this.score = score
        this.maxScore = localStorage.getItem("maxScore") || maxScore
        this.draw()
    }

    incScore() {
        this.score++
        if (this.score > this.maxScore)
            this.maxScore = this.score
        this.draw()
    }

    clear() {
        // if (this.score > this.maxScore)
        //     this.maxScore = this.score
        this.score = 0
        this.draw()
    }

    save() {
        localStorage.setItem("maxScore", this.maxScore)
    }

    draw() {
        this.scoreBlock.innerHTML = `Score: ${this.score}`
        this.maxScoreBlock.innerHTML = `Max Score: ${this.maxScore}`
        this.save()
    }
}



class Berry {
    constructor(canvas) {
        this.canvas = canvas
        this.config = new Config()
        this.x = 0
        this.y = 0
        this.size = 5
        this.coordCorrection = this.size / 2
        this.shadowBlur = 4

        this.randomPosition()
    }

    setSkin(skin) {
        this.config.setSkin(skin)
    }

    draw(context) {
        context.beginPath()
        context.fillStyle = this.config.lColor
        context.shadowColor = this.config.lColor
        context.shadowBlur = this.config.shadowBlur
        // context.arc(this.x + (this.config.sizeCell / 2), this.y + (this.config.sizeCell / 2), this.config.sizethis, 0, 2 * Math.PI)
        // context.fill()
        context.fillRect(this.x + this.coordCorrection, this.y + this.coordCorrection, this.config.sizeCell - this.size, this.config.sizeCell - this.size)
    }

    randomPosition() {
        this.x = getRandomInt(0, this.canvas.element.width / this.config.sizeCell) * this.config.sizeCell
        this.y = getRandomInt(0, this.canvas.element.height / this.config.sizeCell) * this.config.sizeCell
    }
}



class Snake {
    constructor(canvas) {
        this.canvas = canvas
        this.config = new Config()
        this.x = getRandomInt(0, this.canvas.element.width / this.config.sizeCell) * this.config.sizeCell
        this.y = getRandomInt(0, this.canvas.element.height / this.config.sizeCell) * this.config.sizeCell
        this.dx = this.config.sizeCell
        this.dy = 0
        this.tails = []
        this.maxTails = 3
        this.shadowBlur = 30

        this.control()
    }

    setSkin(skin) {
        this.config.setSkin(skin)
    }

    randomPosition() {
        this.x = getRandomInt(0, this.canvas.element.width / this.config.sizeCell) * this.config.sizeCell
        this.y = getRandomInt(0, this.canvas.element.height / this.config.sizeCell) * this.config.sizeCell
    }

    incMaxTails() {
        this.maxTails++
    }

    update(berries, foodNum, score, canvas) {
        this.x += this.dx
        this.y += this.dy

        if (this.x < 0)
            this.x = canvas.element.width - this.config.sizeCell
        else if (this.x >= canvas.element.width)
            this.x = 0

        if (this.y < 0)
            this.y = canvas.element.height - this.config.sizeCell
        else if (this.y >= canvas.element.height)
            this.y = 0

        this.tails.unshift({ x: this.x, y: this.y })

        if (this.tails.length > this.maxTails)
            this.tails.pop()

        this.tails.forEach((el, index) => {
            // if (el.x == berry.x && el.y == berry.y) {
            //     this.incMaxTails()
            //     score.incScore()
            //     berry.randomPosition()
            // }
            for (let i = 0; i < foodNum; i++) {
                if (el.x == berries[i].x && el.y == berries[i].y) {
                    this.incMaxTails()
                    score.incScore()
                    berries[i].randomPosition()
                }
            }

            for (let i = index + 1; i < this.tails.length; i++) {
                if (el.x == this.tails[i].x && el.y == this.tails[i].y) {
                    this.death()
                    score.clear()
                    berries.forEach((el) => el.randomPosition())
                }
            }
        })
    }

    draw(context) {
        this.tails.forEach((el, index) => {
            if (index == 0)
                context.fillStyle = this.config.lColor
            else
                context.fillStyle = this.config.color

            context.shadowColor = this.config.lColor
            context.shadowBlur = this.shadowBlur
            context.fillRect(el.x, el.y, this.config.sizeCell, this.config.sizeCell)
        })
    }

    death() {
        this.randomPosition()
        this.dx = this.config.sizeCell
        this.dy = 0
        this.tails = []
        this.maxTails = 3
    }

    control() {
        document.addEventListener("keydown",  (e) => {
			if (e.code == "KeyW" && this.dy === 0) {
				this.dy = -this.config.sizeCell;
				this.dx = 0;
			}
            else if (e.code == "KeyA" && this.dx === 0) {
				this.dx = -this.config.sizeCell;
				this.dy = 0;
			}
            else if (e.code == "KeyS" && this.dy === 0) {
				this.dy = this.config.sizeCell;
				this.dx = 0;
			}
            else if (e.code == "KeyD" && this.dx === 0) {
				this.dx = this.config.sizeCell;
				this.dy = 0;
			}
		})
    }
}

new Game(document.querySelector(canvasElem))