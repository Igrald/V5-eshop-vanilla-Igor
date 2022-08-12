App.state = {
  products: [
    {
      id: 1,
      ttl: "パン",
      description: "超美味しいパンの説明",
      price: 1190,
      images: [
        "./assets/bg.png",
        "https://blog.praticabr.com/wp-content/uploads/2019/01/263396-os-10-tipos-de-paes-que-voce-precisa-conhecer-1024x682.jpg",
      ],
      qtd: 0,
    },
    {
      id: 2,
      ttl: "croassant",
      description: "Croassant :D",
      price: 1390,
      images: [
        "./assets/croa.png",
        "https://img.itdg.com.br/tdg/images/recipes/000/011/234/349247/349247_original.jpg?w=1200",
      ],
      qtd: 0,
    },
    {
      id: 3,
      ttl: "メロンパン",
      description: "町の最高メロンパン",
      price: 2190,
      images: [
        "https://asset.oceans-nadia.com/upload/save_image/53/5328080c4178823caf6d7ee0e2bc122d.jpg?impolicy=cropwm&w=500&h=500",
        "https://xs207451.xsrv.jp/ja/company/wp-content/uploads/shutterstock_1656317647-e1635484450867.jpg",
      ],
      qtd: 0,
    },
    {
      id: 4,
      ttl: "art",
      description: "art",
      price: 3510,
      images: [
        "https://i0.wp.com/nerdizmo.uai.com.br/wp-content/uploads/sites/29/2015/04/sergey_kolesov_geekness-1.jpg?ssl=1",
        "https://cdna.artstation.com/p/assets/images/images/050/791/348/medium/rebeca-puebla-punchline-md.jpg?1655721716",
      ],
      qtd: 0,
    },
    {
      id: 5,
      ttl: "art2",
      description: "art2",
      price: 8592,
      images: [
        "https://www.iamag.co/wp-content/uploads/2014/07/Craig-Mullins-24.jpg",
        "https://cdna.artstation.com/p/assets/images/images/049/529/802/medium/noah-alonzo-noahalonzo-wickerwitch-presentation-page21-5-12-22.jpg?1652719476",
      ],
      qtd: 0,
    },
  ],
  cart: [],
  routes: {
    home: `${window.location.origin}${window.location.pathname}`,
    cart: "?p=cart",
  },
  routeRendered: false,
  wallet: [],
  count: 0,
  getters: {
    getCount(esse) {
      App.state.count = esse;

      if (App.state.count <= 0) {
        App.state.count = 0;
      }

      return App.state.count;
    },
    getCountWallet(type = "") {
      let arr = App.state.wallet;
      let soma = 0;

      if (type === "more") {
        for (let i = 0; i < arr.length; i++) {
          soma += arr[i];
        }

        localStorage.setItem("countPrice", soma);
      }
      if (type === "less") {
        for (let i = 0; i < arr.length; i++) {
          soma -= arr[i];
        }

        soma = Math.abs(soma);

        localStorage.setItem("countPrice", soma);
      }
      let total = 10000;

      const wallet = localStorage.getItem("wallet");

      if (soma > wallet) {
        localStorage.setItem("insufficientValue", 1);
      }
      if (soma === 0) {
        localStorage.setItem("insufficientValue", 2);
      } else if (soma < wallet) {
        localStorage.setItem("insufficientValue", 0);

        total -= soma;
      }
    },
  },
  mutations: {
    addToCart(products) {
      if (App.state.cart.find((p) => p.id === products.id)) {
        return "EXISTS";
      } else if (App.state.count > 0) {
        App.state.cart.push(products);
      } else if (App.state.count <= 0) {
      }

      return "OK";
    },
    removeFromCart(products) {
      if (localStorage.getItem("count") <= 0) {
        App.state.cart = App.state.cart.filter((p) => p.id !== products.id);
      }
    },
    removeAllWallet(products) {
      const index = App.state.wallet.indexOf(products.price);
      if (index > -1) {
        App.state.wallet.splice(index);
      }
    },
    setCount() {
      App.state.count++;
    },
    setCountLess() {
      App.state.count--;
    },
    addToWallet(products) {
      App.state.wallet.push(products.price);

      const data = localStorage.getItem("cart");

      let obj = {};

      if (data) {
        obj = JSON.parse(data);
      }
      obj[products.ttl] = products.qtd;

      localStorage.setItem("cart", JSON.stringify(obj));
    },
    removeFromWallet(product) {
      const index = App.state.wallet.indexOf(product.price);
      if (index > -1) {
        App.state.wallet.splice(index, 1);
      }

      const data = localStorage.getItem("cart");

      let obj = {};

      if (data) {
        obj = JSON.parse(data);
      }
      obj[product.ttl] = product.qtd;

      localStorage.setItem("cart", JSON.stringify(obj));
    },
    setCart(newCart) {
      App.state.cart = newCart;
    },
    setWallet(newallet) {
      App.state.wallet = newallet;
    },
  },
};
