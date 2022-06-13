App.elements = {
    root: document.getElementById("App"),
    header: {
        container: document.createElement("div"),
        logo: document.createElement("img"),
        cartIcon: document.createElement("img"),
    },
    main:{
        container: document.createElement("div"),

        main: {
            container: document.createElement("div"),
            bg: document.createElement("img"),
            h1: document.createElement("h1"),
            p: document.createElement("p"),
            items: []
        },
        checkout: {
            container: document.createElement("div"),
            tittle: document.createElement("h1"),
            items: [],
            confirmBtn: document.createElement("div"),
        },
    },
    footer: {
        container: document.createElement("div"),
        logo: document.createElement("img"),
    },
}

