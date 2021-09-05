// ======= default data =======
const MENU_URL = 'https://ac-w3-dom-pos.firebaseio.com/products.json'
const menu = document.querySelector("#menu");
const cart = document.querySelector("#cart");
const totalAmount = document.querySelector("#total-amount");
const submitButton = document.querySelector("#submit-button");
const cartItems = []
// 菜單資料

axios.get(MENU_URL)
     .then(response => {
        console.log(response)
        updateMenu(response.data);
      })
// ======= 請從這裡開始 =======
//更新菜單

function updateMenu(Data) {
  let content = "";
  Data.forEach( item => {
    content += ` 
      <div class="col-3"> 
       <div class="card"> 
          <img src=${item.imgUrl} class="card-img-top" alt="..."> 
          <div class="card-body"> 
            <h5 class="card-title">${item.name}</h5> 
            <p class="card-text">${item.price}</p> 
            <a href="javascript:void(0)" class="btn btn-primary" data-id="${item.id}">加入購物車</a> 
          </div> 
        </div> 
      </div> `;
  });
  menu.innerHTML = content;
}

//功能加總金額
function renderTotal(arr){
  let totalPrice = 0
  arr.forEach(item => {
    totalPrice = totalPrice + item.price * item.quantity
  })
  totalAmount.innerHTML = totalPrice
}
//新增購物車
menu.addEventListener("click", addToCart);
function addToCart(event) {
  if (!event.target.matches('.btn')) return
  if ( !cartItems.length || !cartItems.some( item => item.id === event.target.dataset.id)){
    axios.get(MENU_URL)
      .then(response => {
        let index = response.data.findIndex(item => item.id === event.target.dataset.id)
        cartItems.push({
          id: response.data[index].id,
          name: response.data[index].name,
          price: response.data[index].price,
          quantity: 1
        })
        renderCart(cartItems)
      })
  }else{
      let index = cartItems.findIndex(item => item.id === event.target.dataset.id)
      cartItems[index].quantity += 1    
     renderCart(cartItems)

  }
}

  function renderCart(arr){
    let rawHTML = ''
    arr.forEach( item => {        
      rawHTML += `
        <li class="list-group-item">${item.name} X ${item.quantity} 小計：${item.quantity * item.price}</li>
    `     
    })
    cart.innerHTML = rawHTML
    renderTotal(cartItems)
  }

//計算總金額
submitButton.addEventListener("click", submitButtonClicked);
function submitButtonClicked() {
  alert(`感謝購買\n總金額: ${totalAmount.innerHTML}`)
  cart.innerHTML = ''
  totalAmount.innerHTML = "--"
}
