App.controllers = {
  getPage() {
    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString);
    const page = searchParams.get("p");
    return page;
  },
  router() {
    setInterval(() => {
      if (App.state.routeRendered) {
        return;
      }

      const page = this.getPage();
      if (page === "cart") {
        this.createCheckout();
      } else if (!page) {
        this.createMain();
      } else {
      }

      App.state.routeRendered = true;
    }, 100);
  },
  go(p) {
    App.state.routeRendered = false;
    history.pushState({ p }, "", App.state.routes[p]);
  },
  confirmPurchase() {
    console.log("olá");

    const res = confirm("Are you sure?");
    if (res) {
      App.state.cart = [];
      App.elements.header.cartCount.innerText = App.state.cart.length;

      this.go("home");
      alert("Thanks for purchase!");
    }
  },
  createProductsElements(container) {
    App.state.products.forEach((products) => {
      const card = this.createCard(
        products.ttl,
        products.description,
        products.price,
        products.images,
        "Add to cart",
        () => {
          const md = this.createModal(
            () => {
              const added = App.state.mutations.addToCart(products);
              this.closeModal(md);

              if (added === "OK") {
                App.elements.header.cartCount.innerText = App.state.cart.length;
              }
              if (added === "EXISTS") {
              }
            },
            "priceAdd",
            products.ttl,
            products.price
          );
          App.elements.root.appendChild(md);
        }
      );

      container.appendChild(card);
    });
  },
  createCartElements(container) {
    App.state.cart.forEach((products) => {
      const card = this.createCard(
        products.ttl,
        products.description,
        products.price,
        products.images,
        "Remove from cart",
        () => {
          const md = this.createModal(
            () => {
              App.state.mutations.removeFromCart(products);
              App.elements.header.cartCount.innerText = App.state.cart.length;
              App.controllers.createCheckout();

              this.closeModal(md);
            },
            "priceRemove",
            products.ttl,
            products.price
          );
          App.elements.root.appendChild(md);
        }
      );

      container.appendChild(card);
    });
  },
  createHeader() {
    const els = App.elements;
    const header = els.header;
    const cartS = header.cartContainer.style;
    const cartCs = header.cartCount.style;

    //---------------------------style---------------------------//
    header.container.style.background = "rgba(102, 102, 102, 0.3)";
    header.container.style.display = "flex";
    header.container.style.justifyContent = "space-between";
    header.container.style.alignItems = "center";
    header.container.style.position = "fixed";
    header.container.style.top = "0";
    header.container.style.width = "100%";
    header.container.style.transition = "top 0.3s";

    header.logo.src = "./assets/logo.png";
    header.logo.style.margin = "35px 0 35px 48px";
    header.logo.style.cursor = "pointer";

    header.cartIcon.src = "./assets/carrinho.png";
    header.cartIcon.style.width = "36px";
    header.cartIcon.style.height = "36px";
    header.cartIcon.style.cursor = "pointer";

    cartS.display = "flex";
    cartS.width = "80px";
    cartS.marginRight = "53px";
    cartS.alignItems = "center";

    cartCs.marginTop = "15px";
    cartCs.marginRight = "-1rem";
    cartCs.color = "white";
    //---------------------------style---------------------------//

    //------------------------onAction------------------------//
    header.cartIcon.onclick = () => {
      App.controllers.go("cart");
    };
    header.logo.onclick = () => {
      App.controllers.go("home");
    };

    var scroll = window.pageYOffset;
    window.onscroll = () => {
      var currentScroll = window.pageYOffset;
      if (scroll > currentScroll) {
        header.container.style.top = "0";
      } else {
        header.container.style.top = "-6rem";
      }
      scroll = currentScroll;
    };
    //------------------------onAction------------------------//

    header.cartCount.innerText = App.state.cart.length;

    header.container.appendChild(header.logo);
    header.cartContainer.appendChild(header.cartIcon);
    header.cartContainer.appendChild(header.cartCount);
    header.container.appendChild(header.cartContainer);

    els.root.appendChild(header.container);
  },
  createMain() {
    const els = App.elements;
    const main = els.main.main;

    //-------------styles-------------//
    main.bg.src = "./assets/bg.png";
    main.bg.style.width = "100%";

    main.h1.innerText = "our produtcs";
    main.h1.style.fontSize = "24px";
    main.h1.style.fontStyle = "normal";
    main.h1.style.fontWeight = "700";
    main.h1.style.lineHeight = "29px";
    main.h1.style.textAlign = "center";
    main.h1.style.color = "#000000";

    main.p.style.fontSize = "24px";
    main.p.style.fontStyle = "normal";
    main.p.style.fontWeight = "400";
    main.p.style.lineHeight = "29px";
    main.p.style.textAlign = "center";
    main.p.style.color = "#000000";

    main.itemsContainer.style.display = "flex";
    main.itemsContainer.style.flexWrap = "wrap";
    main.itemsContainer.style.justifyContent = "center";
    //-------------styles-------------//

    //-------------text-------------//
    main.p.innerText =
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy tincidunt ut laoreet dolore magna aliquam erat volutpat.";
    //-------------text-------------//

    main.itemsContainer.innerHTML = "";
    this.createProductsElements(main.itemsContainer);
    main.container.appendChild(main.bg);
    main.container.appendChild(main.h1);
    main.container.appendChild(main.p);
    main.container.appendChild(main.itemsContainer);

    els.main.container.innerHTML = "";
    els.main.container.appendChild(main.container);
  },
  createFooter() {
    const els = App.elements;
    const footer = els.footer;

    footer.logo.src = "./assets/logo.png";

    footer.container.style.display = "flex";
    footer.container.style.justifyContent = "center";
    footer.container.style.alignItems = "center";
    footer.container.style.background = "#000000";
    footer.container.style.padding = "50px";

    footer.container.appendChild(footer.logo);
    els.root.appendChild(footer.container);
  },
  prices() {
    let total = 0;

    for (let i = 0; i < App.state.cart.length; i++) {
      const cart = App.state.cart[i];
      total += cart.price;
    }
    const totalFormatted = new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(total);

    return totalFormatted;
  },
  createCheckout() {
    const els = App.elements;
    const {
      container,
      tittle,
      itemsContainer,
      confirmBtn,
      confirmBtnContainer,
    } = els.main.checkout;
    const totalFormatted = this.prices();

    //-----------------------style-----------------------//
    container.style.backgroundColor = "#CCCCCC";
    container.style.height = "100%";
    container.style.padding = "230px";
    tittle.style.fontStyle = "normal";
    tittle.style.fontSize = "24px";
    tittle.style.fontWeight = "700";
    tittle.style.height = "29px";
    tittle.style.textAlign = "center";
    tittle.style.color = "#000000";

    confirmBtnContainer.style.textAlign = "center";
    //-----------------------style-----------------------//

    //-----------------------text-----------------------//
    tittle.innerText = `My cart [ Total Amount : ${totalFormatted} ]`;
    confirmBtn.innerText = "Confirm purchase";
    //-----------------------text-----------------------//

    //----------OnClick-----------//
    confirmBtn.onclick = () => {
      this.confirmPurchase();
    };
    //----------OnClick-----------//

    //-------------------items---------------------//
    itemsContainer.style.display = "flex";
    itemsContainer.style.flexWrap = "wrap";
    itemsContainer.style.justifyContent = "center";
    itemsContainer.innerHTML = "";
    this.createCartElements(itemsContainer);
    //-------------------items---------------------//

    confirmBtn.classList.add("btn");
    confirmBtnContainer.appendChild(confirmBtn);
    container.appendChild(tittle);
    container.appendChild(itemsContainer);
    container.appendChild(confirmBtnContainer);

    els.main.container.innerHTML = "";
    els.main.container.appendChild(container);
  },
  createLayout() {
    const els = App.elements;

    els.root.style.height = "100vh";
    els.root.style.display = "flex";
    els.root.style.flexDirection = "column";

    this.createHeader();

    els.main.container.style.flexGrow = "1";
    els.root.appendChild(els.main.container);

    this.createFooter();
  },
  createButtons(text, type = "primary", onClick) {
    const bt = document.createElement("button");

    const bts = bt.style;

    bt.innerHTML = text;
    bt.onclick = onClick;

    bts.display = "flex";
    bts.flexDirection = "column";
    bts.justifyContent = "center";
    bts.alignItems = "center";
    bts.padding = "5px 16px";
    bts.width = "fit-content";
    bts.height = "32px";
    bts.borderRadius = "20px";
    bts.color = "#FFFFFF";
    bts.border = "none";
    bts.fitContent = "";

    if (type == "primary") {
      bts.backgroundColor = "#000000";
      bts.boxShadow = "0px 2px 0px rgba(0, 0, 0, 0.043)";
    }

    if (type == "secondary") {
      bts.backgroundColor = "rgba(0, 0, 0, 0.6)";
      bts.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
    }
    if (type == "tertiary") {
      bts.backgroundColor = "rgba(0, 0, 0, 0.2)";
      bts.boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)";
      bts.color = "#000000";
    }
    if (type == "default") {
      bts.backgroundColor = "#FFFFFF;";
      bts.boxShadow = "0px 2px 0px rgba(0, 0, 0, 0.043)";
      bts.color = "#000000";
      bts.border = "2px solid #000000";
    }

    return bt;
  },
  createCard(ttl, description, price, images, btnLabel, onClick) {
    const card = document.createElement("div");
    const title = document.createElement("div");
    const usd = document.createElement("div");
    const desc = document.createElement("div");
    const button = this.createButtons(btnLabel, "primary", onClick);
    const imgContainer = document.createElement("div");
    const Carousel = new carousel({ images, container: imgContainer });

    //----const-styles-------//
    const cards = card.style;
    const titles = title.style;
    const usds = usd.style;
    const descs = desc.style;
    //----const-styles-------//

    //---------styles--------//
    cards.display = "flex";
    cards.flexDirection = "column";
    cards.alignItems = "center";
    cards.padding = "0px";
    cards.justifyContent = "center";
    cards.width = "fit-content";
    title.innerHTML = ttl; // HTML
    titles.fontWeight = "700";
    titles.fontSize = "16px";
    titles.lineHeight = "19px";
    titles.color = "#000000";
    titles.marginTop = "40px";

    price = new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(price);

    usd.innerHTML = price; // HTML
    usds.fontWeight = "400";
    usds.fontSize = "16px";
    usds.lineHeight = "19px";
    usds.color = "#000000";
    usds.marginTop = "4px";

    desc.innerHTML = description; // HTML
    descs.fontWeight = "400";
    descs.fontSize = "16px";
    descs.lineHeight = "19px";
    descs.color = "#000000";
    descs.marginTop = "4px";

    button.style.marginTop = "4px";
    //---------styles---------//

    card.appendChild(imgContainer);
    card.appendChild(title);
    card.appendChild(usd);
    card.appendChild(desc);
    card.appendChild(button);

    return card;
  },
  createModal(onClick, type = "", pd, pp) {
    const closeModal = () => {
      console.log("close");
      this.closeModal(md);
    };

    const modal = document.createElement("div");
    const md = document.createElement("div");
    const close = document.createElement("div");
    const body = document.createElement("div");
    const footer = document.createElement("div");
    const cancel = this.createButtons("cancel", "tertiary", closeModal);
    const confirm = this.createButtons("confirm", "secondary");
    const min = this.createButtons("-", "tertiary");
    const more = this.createButtons("+", "tertiary");
    const footer2 = document.createElement("div");
    const remove = document.createElement("p");
    const product = document.createElement("p");
    const productPrice = document.createElement("p");
    //----const-styles-------//
    const minS = min.style;
    const footerS = footer2.style;
    const bodyS = body.style;
    const closes = close.style;
    const mds = md.style;
    const fts = footer.style;
    const cancels = cancel.style;
    const modals = modal.style;
    //----const-styles-------//

    // ---------if-----------//
    if (type === "priceRemove") {
      product.innerText = `product: ${pd}`;

      productPrice.innerHTML = `price: ${pp}`;

      more.onclick = () => {
        console.log("+");
      };
      min.onclick = () => {
        console.log("-");
      };
      body.style.margin = "40px";
      remove.innerHTML = "remove from cart";
      minS.marginRight = "15px";

      body.appendChild(remove);
      body.appendChild(product);
      body.appendChild(productPrice);
      footer2.appendChild(min);
      footer2.appendChild(more);
    }
    if (type === "priceAdd") {
      product.innerText = `product: ${pd}`;

      productPrice.innerHTML = `price: ${pp}`;

      more.onclick = () => {
        console.log("+");
      };
      min.onclick = () => {
        console.log("-");
      };
      body.style.margin = "40px";
      remove.innerHTML = "Add to cart";
      minS.marginRight = "15px";

      body.appendChild(remove);
      body.appendChild(product);
      body.appendChild(productPrice);
      footer2.appendChild(min);
      footer2.appendChild(more);
    }
    // ---------if-----------//

    //---------styles---------//
    remove.style.paddingBottom = "50px";
    remove.style.borderBottom = "2px solid rgba(0,0,0,0.5)";
    remove.style.marginTop = "0";
    product.style.marginBottom = "-20px";
    productPrice.style.marginBottom = "0px";

    footerS.display = "flex";
    footerS.margin = "40px";

    bodyS.display = "flex";
    bodyS.flexDirection = "column";

    mds.display = "flex";
    mds.justifyContent = "center";
    mds.alignItems = "center";
    mds.position = "fixed";
    mds.top = "0";
    mds.left = "0";
    mds.width = "100%";
    mds.height = "100%";
    mds.backgroundColor = "rgba(156, 156, 156,0.6) ";

    modals.display = "flex";
    modals.background = "#FFFFFF";
    modals.borderRadius = "4px";
    modals.width = "fit-content";
    modals.flexDirection = "column";

    closes.display = "flex";
    closes.justifyContent = "center";
    closes.alignItems = "center";
    closes.padding = "10px";
    closes.cursor = "pointer";
    closes.width = "fit-content";
    closes.alignSelf = "flex-end";
    closes.backgroundColor = "rgba(0, 0, 0, 0.6)";
    closes.color = "#FFFFFF";
    closes.weight = "400";
    closes.fontsize = "12px";
    closes.lineHeight = "15px";
    closes.textAlign = "center";
    closes.borderRadius = "4px";
    closes.margin = "11px 12px 0px 0px";

    fts.display = "flex";
    fts.justifyContent = "space-between";
    fts.margin = "45px 82px 71px 81px";

    cancels.cursor = "pointer";
    cancels.marginRight = "24px";
    confirm.style.cursor = "pointer";
    //---------styles---------//

    //----------HTML----------//
    close.innerHTML = "X";
    //----------HTML----------//

    //--------Actions--------//
    confirm.onclick = onClick;
    close.onclick = closeModal;
    cancel.onclick = closeModal;

    md.classList.add("backdrop");
    md.onclick = (e) => {
      if (e.target.classList.contains("backdrop")) {
        closeModal();
      }
    };
    //--------Actions--------//

    modal.appendChild(close);
    modal.appendChild(body);
    modal.appendChild(footer2);
    modal.appendChild(footer);
    footer.appendChild(cancel);
    footer.appendChild(confirm);
    md.appendChild(modal);

    return md;
  },
  openModal(el) {
    el.style.display = "flex";
  },
  closeModal(el) {
    el.style.display = "none";
  },
};
