const roadCanvas = document.querySelector("#road")
roadCanvas.width = 200

const networkCanvas = document.querySelector("#network")
networkCanvas.width = 300

const roadCtx = roadCanvas.getContext("2d")
const networkCtx = networkCanvas.getContext("2d")

const road = new Road(roadCanvas.width / 2, roadCanvas.width * 0.9, 3)
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI")
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "BOT", 2)
]


animate()

function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, [])
    }
    car.update(road.borders, traffic)

    roadCanvas.height = window.innerHeight
    networkCanvas.height = window.innerHeight

    roadCtx.save()
    roadCtx.translate(0, -car.y + roadCanvas.height * 0.7)

    road.draw(roadCtx)
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(roadCtx, "blue")
    }
    car.draw(roadCtx, "red")

    roadCtx.restore()

    Visualizer.drawNetwork(networkCtx, car.brain)
    requestAnimationFrame(animate)
}