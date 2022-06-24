App.controllers = {

    getPage(){
        const paramsString = window.location.search;
        const searchParams = new URLSearchParams(paramsString);
        const page = searchParams.get("p")
        return page
    },
    router(){
        setInterval(()=>{

            const page = this.getPage()
            if(page === "cart"){
                this.createCheckout()
            }else if(!page){
                this.createMain()
            }else{

            }


        },100)
    },
    go(p){
        history.pushState({ p }, "", App.state.routes[p])
    },
    createHeader(){
        const els = App.elements

        const header = els.header

        header.container.style.background = "rgba(102, 102, 102, 0.3)"
        header.container.style.display = "flex"
        header.container.style.justifyContent = "space-between"
        header.container.style.alignItems = "center"
        header.container.style.position = "fixed"
        header.container.style.top = "0"
        header.container.style.width = "100%"

        header.logo.src =  "./assets/logo.png"
        header.logo.style.margin = "35px 0 35px 48px" 
        header.logo.style.cursor = "pointer"
        header.logo.onclick=()=>{
            App.controllers.go("home")
        }
        header.cartIcon.src =  "./assets/carrinho.png"
        header.cartIcon.style.width = "36px"
        header.cartIcon.style.height= "36px"
        header.cartIcon.style.marginRight = "53px"
        header.cartIcon.style.cursor= "pointer"
        header.cartIcon.onclick = ()=>{
            App.controllers.go("cart")
        }


        header.container.appendChild(header.logo)
        header.container.appendChild(header.cartIcon)

        els.root.appendChild(header.container)

    },
    createMain(){
        const els = App.elements
        const main = els.main.main

        main.bg.src = "./assets/bg.png"
        main.bg.style.width = "100%"

        main.h1.innerText = "our produtcs"
        main.h1.style.fontSize = "24px"
        main.h1.style.fontStyle = "normal"
        main.h1.style.fontWeight = "700"
        main.h1.style.lineHeight = "29px"
        main.h1.style.textAlign = "center"
        main.h1.style.color = "#000000" 
        
        main.p.innerText = 
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy tincidunt ut laoreet dolore magna aliquam erat volutpat."

        main.p.style.fontSize = "24px"
        main.p.style.fontStyle = "normal"
        main.p.style.fontWeight = "400"
        main.p.style.lineHeight = "29px"
        main.p.style.textAlign = "center"
        main.p.style.color = "#000000" 

        main.container.appendChild(main.bg)
        main.container.appendChild(main.h1)
        main.container.appendChild(main.p)

        els.main.container.innerHTML= ""
        els.main.container.appendChild(main.container)
    },
    createFooter(){
        const els = App.elements
        const footer = els.footer

        footer.logo.src =  "./assets/logo.png"

        footer.container.style.display = "flex"
        footer.container.style.justifyContent = "center"
        footer.container.style.alignItems = "center"
        footer.container.style.background = "#000000"
        footer.container.style.padding = "50px"

        footer.container.appendChild(footer.logo)
        els.root.appendChild(footer.container)
    },
    createCheckout(){
        const els = App.elements
        const {container, tittle, items, confirmBtn, confirmBtnContainer} = els.main.checkout
        
        container.style.backgroundColor = "#CCCCCC"
        container.style.height = "100%"
        container.style.padding = "230px" 


        tittle.innerText = "My cart [ Total Amount : xx ]"
        tittle.style.fontStyle = "normal"
        tittle.style.fontSize = "24px"
        tittle.style.fontWeight = "700"
        tittle.style.height = "29px"
        tittle.style.textAlign = "center"
        tittle.style.color = "#000000"

        confirmBtn.innerText = "Confirm purchase"
        confirmBtn.classList.add("btn")
        confirmBtnContainer.style.textAlign = "center"
        confirmBtnContainer.appendChild(confirmBtn)

        container.appendChild(tittle)
        container.appendChild(confirmBtnContainer)

        els.main.container.innerHTML= ""
        els.main.container.appendChild(container)
    },
    createButtons(text){
        const bt = document.createElement("button")
        
        const bts = bt.style

        bt.innerHTML = text

        bts.display = "flex"
        bts.flexDirection = "column"
        bts.justifyContent = "center"
        bts.alignItems = "center"
        bts.padding = "5px 16px"
        bts.width = "84px"
        bts.height = "32px"
        bts.backgroundColor = "#000000"
        bts.boxShadow = "0px 2px 0px rgba(0, 0, 0, 0.043)"
        bts.borderRadius = "20px"
        bts.color = "#FFFFFF"

        return bt
    },
    createLayout(){
        const els = App.elements

        els.root.style.height = "100vh"
        els.root.style.display = "flex"
        els.root.style.flexDirection = "column"

        this.createHeader()


        //this.createMain()
        //this.createCheckout()
        els.main.container.style.flexGrow = "1"
        els.root.appendChild(els.main.container)

        this.createFooter()
}
}

