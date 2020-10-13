const connection=require("../utility/database");
module.exports=class Product{
    constructor(id,productName,productDescripe,productPrice,categoryId,productImageUrl){
        this.id=id;
        this.productName=productName;
        this.productDescripe=productDescripe;
        this.productPrice=productPrice;
        this.categoryId=categoryId;
        this.productImageUrl=productImageUrl;
    }
    static getProductsForHomepage(){
        return connection.execute("SELECT * FROM shop_tech.products LIMIT 8;");
    }
    static getAllProducts(){
        return connection.execute("SELECT * FROM shop_tech.products;");
    }
    static getProduct(id){
        return connection.execute("SELECT * FROM shop_tech.products where products.id=?;",[id]);
    }
    static getProductsByCategory(categoryName){
        return connection.execute("SELECT products.id,productName,productDescripe,productPrice,productImageUrl FROM shop_tech.products INNER JOIN shop_tech.categories on products.categoryId=categories.id where categories.categoryName=?;",[categoryName]);

    }
    static getProductSearched(productName){
        return connection.execute("SELECT products.id,productName,productDescripe,productPrice,productImageUrl FROM shop_tech.products INNER JOIN shop_tech.categories where (products.productName LIKE ? or categories.categoryName LIKE ? ) and products.categoryId=categories.id;",[`${productName}%`,`${productName}%`]);
    }
    static getProductEdit(productId){
        return connection.execute("SELECT * FROM shop_tech.products where id=?;",[productId]);
    }
    static editTheProduct(product){
     return connection.execute("UPDATE shop_tech.products SET productName = ?, productDescripe = ?,productPrice=?,categoryId=?,productImageUrl=? WHERE id =?;",[product.productName,product.productDescripe,product.productPrice,product.categoryId,product.productImageUrl,product.id]);
    }
    static deleteTheProduct(id){
        return connection.execute("DELETE FROM shop_tech.products where id=?;",[id]);
    }
    saveTheProduct(){
        return connection.execute("INSERT INTO shop_tech.products (productName, productDescripe, productPrice, categoryId, productImageUrl ) VALUES (?,?,?,?,?);",[this.productName,this.productDescripe,this.productPrice,this.categoryId,this.productImageUrl]);
    }
 
}