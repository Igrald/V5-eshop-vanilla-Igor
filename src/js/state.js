App.state = {
    products: [
        {
        id: 1, 
        ttl: "パン",
        description: "超美味しいパンの説明",
        price: 1190,
        images: 
        [
        "./assets/bg.png",
        "https://blog.praticabr.com/wp-content/uploads/2019/01/263396-os-10-tipos-de-paes-que-voce-precisa-conhecer-1024x682.jpg"
        ]
        },
        {
        id: 2, 
        ttl: "croassant",
        description: "Croassant :D",
        price: 1190,
        images: 
        [
        "./assets/croa.png",
        "https://img.itdg.com.br/tdg/images/recipes/000/011/234/349247/349247_original.jpg?w=1200"
        ]
        },
        {
            id: 3, 
            ttl: "メロンパン",
            description: "町の最高メロンパン",
            price: 1190,
            images: 
            [
            "https://asset.oceans-nadia.com/upload/save_image/53/5328080c4178823caf6d7ee0e2bc122d.jpg?impolicy=cropwm&w=500&h=500",
            "https://xs207451.xsrv.jp/ja/company/wp-content/uploads/shutterstock_1656317647-e1635484450867.jpg"
            ]
            },
        {        
        id: 4, 
        ttl: "art",
        description: "art",
        price: 1190,
        images: 
        [
        "https://i0.wp.com/nerdizmo.uai.com.br/wp-content/uploads/sites/29/2015/04/sergey_kolesov_geekness-1.jpg?ssl=1",
        "https://cdna.artstation.com/p/assets/images/images/050/791/348/medium/rebeca-puebla-punchline-md.jpg?1655721716",
        ]
        },
        {
        id: 5 , 
        ttl: "art2",
        description: "art2",
        price: 1190,
        images: 
        [
                "https://www.iamag.co/wp-content/uploads/2014/07/Craig-Mullins-24.jpg",
                "https://cdna.artstation.com/p/assets/images/images/049/529/802/medium/noah-alonzo-noahalonzo-wickerwitch-presentation-page21-5-12-22.jpg?1652719476",
        ]
        },
    ],
    cart: [],
    routes: {
        home: `${window.location.origin}${window.location.pathname}`,
        cart: "?p=cart"
    },
    routeRendered: false,

    mutations: {
        addToCart(products) {
            if(App.state.cart.find(p => p.id === products.id)){
                return "EXISTS"
            }
            App.state.cart.push(products)
            return "OK"
        },
    },
}

