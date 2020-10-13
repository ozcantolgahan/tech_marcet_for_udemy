const connection=require("../utility/database");
module.exports=class Category{
    constructor(id,categoryName){
        this.id=id;
        this.categoryName=categoryName;
    }
    static getAllCategories(){
        return connection.execute("SELECT * FROM shop_tech.categories;");
    }
}