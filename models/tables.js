const User = require("./Tables/usersModel")
const Address = require("./Tables/addressModel")
const Pancard = require("./Tables/pancardModel")
const Category = require("./Tables/categoriesModel")
const SubCategory = require("./Tables/subCategory")
const Products = require("./Tables/Products/ProductsModel")
const ProductImage = require("./Tables/Products/productImagesModel")
const ProductDetailHeading = require("./Tables/Products/PorductDetailsHeadingModel")
const ProductDetailsData = require("./Tables/Products/ProductDetailDataModel")
const Rating = require("./Tables/ratingsModel")
const SubChildCategory = require("./Tables/subChildCategoryModel")

//rating model
Products.hasMany(Rating, { foreignKey: "product_id" })
User.hasMany(Rating, { foreignKey: "user_id" })

module.exports = { User, Address, Pancard, Category, SubCategory, SubChildCategory, Products, ProductImage, ProductDetailHeading, ProductDetailsData, Rating }