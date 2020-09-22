const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let title = document.getElementById("tit");
let content = document.getElementById("var");
let items=document.getElementById("items");

burgers = [];
tacos = [];
salads = [];
desserts = [];
drinks = [];
productos=[]
total=0
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
  render("Burgers")
  
});

function render(lista) {
 
  lista === "Burgers"? poner("Burgers", burgers):  lista === "Tacos"? poner("Tacos", tacos) :  lista === "Salads"? poner("Salads", salads) :  lista === "Dessert"? poner("Dessert", desserts):  lista === "Drinks"? poner("Drinks & Sides", drinks):0;


}


function  poner(name, lista){
  title.innerHTML = name;
    content.innerHTML = "";
   
    lista.forEach((element) => {
      content.innerHTML += `
      <div class= col-md-3>
      <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${element.image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${element.name}</h5>
    <p class="card-text">${element.description}<br>
    <b>${element.price} </b></p>
    
    <a href="#" class="btn btn-primary" onclick="addCart('${name, element.name}')">Add to Car</a>
  </div>
</div>
</div>
     `;
    });
}


function addCart(name, obj){
  total+=1
  items.innerHTML=total
  toadd=""
  console.log(name)
  console.log(obj)
  if (name==="Burgers"){
    toadd=search(burgers, obj)
  }else if (name==="Tacos"){
    toadd=search(tacos, obj)
  }else if (name==="Salads"){
    toadd=search(salads, obj)
  }else if (name==="Dessert"){
    toadd=search(desserts, obj)
  }else if (name==="Drinks & Sides"){
    toadd=search(drinks, obj)
  }
  productos.push(toadd)
  console.log(productos)
}


function search(name, obj){
  name.forEach(el=>{
    console.log(el.name)
    if(el.name===obj){
      return el ;
    } 
  })
}