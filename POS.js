// ======= default data =======
const menu = document.querySelector("#menu");
const cart = document.querySelector("#cart");
const totalAmount = document.querySelector("#total-amount");
const button = document.querySelector("#submit-button");

// 菜單資料
let productData = [
  {
    id: "product-1",
    imgUrl:
      "https://images.unsplash.com/photo-1558024920-b41e1887dc32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "馬卡龍",
    price: 90
  },
  {
    id: "product-2",
    imgUrl:
      "https://images.unsplash.com/photo-1560691023-ca1f295a5173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "草莓",
    price: 60
  },
  {
    id: "product-3",
    imgUrl:
      "https://images.unsplash.com/photo-1568271675068-f76a83a1e2d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "奶茶",
    price: 100
  },
  {
    id: "product-4",
    imgUrl:
      "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "冰咖啡",
    price: 180
  }
];
// ======= 請從這裡開始 =======
//更新菜單

function updateMenu(productData) {
  let content = "";
  productData.forEach((item) => {
    content += ` 
      <div class="col-3"> 
       <div class="card"> 
          <img src=${item.imgUrl} class="card-img-top" alt="..."> 
          <div class="card-body"> 
            <h5 class="card-title">${item.name}</h5> 
            <p class="card-text">${item.price}</p> 
            <a href="javascript:void(0)" class="btn btn-primary">加入購物車</a> 
          </div> 
        </div> 
      </div> `;
  });
  menu.innerHTML = content;
}
updateMenu(productData);
//功能加總金額
let priceArr = [];
function add(priceArr) {
  let totalPrice = 0;
  for (let price of priceArr) {
    totalPrice = totalPrice + price;
  }
  return totalPrice;
}
//新增購物車
menu.addEventListener("click", addToCart);
function addToCart(event) {
  if (!event.target.matches('.btn')) return
  let parentElement = event.target.parentElement;
  let name = parentElement.children[0].innerHTML;
  let price = parentElement.children[1].innerHTML;
  let li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `${name} X 1 小計：${price}`;
  cart.appendChild(li);
  priceArr.push(+price);
  totalAmount.innerHTML = add(priceArr);
}
//計算總金額
button.addEventListener("click", addTotal);
function addTotal() {
  alert(`感謝購買\n總金額: ${add(priceArr)}`)
  let checkoutList = document.querySelectorAll("#cart li")
  for (let i = 0; i < checkoutList.length; i++) {
    checkoutList[i].remove()
  }
  totalAmount.innerHTML = "--"
}

