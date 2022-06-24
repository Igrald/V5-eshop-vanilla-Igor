const App = {
    init(){
        console.log("Start");

        // this.controllers.createLayout()
        // this.controllers.router()

        const bt = this.controllers.createButtons("opa")

        this.elements.root.appendChild(bt)
        
        console.log("End");
    }
}

