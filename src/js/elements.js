App.elements = {
  root: document.getElementById("App"),
  header: {
    container: document.createElement("div"),
    logo: document.createElement("img"),
    cartIcon: document.createElement("img"),
    userIcon: document.createElement("img"),
    cartCount: document.createElement("span"),
    cartContainer: document.createElement("div"),
    userContainer: document.createElement("div"),
    divBetween: document.createElement("div"),
  },
  main: {
    container: document.createElement("div"),

    main: {
      container: document.createElement("div"),
      bg: document.createElement("img"),
      h1: document.createElement("h1"),
      p: document.createElement("p"),
      itemsContainer: document.createElement("div"),
      count: document.createElement("p"),
    },
    checkout: {
      container: document.createElement("div"),
      tittle: document.createElement("h1"),
      itemsContainer: document.createElement("div"),
      confirmBtnContainer: document.createElement("div"),
      confirmBtn: document.createElement("button"),
      count: document.createElement("p"),
    },
  },
  footer: {
    container: document.createElement("div"),
    logo: document.createElement("img"),
  },
};
