App.controllers = {

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

        header.cartIcon.src =  "./assets/carrinho.png"
        header.cartIcon.style.width = "36px"
        header.cartIcon.style.height= "36px"
        header.cartIcon.style.marginRight = "53px"
        header.cartIcon.style.cursor= "pointer"
        header.cartIcon.onclick = ()=>{
            console.log("click cart");
        }


        header.container.appendChild(header.logo)
        header.container.appendChild(header.cartIcon)

        els.root.appendChild(header.container)

    },
    createMain(){
        const els = App.elements
        const main = els.main.main
        console.log(main);

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
        const {container, tittle, items, confirmBtn} = els.main.checkout
        
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

        const btn = document.createElement("button")
        btn.innerText = "Confirm purchase"
        btn.classList.add("btn")
        confirmBtn.style.textAlign = "center"

        confirmBtn.appendChild(btn)
        container.appendChild(tittle)
        container.appendChild(confirmBtn)
        els.main.container.appendChild(container)
    },
    createLayout(){
        const els = App.elements

        els.root.style.height = "100vh"
        els.root.style.display = "flex"
        els.root.style.flexDirection = "column"

        this.createHeader()


        //this.createMain()
        this.createCheckout()
        els.main.container.style.flexGrow = "1"
        els.root.appendChild(els.main.container)

        this.createFooter()
}
}
