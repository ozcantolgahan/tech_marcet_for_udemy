const Category = require("../models/category");
const Product = require("../models/product");
module.exports.getAllProductsForAdmin=function(req,res){
    Product.getAllProducts().then((products)=>{
        res.render("admin",{title:"Admin",categories:[],products:products[0]});
    });

};
module.exports.getProductEdit=function(req,res){
    
    Product.getProductEdit(req.params.id).then((product)=>{
        
res.render("edit-product",{title:product[0].productName,categories:[],product:product[0][0],buttonValue:"Edit",pathWay:"/admin/edited"});
    });
   
};
module.exports.editTheProduct=function(req,res){
    let product=new Product();
    product.id=req.body.id;
    product.productName=req.body.productName;
    product.productDescripe=req.body.productDescripe;
    product.productPrice=req.body.productPrice;
    product.categoryId=req.body.categoryId;
    product.productImageUrl=req.body.productImageUrl;
    Product.editTheProduct(product).then((value)=>{
        res.redirect("/admin");
    });
    
};
module.exports.deleteTheProduct=function(req,res){
Product.deleteTheProduct(req.params.id).then(()=>{
    res.redirect("/admin");
});
};
module.exports.addNewProduct=function(req,res){
res.render("add-product",{title:"Add Product",categories:[],product:[],buttonValue:"Add Product",pathWay:"/admin/added-product"});
};
module.exports.addTheProduct=function(req,res){
    let product=new Product();
    product.id=req.body.id;
    product.productName=req.body.productName;
    product.productDescripe=req.body.productDescripe;
    product.productPrice=req.body.productPrice;
    product.categoryId=req.body.categoryId;
    product.productImageUrl=req.body.productImageUrl;
    product.saveTheProduct().then(()=>{
        res.redirect("/admin");
    });
    
}