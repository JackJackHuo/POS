// ======= default data =======
const MENU_URL = 'https://ac-w3-dom-pos.firebaseio.com/products.json'
const menu = document.querySelector("#menu");
const cart = document.querySelector("#cart");
const totalAmount = document.querySelector("#total-amount");
const submitButton = document.querySelector("#submit-button");
const productMap = {}
let cartItems = []
// 菜單資料

axios.get(MENU_URL)
     .then(response => {
       //將AJAX回來的'有序'資料陣列轉換成'無序'物件形式方便日後調用
        response.data.map(product => productMap[product.id] = product)
       //渲染商品清單畫面
        updateMenu(productMap);
      })
// ======= 請從這裡開始 =======
//更新菜單
function updateMenu(data) {
  menu.innerHTML = ''
  for(let product in data){
    menu.innerHTML += `
      <div class="col-3"> 
       <div class="card"> 
          <img src=${data[product].imgUrl} class="card-img-top" alt="..."> 
          <div class="card-body"> 
            <h5 class="card-title">${data[product].name}</h5> 
            <p class="card-text">${data[product].price}</p> 
            <a href="javascript:void(0)" class="btn btn-primary" data-id="${data[product].id}">加入購物車</a> 
          </div> 
        </div> 
      </div> `;
  }
}

//加總金額功能
function renderTotal(cartArr){
  let totalPrice = 0
  cartArr.forEach(item => totalPrice = totalPrice + productMap[item.id].price * item.quantity)
  totalAmount.innerHTML = totalPrice
}
//新增購物車
menu.addEventListener("click", addToCart);  
function addToCart(event) {
  //沒有點選到加入購物車按鈕直接return
  if (!event.target.matches('.btn')) return
  //抓取商品id
  const id = event.target.dataset.id
  //假如購物車內存在點選的商品，quantity + 1
  if (cartItems.some(product => product.id === id)){
    const repeatSelectedItem = cartItems.find(item => item.id === id)
    repeatSelectedItem.quantity += 1
  }else{
    //假如購物車內無此商品則將點選商品加入購物車
    // 購物車內避免放過多商品原始資料，因為假如原始資料更動，購物車內仍然會殘存舊的資料，導致直接透過購物車渲染出來的畫面是錯誤的
    cartItems.push({
      id: id,
      quantity: 1
    })
  }
  renderCart(cartItems)
}
//渲染購物車功能
function renderCart(cartArr){
  cart.innerHTML = cartArr.map(item => `
      <li class="list-group-item">${productMap[item.id].name} X ${item.quantity} 小計：${item.quantity * productMap[item.id].price}</li>
    `).join('')
  renderTotal(cartItems)
}
//結帳並清空購物車
submitButton.addEventListener("click", submitButtonClicked);
function submitButtonClicked() {
  alert(`感謝購買\n總金額: ${totalAmount.innerHTML}`)
  //清空購物車並重新渲染
  cartItems = []
  renderCart(cartItems)
  totalAmount.innerHTML = "--"
}

