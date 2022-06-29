class carousel{
    config = {}
    imageEls = []

    container = null
    leftContainer = null
    imgContainer = null
    rightContainer = null

    currentImgIdx = 0

    /*
     @param {Objetc} config
     @param {HTMLElement} config.container
     @param {array<string>} config.images
    */

    constructor(config){
        this.config = config
        this.container = config.container

        this.createElements()
        this.preLoadImages()
        this.renderImg()
    }
    
    renderImg(){
        this.imgContainer.innerHTML = ""
        this.imgContainer.appendChild(this.imageEls[this.currentImgIdx])
    }

    createElements() {
        //------------------crateElements------------------//
        this.leftContainer = document.createElement("div")
        this.imgContainer = document.createElement("div")
        this.rightContainer = document.createElement("div")
        const caretLeft = document.createElement("img")
        const caretRight = document.createElement("img")
        //------------------crateElements------------------//

        //--------------------styles--------------------//
        caretLeft.src = "./assets/caret.svg"
        caretLeft.style.transform = "rotate(270deg)"
        caretLeft.style.width = "35px"

        caretRight.src = "./assets/caret.svg"
        caretRight.style.transform = "rotate(90deg)"
        caretRight.style.width = "35px"

        this.container.style.display = "flex"
        this.container.style.alignItems = "center"

        this.leftContainer.style.cursor = "pointer"
        this.leftContainer.style.display = "flex"

        this.imgContainer.style.margin = "3px"

        this.rightContainer.style.cursor = "pointer"
        this.rightContainer.style.display = "flex"
        //--------------------styles--------------------//

        //--------------------onClick--------------------//
        this.leftContainer.onclick = () => {
            this.currentImgIdx--

            if(this.currentImgIdx < 0){
                this.currentImgIdx = this.imageEls.length -1
            }

            this.renderImg()
        }

        this.rightContainer.onclick = () => {
            this.currentImgIdx++

            if(this.currentImgIdx > this.imageEls.length -1){
                this.currentImgIdx = 0
            }

            this.renderImg()
        }
        //--------------------onClick--------------------//


        //--------------------Append--------------------//
        this.leftContainer.appendChild(caretLeft)
        this.rightContainer.appendChild(caretRight)

        this.container.appendChild(this.leftContainer)
        this.container.appendChild(this.imgContainer)
        this.container.appendChild(this.rightContainer)
        //--------------------Append--------------------//
    }

    preLoadImages(){
        this.config.images.forEach((img, i) => {
            const els = document.createElement("img")

            els.src = this.config.images[i]

            //----------styles----------//
            els.style.objectFit = "cover"
            els.style.borderRadius = "50%"
            els.style.maxHeight = "300px"
            els.style.maxWidth = "300px"
            els.style.height = "300px"
            els.style.width = "300px"
            els.style.margin = "2px"
            //----------styles----------//

            this.imageEls.push(els)
        })
    }

}
