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
      }
      App.state.routeRendered = true;
    }, 100);
  },
  go(p) {
    App.state.routeRendered = false;
    history.pushState({ p }, "", App.state.routes[p]);
  },
  confirmPurchase() {
    let conf = "no";

    const wallet = localStorage.getItem("wallet");
    const price = localStorage.getItem("countPrice");
    const cart = localStorage.getItem("cart");
    const a = wallet - price;

    App.state.getters.getCountWallet("less");

    if (localStorage.getItem("insufficientValue") == 1) {
      alert("insufficientValue");
      conf = "no";
    }
    if (localStorage.getItem("insufficientValue") >= 2) {
      alert("no products in the car");
      conf = "no";
    }
    if (localStorage.getItem("insufficientValue") < 1) {
      conf = confirm("you are sure?");
    }
    if (conf === true) {
      App.state.cart = [];
      App.elements.header.cartCount.innerText = App.state.cart.length;

      this.go("home");
      alert("Thanks for purchase!");
      localStorage.setItem("wallet", a);
      location.reload();
      localStorage.setItem("history", cart);
      localStorage.removeItem("countPrice");
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

              if (App.state.count === 0) {
                App.state.mutations.removeFromCart(products);

                App.elements.header.cartCount.innerText = App.state.cart.length;
              }
              if (App.state.count > 0) {
                App.state.mutations.addToCart(products);
              }

              if (added === "OK") {
                App.elements.header.cartCount.innerText = App.state.cart.length;
              }
              if (added === "EXISTS") {
              }
            },
            (e) => {
              if (e.target.classList.contains("backdrop")) {
                this.closeModal(md);

                const price = localStorage.getItem("countPrice");
                const total = products.qtd * products.price;

                const att = price - total;

                localStorage.setItem("countPrice", att);

                products.qtd = 0;
                localStorage.setItem("count", 0);
                App.state.mutations.removeAllWallet(products);
              }

              App.state.mutations.removeFromCart(products);

              App.elements.header.cartCount.innerText = App.state.cart.length;
            },
            () => {
              const price = localStorage.getItem("countPrice");
              const total = products.qtd * products.price;

              const att = price - total;

              localStorage.setItem("countPrice", att);

              products.qtd = 0;
              localStorage.setItem("count", 0);
              App.state.mutations.removeAllWallet(products);

              this.closeModal(md);
            },
            "priceAdd",
            products.ttl,
            products.price,
            () => {
              products.qtd++;

              App.state.mutations.setCount();
              const ct = App.elements.main.main.count;
              ct.innerHTML = `count: ${App.state.getters.getCount(
                products.qtd
              )}`;

              if (products.qtd) {
                localStorage.setItem("count", products.qtd);
              }

              App.state.mutations.addToWallet(products);

              App.state.getters.getCountWallet("more");
            },
            () => {
              products.qtd--;

              const ct = App.elements.main.main.count;
              ct.innerHTML = `count: ${App.state.getters.getCount(
                products.qtd
              )}`;

              if (products.qtd <= 0) {
                products.qtd = 0;
                localStorage.setItem("count", 0);
              }
              if (products.qtd) {
                localStorage.setItem("count", products.qtd);
              }

              App.state.mutations.removeFromWallet(products);

              App.state.getters.getCountWallet("less");
            },
            products.qtd
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
            (e) => {
              if (e.target.classList.contains("backdrop")) {
                this.closeModal(md);

                App.state.mutations.removeFromCart(products);

                App.elements.header.cartCount.innerText = App.state.cart.length;
                App.controllers.createCheckout();
              }
            },
            () => {
              App.state.mutations.removeFromCart(products);

              App.elements.header.cartCount.innerText = App.state.cart.length;
              App.controllers.createCheckout();

              this.closeModal(md);
            },
            "priceRemove",
            products.ttl,
            products.price,
            () => {
              App.state.mutations.addToWallet(products);

              products.qtd++;
              App.state.mutations.setCount();
              const ct = App.elements.main.main.count;
              ct.innerHTML = `count: ${App.state.getters.getCount(
                products.qtd
              )}`;

              if (products.qtd) {
                localStorage.setItem("count", products.qtd);
              }

              App.state.getters.getCountWallet("more");
            },
            () => {
              products.qtd--;

              const ct = App.elements.main.main.count;
              ct.innerHTML = `count: ${App.state.getters.getCount(
                products.qtd
              )}`;

              if (products.qtd <= 0) {
                products.qtd = 0;
                localStorage.setItem("count", 0);
              }
              if (products.qtd) {
                localStorage.setItem("count", products.qtd);
              }

              App.state.mutations.removeFromWallet(products);

              App.state.getters.getCountWallet("less");
            },
            products.qtd
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
    const userContainer = header.userContainer;
    const cartS = header.cartContainer.style;
    const cartCs = header.cartCount.style;
    const between = header.divBetween.style;
    const userS = userContainer.style;
    const on = document.createElement("div");

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

    header.userContainer.style.width = "36px";
    header.userContainer.style.height = "36px";
    header.userContainer.style.cursor = "pointer";

    header.userIcon.src = "./assets/user.svg";
    header.userIcon.style.width = "36px";
    header.userIcon.style.height = "36px";
    header.userIcon.style.cursor = "pointer";

    userS.display = "flex";
    userS.width = "80px";
    userS.alignItems = "center";

    header.cartIcon.src = "./assets/carrinho.png";
    header.cartIcon.style.width = "36px";
    header.cartIcon.style.height = "36px";
    header.cartIcon.style.cursor = "pointer";

    cartS.display = "flex";
    cartS.width = "80px";
    cartS.alignItems = "center";

    between.display = "flex";
    between.marginRight = "53px";

    cartCs.marginTop = "15px";
    cartCs.marginRight = "-1rem";
    cartCs.color = "white";

    if (localStorage.getItem("email", true)) {
      const totalFmt = this.prices(localStorage.getItem("wallet"));
      const total = document.createElement("div");
      const totalNumber = document.createElement("p");

      on.style.backgroundColor = "green";
      on.style.padding = "7px";
      on.style.borderRadius = "50px";
      on.style.marginTop = "-20px";
      on.style.marginLeft = "-0.6rem";

      total.style.display = "flex";
      total.style.alignItems = "center";
      total.style.border = "2px solid white";
      total.style.borderRadius = "4px";
      total.style.marginRight = "26px";
      total.style.height = "1.1rem";
      total.style.padding = "5px";
      totalNumber.innerHTML = totalFmt;
      totalNumber.style.color = "white";

      between.alignItems = "center";

      console.log("history:", localStorage.getItem("history"));

      total.style.display = "flex";
      totalNumber.innerHTML = totalFmt;

      total.appendChild(totalNumber);
      header.divBetween.appendChild(total);
    }
    //---------------------------style---------------------------//

    //------------------------onAction------------------------//
    header.cartIcon.onclick = () => {
      App.controllers.go("cart");
    };
    header.userIcon.onclick = () => {
      const md = this.createModal(
        () => {
          this.closeModal(md);
        },
        (e) => {
          if (e.target.classList.contains("backdrop")) {
            this.closeModal(md);
          }
        },
        () => {
          this.closeModal(md);
        },
        "md"
      );
      App.elements.root.appendChild(md);
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
    header.divBetween.appendChild(header.cartContainer);
    userContainer.appendChild(header.userIcon);
    header.divBetween.appendChild(header.userContainer);
    header.userContainer.appendChild(on);
    header.container.appendChild(header.divBetween);

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
    main.container.style.marginBottom = "4rem";
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
  prices(tt) {
    let total = tt;

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
    const totalFormatted = this.prices(localStorage.getItem("countPrice"));
    const totalFmt = this.prices(localStorage.getItem("wallet"));

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
  loginModal(on) {
    const md = document.createElement("div");
    const inputText = document.createElement("input");
    const inputPassword = document.createElement("input");
    const inputDivT = document.createElement("div");
    const inputDivP = document.createElement("div");
    const newLabel = document.createElement("label");
    const newCheckbox = document.createElement("input");

    const mds = md.style;
    const txt = inputDivT.style;
    const ps = inputDivP.style;

    const button = this.createButtons("login", "primary", () => {
      const valueText = inputText.value;
      const valuePassword = inputPassword.value;

      function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
      }
      let mail = 0;

      validateEmail(valueText);

      if (validateEmail(valueText) === false) {
        alert("invalid email");
      } else if (valuePassword.length < 6) {
        alert("invalid password");
      } else {
        localStorage.setItem("wallet", 10000);
        localStorage.setItem("email", valueText);
        localStorage.setItem("password", valuePassword);
        localStorage.removeItem("countPrice");
        location.reload();

        mail = 1;
      }
      if (mail === 1) {
        this.closeModal(on);
      }
      if (mail === 0) {
        localStorage.setItem("wallet", 0);
      }
    });

    const buttonLogout = this.createButtons("logout", "primary", () => {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("history");
      localStorage.removeItem("cart");

      if (!localStorage.getItem("email")) {
        localStorage.setItem("wallet", 0);
      }

      location.reload();
      this.closeModal(on);
    });
    console.log(localStorage);
    inputPassword.setAttribute("type", "password");

    newLabel.setAttribute("for", "checkbox");
    newCheckbox.setAttribute("type", "checkbox");
    newCheckbox.setAttribute("id", "checkbox");

    newLabel.innerHTML = "Here goes the text";

    ps.marginTop = "10px";
    ps.border = "1px solid green";
    ps.width = "250px";
    ps.height = "50px";
    ps.borderRadius = "50px";
    ps.display = "flex";
    ps.justifyContent = "center";
    inputPassword.style.border = "none";
    inputPassword.style.outline = "none";
    inputPassword.placeholder = "enter Password";

    txt.border = "1px solid green";
    txt.width = "250px";
    txt.height = "50px";
    txt.borderRadius = "50px";
    txt.display = "flex";
    txt.justifyContent = "center";
    inputText.style.border = "none";
    inputText.style.outline = "none";
    inputText.placeholder = "enter Username";

    mds.display = "flex";
    mds.flexDirection = "column";
    mds.justifyContent = "center";
    mds.alignItems = "center";
    mds.marginTop = "4rem";

    buttonLogout.style.cursor = "pointer";
    button.style.cursor = "pointer";

    if (!localStorage.getItem("email")) {
      md.style.width = "16rem";

      button.style.marginTop = "1rem";

      inputDivT.appendChild(inputText);
      inputDivP.appendChild(inputPassword);
      md.appendChild(inputDivT);
      md.appendChild(inputDivP);
      md.appendChild(button);
    }
    if (localStorage.getItem("email")) {
      const email = document.createElement("div");
      const mailP = document.createElement("p");
      const mail = localStorage.getItem("email");
      const userIcon = document.createElement("img");
      const divUser = document.createElement("div");

      userIcon.src = "./assets/user.svg";
      email.style.margin = "25px";

      divUser.style.backgroundColor = "green";
      divUser.style.width = "150px";
      divUser.style.borderRadius = "100px";
      divUser.style.display = "flex";
      divUser.style.justifyContent = "center";
      divUser.style.marginTop = "7rem";

      mailP.innerHTML = `E-mail: ${mail} `;
      buttonLogout.style.marginBottom = "3rem";

      md.style.height = "7rem";

      divUser.appendChild(userIcon);
      md.appendChild(divUser);
      email.appendChild(mailP);
      md.appendChild(email);
      md.appendChild(buttonLogout);
    }

    return md;
  },
  createModal(
    onClick,
    mdClick,
    closeMd,
    type = "",
    pd,
    pp,
    mor,
    minn,
    countProducts
  ) {
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
    const count = App.elements.main.main.count;

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

      count.innerText = `count: ${countProducts}`;

      more.onclick = mor;
      min.onclick = minn;
      body.style.margin = "40px";
      remove.innerHTML = "remove from cart";
      minS.marginRight = "15px";

      body.appendChild(remove);
      body.appendChild(product);
      body.appendChild(productPrice);
      body.appendChild(count);
      footer2.appendChild(min);
      footer2.appendChild(more);
    }
    if (type === "priceAdd") {
      product.innerText = `product: ${pd}`;

      productPrice.innerHTML = `price: ${pp}`;

      count.innerHTML = `count: ${countProducts}`;

      more.onclick = mor;
      min.onclick = minn;

      body.style.margin = "40px";
      remove.innerHTML = "Add to cart";
      minS.marginRight = "15px";

      body.appendChild(remove);
      body.appendChild(product);
      body.appendChild(productPrice);
      body.appendChild(count);
      footer2.appendChild(min);
      footer2.appendChild(more);
    }
    if (type === "md") {
      const mdd = this.loginModal(md);

      body.appendChild(mdd);
    }
    // ---------if-----------//

    //-----------animate-----------//
    modal.classList.add("animate");
    //-----------animate-----------//

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
    close.onclick = closeMd;
    cancel.onclick = closeMd;

    md.classList.add("backdrop");
    md.onclick = mdClick;
    //--------Actions--------//

    modal.appendChild(close);
    modal.appendChild(body);
    modal.appendChild(footer2);
    modal.appendChild(footer);
    if (type === "priceAdd") {
      footer.appendChild(cancel);
      footer.appendChild(confirm);
    }
    if (type === "priceRemove") {
      footer.appendChild(cancel);
      footer.appendChild(confirm);
    }
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
