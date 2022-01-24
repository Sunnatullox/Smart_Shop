
  




const toCurrenscy = (price) => {
  return new Intl.NumberFormat("us-US", {
    currency: "usd",
    style: "currency",
  }).format(price);
};

const toDate = (date) =>{
  return new Intl.DateTimeFormat("us-US",{
    day:"2-digit",
    month:"long",
    year:"numeric",
    hour:"2-digit",
    minute:"2-digit",
    second:"2-digit"
  }).format(new Date(date));
};



document.querySelectorAll(".price").forEach((c) => {
  c.textContent = toCurrenscy(c.textContent);
});
document.querySelectorAll(".date").forEach((c) => {
  c.textContent = toDate(c.textContent);
});


/* smartphone.hbs pagination */








const $card = document.querySelector("#card");
if ($card) {
  $card.addEventListener("click", (e) => {
    if (e.target.classList.contains("js-remove")) {
      const id = e.target.dataset.id;

      fetch("/card/remove/" + id, {
        method: "delete",
      })
        .then((res) => res.json())
        .then((card) => {
          console.log(card);
          if (card.smartPhones.length) {
            const dynamicHtml = card.smartPhones.map((c) => {
              return `
              <div id="product_detail" class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
              <div class="d-flex"><img class="card_image" src="${c.img}" title="${c.title}">
                  <div class="ml-2 smart_title"><span class="font-weight-bold d-block">${c.title}</span><span
                          class="spec">${c.descr}</span></div>
              </div>
              <div class="d-flex  ">
                  <span class="d-block">${c.count}</span>
                  <span class="d-block ml-5 font-weight-bold">${c.price}</span>
                  <a class="border-0 bg-white">
                      <i class="d-block js-remove fas fa-trash-alt" data-id="${c.id}"></i>
                  </a>
              </div>
          </div>
                    `;
            }).join("");
            $card.querySelector("#product_details").innerHTML = dynamicHtml;
            $card.querySelector(".price").textContent = toCurrenscy(card.price);
          } else {
            $card.innerHTML = `
            <div class="row no-gutters">
            <div class="col-md-8">
                <div class="product-details mr-2">
    
                    <div class="d-flex  align-items-center"><a href="/smart" class="btn btn-primary previous"
                            style="margin:0 10px 0 ; "> &laquo; Back </a>Continue Shopping</div>
                    <hr>
                    <h6 class="mb-0">Shopping cart</h6>
                    <div class="d-flex justify-content-between">
                        <span>You have 0 items in your cart</span>
                        <div class="d-flex  align-items-center"><span class="text-black-50">Sort by:</span>
                            <div class=" ml-2"><span class="mr-1">price</span><i class="fas fa-chevron-down"></i></div>
                        </div>
                    </div>
                    <div id="product_details">
                    <div class="container-fluid mt-100 ">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="cards">
                                <div class="card-body cart">
                                    <div class="col-sm-12 empty-cart-cls text-center"> <img
                                            src="https://i.imgur.com/dCdflKN.png" width="130" height="130"
                                            class="img-fluid mb-4 mr-3">
                                        <h3><strong>Your Cart is Empty</strong></h3>
                                        <h4>Add something to make me happy :)</h4>
                                         <a href="/smart"
                                            class="btn btn-primary cart-btn-transform m-3" 
                                            data-abc="true">
                                            continue shopping
                                            </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4" style="margin-top: 4rem !important;">
                <div class="payment-info">
                    <div class="d-flex justify-content-between align-items-center"><span>Card details</span><img
                            class="rounded" src="https://i.imgur.com/WU501C8.jpg" width="30"></div><span
                        class="type d-block mt-3 mb-1">Card type</span><label class="radio"> <input type="radio" name="card"
                            value="payment" checked> <span><img width="30"
                                src="https://img.icons8.com/color/48/000000/mastercard.png" /></span> </label>
                    <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30"
                                src="https://img.icons8.com/officel/48/000000/visa.png" /></span> </label>
                    <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30"
                                src="https://img.icons8.com/ultraviolet/48/000000/amex.png" /></span> </label>
                    <label class="radio"> <input type="radio" name="card" value="payment"> <span><img width="30"
                                src="https://img.icons8.com/officel/48/000000/paypal.png" /></span> </label>
                    <div><label class="credit-card-label">Name on card</label><input type="text"
                            class="form-control credit-inputs" placeholder="Name"></div>
                    <div><label class="credit-card-label">Card number</label><input type="text"
                            class="form-control credit-inputs" placeholder="0000 0000 0000 0000"></div>
                    <div class="row">
                        <div class="col-md-6"><label class="credit-card-label">Date</label><input type="text"
                                class="form-control credit-inputs" placeholder="12/24"></div>
                        <div class="col-md-6"><label class="credit-card-label">CVV</label><input type="text"
                                class="form-control credit-inputs" placeholder="342"></div>
                    </div>
                    <hr class="line">
                    <div class="d-flex justify-content-between information"><span>Shipping</span><span>free</span></div>
                    <button class="btn btn-primary btn-block d-flex justify-content-between mt-3" type="button"><span
                            class="price prices">0,00 $</span><span>Checkout<i
                                class="fa fa-long-arrow-right ml-1"></i></span></button>
                </div>
            </div>
        </div>
            `;
          }
        });
    }
  });
}


