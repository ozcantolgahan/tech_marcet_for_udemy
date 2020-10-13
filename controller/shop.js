const path=require("path");
const { title } = require("process");
const Category = require("../models/category");
const Product = require("../models/product");
var categories=[];
var basket=[];
module.exports.getProductsForHomepage=function(req,res){

   Category.getAllCategories().then((value)=>{
       categories=value[0];
    Product.getProductsForHomepage().then((products)=>{
        res.render("index",{title:"Anasayfa",categories:categories,products:products[0]});
    });
   })
};
module.exports.getAllProducts=function(req,res){
    Product.getAllProducts().then((products)=>{
        res.render("all-products",{title:"Ürünler",categories:categories,products:products[0]})

    });

};
module.exports.aboutUs=function(req,res){
    res.render("about-us",{title:"Hakkımızda",categories:categories});
};
module.exports.contact=function(req,res){
    res.render("contact",{title:"İletişim",categories:categories});
};

module.exports.getProduct=function(req,res){
    Product.getProduct(req.params.id).then((product)=>{
        res.render("product-detail",{title:product[0][0].productName,categories:categories,product:product[0][0]});

    });
 
};
module.exports.getProductByCategory=function(req,res){
Product.getProductsByCategory(req.params.categoryName).then((product)=>{
    let dataControl=product[0].length==0;
    console.log(dataControl);
res.render("all-products",{title:req.params.categoryName,categories:categories,products:product[0],dataControl:dataControl});
});
};
module.exports.errorPage=function(req,res){
    res.render("error-page",{title:"Page 404 Found",categories:categories});
};
module.exports.getProductSearched=function(req,res){
Product.getProductSearched(req.query.productName).then((products)=>{
res.render("all-products",{title:req.query.productName,categories:categories,products:products[0]});
});
};
module.exports.basket=function(req,res){
    let totalPrice=0;
    for(let i=0;i<basket.length;i++){
        totalPrice+=basket[i].productPrice;
    }
    res.render("basket",{title:"Basket",categories:categories,products:basket,totalPrice:totalPrice});
};
module.exports.addToBasket=function(req,res){
    basket.push(JSON.parse(req.body.product));
    res.redirect("/basket");
};
module.exports.removeFromBasket=function(req,res){
    let element=JSON.parse(req.body.product);
    let currentIndex=basket.findIndex((product)=>product.id==element.id);
    basket.splice(currentIndex,1);
    res.redirect("/basket");
};
module.exports.categories=categories;