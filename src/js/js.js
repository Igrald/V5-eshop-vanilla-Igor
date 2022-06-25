const App = {
    init(){
        console.log("Start");

        // this.controllers.createLayout()
        // this.controllers.router()


        const md = this.controllers.createModal("ooooo")
        const btn = this.controllers.createButtons("click-me", "default", ()=>{
            console.log("click");
            this.controllers.openModal(md)
        })


        this.elements.root.appendChild(md)
        this.elements.root.appendChild(btn)


        // const card = this.controllers.createCard("./assets/bg.png")
        // this.elements.root.appendChild(card)
        
        // const card3 = this.controllers.createCard("https://cdna.artstation.com/p/assets/images/images/049/529/802/medium/noah-alonzo-noahalonzo-wickerwitch-presentation-page21-5-12-22.jpg?1652719476")
        // this.elements.root.appendChild(card3)

        // const card1 = this.controllers.createCard("https://cdnb.artstation.com/p/assets/images/images/049/387/821/medium/heri-irawan-lady-lake-01.jpg?1652370695")
        // this.elements.root.appendChild(card1)

        // const card2 = this.controllers.createCard("https://cdna.artstation.com/p/assets/images/images/050/791/348/medium/rebeca-puebla-punchline-md.jpg?1655721716")
        // this.elements.root.appendChild(card2)

        //-------------buttons-------------//

        // const bt = this.controllers.createButtons("opa", "primary", ()=>{
        //     console.log("click");
        // })
        // const bt2 = this.controllers.createButtons("opa2", "secondary")
        // const bt3 = this.controllers.createButtons("opa3", "tertiary")
        // const bt4 = this.controllers.createButtons("opa4", "default")
        // this.elements.root.appendChild(bt)
        // this.elements.root.appendChild(bt2)
        // this.elements.root.appendChild(bt3)
        // this.elements.root.appendChild(bt4)

        //-------------buttons-------------//
        
        console.log("End");
    }
}

