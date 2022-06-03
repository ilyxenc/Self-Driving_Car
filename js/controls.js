class Controls {
    constructor(type) {
        this.forward = false
        this.reverse = false
        this.left = false
        this.right = false

        switch (type) {
            case "MY":
                this.#addKeyboarListeners()
                break
            case "BOT":
                this.forward = true
                break
        }
    }

    #addKeyboarListeners() {
        document.onkeydown = (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    this.left = true
                    break
                case "ArrowRight":
                    this.right = true
                    break
                case "ArrowUp":
                    this.forward = true
                    break
                case "ArrowDown":
                    this.reverse = true
                    break
            }
        }

        document.onkeyup = (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    this.left = false
                    break
                case "ArrowRight":
                    this.right = false
                    break
                case "ArrowUp":
                    this.forward = false
                    break
                case "ArrowDown":
                    this.reverse = false
                    break
            }
        }
    }
}