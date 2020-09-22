const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let title = document.getElementById("tit");
let content = document.getElementById("var");
let items = document.getElementById("items");
let burgersContent = document.getElementById("Burgers");
let tacosContent = document.getElementById("Tacos");
let saladsContent = document.getElementById("Salads");
let dessertsContent = document.getElementById("Desserts");
let drinksContent = document.getElementById("Drinks");
let carrito = document.getElementById("car");
carrito.addEventListener("click", function(){pedido()})
burgers = [];
tacos = [];
salads = [];
desserts = [];
drinks = [];
productos = [];
total = 0;

let peticion = (url) => {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.onload = function () {
      if (req.status === 200) {
        resolve(req.response);
      } else {
        reject("error");
      }
    };
    req.send();
  });
};
let rows = [];

peticion(url).then((resp) => {
  let ans = JSON.parse(resp);
  ans.forEach((obj) => {
    obj.name === "Burguers"
      ? (burgers = obj.products)
      : obj.name === "Tacos"
      ? (tacos = obj.products)
      : obj.name === "Salads"
      ? (salads = obj.products)
      : obj.name === "Desserts"
      ? (desserts = obj.products)
      : obj.name === "Drinks and Sides"
      ? (drinks = obj.products)
      : 0;
  });
  poner("Burgers", burgers);
  burgersContent.addEventListener("click", function () {
    poner("Burgers", burgers);
  });
  tacosContent.addEventListener("click", function () {
    poner("Tacos", tacos);
  });
  saladsContent.addEventListener("click", function () {
    poner("Salads", salads);
  });
  dessertsContent.addEventListener("click", function () {
    poner("Desserts", desserts);
  });
  drinksContent.addEventListener("click", function () {
    poner("Drinks & Sides", drinks);
  });
  items.addEventListener("click", function () {
    addCart();
  });
});

function poner(name, lista) {
  title.innerHTML = name;
  content.innerHTML = "";

  lista.forEach((element) => {
    let col = document.createElement("div");
    col.className = "col-md-3";

    let card = document.createElement("div");
    card.className = "card";


    let cardImage = document.createElement("img");
    cardImage.className = "card-img-top";
    cardImage.src=element.image
    cardImage.alt="product image"

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    
    

    let title = document.createElement("h5");
    title.innerText = element.name;
    title.className = "card-title";

    let cardContent = document.createElement("p");
    cardContent.innerText = element.description;
    cardContent.className = "card-text";

    let cardPrice = document.createElement("b");
    cardPrice.innerText = element.price;
    cardPrice.className = "card-text";


    let cardButton= document.createElement("a");
    cardButton.innerText = "Add to Cart";
    cardButton.className = "btn btn-primary";
    cardButton.id="addCar"
    cardButton.addEventListener('click',function(){
      productos.push(element)
      total+=1
      items.innerText=total+" items"
    })


    col.appendChild(card)
    card.appendChild(cardImage)
    card.appendChild(cardBody)
    cardContent.appendChild(document.createElement("br"))
    cardContent.appendChild(cardPrice)
    cardBody.appendChild(title)
    cardBody.appendChild(cardContent)
    cardBody.appendChild(cardButton)

    content.appendChild(col);
    
  });

  
}

let headers=["Item", "Qty.", "Description", "Unit Price", "Amount"]

function pedido(){
  toTable=purchase()
  tab = document.createElement("table");
  tab.className="table"
  title.innerHTML = "Order Detail";
  content.innerHTML = "";
  tr= document.createElement("tr")

  headers.forEach(head=>{
    th= document.createElement("th")
    th.innerText=head
    tr.appendChild(th)
  })

  
  tab.appendChild(tr)
  tot=0
  toTable.forEach(prod=>{
    tr= document.createElement("tr")
    td= document.createElement("td")
    td.innerText= tot+=1
    tr.appendChild(td)
    for (key in prod){
  
    td= document.createElement("td")
    td.innerText= prod[key]
    tr.appendChild(td)
  }
  tab.appendChild(tr)
    

  })

  content.appendChild(tab)


//depsues de la tabla
  r=document.createElement("row")
  totalFinal= document.createElement("b")
  totalFinal.innerText="Total:$"+getTotal()
  r.appendChild(totalFinal)
  butt= document.createElement("button")
  butt.className="btn btn-danger"
  butt.innerText="Cancel"
  butt.addEventListener('click',function(){
    if (confirm("Are you sure about cancelling the order?")) {
      productos=[]
      pedido()
    } 
  })
  r.appendChild(butt)
  butt= document.createElement("button")
  butt.className="btn btn-warning"
  butt.innerText="Confirm order "
  butt.addEventListener('click',function(){
    console.log(toTable)
  })

  r.appendChild(butt)

  content.appendChild(r)
}

function getTotal(){
  tot=0
  productos.forEach(prod=> tot+=prod.price)
  return tot
}
  
function purchase(){
  lis=[]

  productos.forEach(prod=>{
    a=check(lis,prod.name)
    if (a!=-1){
      act= lis[a]
      act["q"]+=1
      act["val"]=prod.price*act["q"]
      lis[a]=act
    }else{
      obj={"q":1, "des":prod.name, "un":prod.price, "val":prod.price}
      lis.push(obj)
    }
  })
  return lis
}

function check(lis,name){
  ans=-1
  for (var i=0;i<lis.length;i++){
    act=lis[i]
    if (act["des"]===name){
      
      ans= i
    }
  }

  return ans
}