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
    },
    createButtons(text, type = "primary", onClick){
        const bt = document.createElement("button")
        
        const bts = bt.style

        bt.innerHTML = text
        bt.onclick = onClick

        bts.display = "flex"
        bts.flexDirection = "column"
        bts.justifyContent = "center"
        bts.alignItems = "center"
        bts.padding = "5px 16px"
        bts.width = "fit-content"
        bts.height = "32px"
        bts.borderRadius = "20px"
        bts.color = "#FFFFFF"
        bts.border = "none"
        bts.fitContent = ""

        if(type == "primary"){
            bts.backgroundColor = "#000000"
            bts.boxShadow = "0px 2px 0px rgba(0, 0, 0, 0.043)"
        }

        if(type == "secondary"){
            bts.backgroundColor = "rgba(0, 0, 0, 0.6)"
            bts.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)"
        }
        if(type == "tertiary"){
            bts.backgroundColor = "rgba(0, 0, 0, 0.2)"
            bts.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)"
            bts.color= "#000000"
        }
        if(type == "default"){
            bts.backgroundColor = "#FFFFFF;"
            bts.boxShadow = "0px 2px 0px rgba(0, 0, 0, 0.043)"
            bts.color = "#000000"
            bts.border = "2px solid #000000"
        }

        return bt
    },
    createCard(image){
        const card = document.createElement("div")
        const img = document.createElement("img")
        const div = document.createElement("div")
        const title = document.createElement("div")
        const usd = document.createElement("div")
        const desc = document.createElement("div")
        const button = this.createButtons("add cart", "primary", ()=>{
            console.log("click");
        })

       //----const-styles-------//
        const cards = card.style
        const imgs = img.style
        const divs = div.style
        const titles = title.style
        const usds = usd.style
        const descs = desc.style
       //----const-styles-------//

        //---------styles----//image//-----//
        cards.display = "flex"
        cards.flexDirection = "column"
        cards.alignItems = "center"
        cards.padding = "0px"
        cards.border = "1px solid black",
        cards.justifyContent = "center"
        // cards.gap = "40px"
        // cards.width = "306px"
        // cards.height = "457px"

        divs.width = "300px"
        divs.textAlign = "center"
        divs.position = "relative"
        divs.height = "300px"
        divs.borderRadius = "50%"
        divs.overflow = "hidden"

        img.src = image  //----image----//

        imgs.position = "absolute"
        imgs.width = "100%"
        imgs.height = "100%"
        imgs.top = "0"
        imgs.left = "0"
        imgs.objectFit = "cover"

        title.innerHTML = "Title"
        titles.fontWeight = "700"
        titles.fontSize = "16px"
        titles.lineHeight = "19px"
        titles.color = "#000000"
        titles.marginTop = "40px"

        usd.innerHTML = "USD 2"
        usds.fontWeight = "400"
        usds.fontSize = "16px"
        usds.lineHeight = "19px"
        usds.color = "#000000"
        usds.marginTop = "4px"

        desc.innerHTML = "Description of the product"
        descs.fontWeight = "400"
        descs.fontSize = "16px"
        descs.lineHeight = "19px"
        descs.color = "#000000"
        descs.marginTop = "4px"

        button.style.marginTop = "4px"
        //---------styles---------//

        card.appendChild(div)
        div.appendChild(img)
        card.appendChild(title)
        card.appendChild(usd)
        card.appendChild(desc)
        card.appendChild(button)


        return card
    },
    createModal(children){
        const closeModal = ()=>{
            console.log("close");
            this.closeModal(md)
        }
        const modal = document.createElement("div")
        const md = document.createElement("div")
        const close = document.createElement("div")
        const body = document.createElement("div")
        const footer = document.createElement('div')
        const cancel = this.createButtons("cancel", "tertiary", closeModal) 
        const confirm = this.createButtons("confirm", "secondary") 
        

        //----const-styles-------//
        const closes = close.style
        const mds = md.style
        const fts = footer.style
        const cancels = cancel.style
        const modals = modal.style
        //----const-styles-------//


        //---------styles---------//
        mds.display = "flex"
        mds.justifyContent = "center"
        mds.alignItems = "center"
        mds.position = "fixed"
        mds.top = "0"
        mds.left = "0"
        mds.width = "100%"
        mds.height = "100%"
        mds.backgroundColor = "#9c9c9c"

        modals.display = "flex"
        modals.background = "#FFFFFF"
        modals.borderRadius = "4px"
        modals.width = "fit-content"
        modals.flexDirection = "column"

        closes.display = "flex"
        closes.justifyContent = "center"
        closes.alignItems = "center"
        closes.padding = "10px"
        closes.cursor = "pointer"
        closes.width = "fit-content"
        closes.alignSelf = "flex-end"
        closes.backgroundColor = "rgba(0, 0, 0, 0.6)"
        closes.color = "#FFFFFF"
        closes.weight = "400"
        closes.fontsize = "12px"
        closes.lineHeight = "15px"
        closes.textAlign = "center"
        closes.borderRadius = "4px"
        closes.margin = "11px 12px 0px 0px"
        

        fts.display = "flex"
        fts.justifyContent = "space-between"
        fts.margin = "45px 82px 71px 81px"

        cancels.cursor = "pointer"
        cancels.marginRight = "24px"
        //---------styles---------//


        //----------HTML----------//
        body.innerHTML = children
        close.innerHTML = "X"
        //----------HTML----------//


        //--------Actions--------//
        close.onclick = closeModal
        md.classList.add("backdrop")
        md.onclick = (e)=>{
            if(e.target.classList.contains("backdrop")){
                closeModal()
            }
        }
        //--------Actions--------//


        modal.appendChild(close)
        modal.appendChild(body)
        modal.appendChild(footer)
        footer.appendChild(cancel)
        footer.appendChild(confirm)
        md.appendChild(modal)

        return md
    },
    openModal(el){
        el.style.display = "flex"
    },
    closeModal(el){
        el.style.display = "none"
    },
    }

