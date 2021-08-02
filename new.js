fetch("https://run.mocky.io/v3/bf175661-5e9f-4112-8580-d587759ff72e")
  .then((response) => response.json())
  .then((data) => data.products)
  .then((data) => {
    showGender(data);
    showBrand(data);
    showCategory(data);
    showProducts(data);
    saveData(data);
  })
  .catch((err) => {
    console.log(err);
    document.getElementById("setProduct").innerHTML = "Can't Fetch data";
  });

showGender = (data) => {
  var check_gender = document.getElementById("checkGender");
  var genName = []; 
  data.forEach((elem) => {
    genName.push(elem["gender"]);
    genName.sort();
  });
  var genderName = new Set(genName);
  var htmlContent = `<div class="heading d-flex justify-content-between align-items-center">
    <h6 class="text-uppercase">Gender</h6></div>`;
  for (let element of genderName) {
    htmlContent +=
      `<div class="d-flex justify-content-between mt-2"><div class="form-check"> <input class="form-check-input" 
        type="radio" name="gender" onclick="genderFilter()" value=${element} onclick="radioFilter()" id=${element}>
        <label class="form-check-label" for=${element}>${element}</label></div></div>`;
  }
  check_gender.innerHTML = htmlContent;
};

showBrand = (data) => {
  var check_brand = document.getElementById("checkBrand");
  var brName = [];
  data.forEach((elem) => {
    brName.push(elem["brand"]);
    brName.sort();
  });
  var brandName = new Set(brName);
  var htmlContent = `<div class="heading d-flex justify-content-between align-items-center">
    <h6 class="text-uppercase">Brand</h6></div>`;
  for (let element of brandName) {
    htmlContent +=
      `<div class="d-flex justify-content-between mt-2"><div class="form-check"> 
        <input class="form-check-input" type="checkbox" name="brand" value=${element} onclick="brandFilter()" 
        id=${element}><label class="form-check-label" for=${element}>${element}</label></div></div>`;
  }
  check_brand.innerHTML = htmlContent;
};

showCategory = (data) => {
  var check_cat = document.getElementById("checkCategory");
  var catName = [];
  data.forEach((elem) => {
    catName.push(elem["category"]);
    catName.sort();
  });
  var categoryName = new Set(catName);
  var htmlContent = `<div class="heading d-flex justify-content-between align-items-center">
    <h6 class="text-uppercase">Category</h6></div>`;
  for (let element of categoryName) {
    htmlContent +=`<div class="d-flex justify-content-between mt-2"><div class="form-check"> 
        <input class="form-check-input" type="checkbox" name="category" value=${element} onclick="catFilter()"
        id=${element}><label class="form-check-label" for=${element}>${element}</label></div></div>`;
  }
  check_cat.innerHTML = htmlContent;
};

showProducts = (data) => {
  var prod_cat = document.getElementById("setProduct");
  htmlContent = "";
  data.forEach((setData) => {
    htmlContent +=
      `<div class="col-md-4">
        <div class="product py-4">
            <span class="off bg-success">` +setData["discountDisplayLabel"] +`</span>
            <div class="text-center"> <img src=` + setData["searchImage"] +` width="200"> </div>
            <div class="about"><h6>` +setData["product"] +`</h6></div>
            <div id="brand">` +setData["brand"] +`</div>
            <div id="shoes">` + setData["sizes"] +`</div>
            <div id="rate">Rs.` + setData["price"] +` <span class="maxrate">Rs.` +setData["mrp"] + `</span>
                    <span class="dislabel">` +setData["discountDisplayLabel"] +`</span>
            </div><div class="cart-button mt-3 px-2 d-flex justify-content-between align-items-center">
                    <button class="btn btn-primary text-uppercase">Add to cart</button>
                    <div class="add"><span class="product_fav"><i class="fa fa-heart-o"></i></span>
                        <span class="product_fav"><i class="fa fa-opencart"></i></span>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
  });
  prod_cat.innerHTML = htmlContent;
};

var productData = [];
const saveData = (data) => {
  productData = data;
};

function genderFilter() {
  var genderVal = document.querySelector('input[name="gender"]:checked').value;
  var data = productData.filter((radiodata) => radiodata.gender === genderVal);
  showProducts(data);
}
  
function brandFilter() {
  var brandVal = document.querySelectorAll('input[name="brand"]:checked');
  var arr = [];
  brandVal.forEach((elem) => {
  elem.checked ? arr.push(elem.value) : null;});
  // console.log(arr);
  var resultBrand = [];
  arr.forEach((val) => {
    resultBrand = resultBrand.concat(productData.filter((checkboxdata)=>checkboxdata.brand.includes(val)))});
    resultBrand.length !== 0 ?showProducts(resultBrand):showProducts(productData);
}

function catFilter(){
  var catVal=document.querySelectorAll('input[name="category"]:checked');
  var arr=[];
  catVal.forEach((elem)=>{
    elem.checked?arr.push(elem.value):null;
  });
  var resultCat=[];
  arr.forEach((val)=>{
    resultCat=resultCat.concat(productData.filter((checkboxdata)=>checkboxdata.category.includes(val)))
  });
  resultCat.length!==0 ?showProducts(resultCat):showProducts(productData);
}

function buttonFun(){
  var buttonVal=document.getElementById('searchData').value.toUpperCase();
  var buttonResult = productData.filter((searchitem)=>searchitem.product.toUpperCase().includes(buttonVal));
  showProducts(buttonResult);
}




