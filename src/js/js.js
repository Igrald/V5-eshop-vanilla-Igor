const App = {
    init(){
        console.log("Start");

        // this.controllers.createLayout()
        // this.controllers.router()

        const bt = this.controllers.createButtons("opa", "primary", ()=>{
            console.log("click");
        })
        const bt2 = this.controllers.createButtons("opa2", "secundary")
        const bt3 = this.controllers.createButtons("opa3", "terciary")
        const bt4 = this.controllers.createButtons("opa4", "default")

        this.elements.root.appendChild(bt)
        this.elements.root.appendChild(bt2)
        this.elements.root.appendChild(bt3)
        this.elements.root.appendChild(bt4)
        
        console.log("End");
    }
}

