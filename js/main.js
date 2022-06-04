const roadCanvas = document.querySelector("#road")
roadCanvas.width = 200

const networkCanvas = document.querySelector("#network")
networkCanvas.width = 300

const roadCtx = roadCanvas.getContext("2d")
const networkCtx = networkCanvas.getContext("2d")

const road = new Road(roadCanvas.width / 2, roadCanvas.width * 0.9, 3)

const N = 1000
const cars = generateCars(N)
let bestCar = cars[0]
if (localStorage.getItem("bestBrain")) {
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(
            localStorage.getItem("bestBrain")
        )

        if (i != 0) {
            NeuralNetwork.mutate(cars[i].brain, 0.1)
        }
    }
}

const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "BOT", 2),
    new Car(road.getLaneCenter(0), -300, 30, 50, "BOT", 2),
    new Car(road.getLaneCenter(2), -300, 30, 50, "BOT", 2),
    new Car(road.getLaneCenter(0), -500, 30, 50, "BOT", 2),
    new Car(road.getLaneCenter(1), -500, 30, 50, "BOT", 2),
    new Car(road.getLaneCenter(1), -700, 30, 50, "BOT", 2),
    new Car(road.getLaneCenter(2), -700, 30, 50, "BOT", 2),
]

animate()

function generateCars(N) {
    const cars = []
    for (let i = 1; i < N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"))
    }

    return cars
}

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, [])
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic)
    }

    bestCar = cars.find(
        c => c.y == Math.min(
            ...cars.map(
                c => c.y
            )
        )
    )

    roadCanvas.height = window.innerHeight
    networkCanvas.height = window.innerHeight

    roadCtx.save()
    roadCtx.translate(0, -bestCar.y + roadCanvas.height * 0.7)

    road.draw(roadCtx)
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(roadCtx, "blue")
    }

    roadCtx.globalAlpha = 0.2
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(roadCtx, "red")
    }
    roadCtx.globalAlpha = 1
    bestCar.draw(roadCtx, "red", true)

    roadCtx.restore()

    networkCtx.lineDashOffset = -time / 50
    Visualizer.drawNetwork(networkCtx, bestCar.brain)
    requestAnimationFrame(animate)
}