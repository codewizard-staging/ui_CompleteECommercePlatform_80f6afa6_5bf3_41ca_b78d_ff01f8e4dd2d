import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "screens/landing_page";
import {
Products, 
Carts, 
AnalyticsTiles, 
DiscountCreate, DiscountEdit, DiscountView, 
ProductCreate, ProductEdit, ProductView, 
UserTiles, 
ReviewCreate, ReviewEdit, ReviewView, 
Orders, 
CustomerSupports, 
CustomerSupportCreate, CustomerSupportEdit, CustomerSupportView, 
CategoryCreate, CategoryEdit, CategoryView, 
Reviews, 
CartCreate, CartEdit, CartView, 
PaymentTiles, 
UserCreate, UserEdit, UserView, 
DiscountTiles, 
AnalyticsCreate, AnalyticsEdit, AnalyticsView, 
OrderCreate, OrderEdit, OrderView, 
WishlistCreate, WishlistEdit, WishlistView, 
Wishlists, 
PaymentCreate, PaymentEdit, PaymentView, 
ShipmentTiles, 
Categories, 
ShipmentCreate, ShipmentEdit, ShipmentView
} from "screens";

const Component = (props) => {

    return (
        <Routes>
            

                                                <Route path="/CompleteECommercePlatform/html" element={<LandingPage {...props} title={'LandingPage'} nolistbar={true} />} />
                                                                                                                                                                                                                                                            <Route path="/" element={<Products {...props} title={'Product Table'} nolistbar={true} />} />
                                                                                                                    <Route path="Discounts/view/:id" element={<DiscountView {...props} title={'View Discount'} />} />
                        <Route path="Discounts/edit/:id" element={<DiscountEdit {...props} title={'Edit Discount'} />} />
                        <Route path="Discounts/create" element={<DiscountCreate {...props} title={'Create Discount'} />} />
                                            <Route path="Products/view/:id" element={<ProductView {...props} title={'View Product'} />} />
                        <Route path="Products/edit/:id" element={<ProductEdit {...props} title={'Edit Product'} />} />
                        <Route path="Products/create" element={<ProductCreate {...props} title={'Create Product'} />} />
                                            <Route path="Reviews/view/:id" element={<ReviewView {...props} title={'View Review'} />} />
                        <Route path="Reviews/edit/:id" element={<ReviewEdit {...props} title={'Edit Review'} />} />
                        <Route path="Reviews/create" element={<ReviewCreate {...props} title={'Create Review'} />} />
                                            <Route path="CustomerSupports/view/:id" element={<CustomerSupportView {...props} title={'View CustomerSupport'} />} />
                        <Route path="CustomerSupports/edit/:id" element={<CustomerSupportEdit {...props} title={'Edit CustomerSupport'} />} />
                        <Route path="CustomerSupports/create" element={<CustomerSupportCreate {...props} title={'Create CustomerSupport'} />} />
                                            <Route path="Categories/view/:id" element={<CategoryView {...props} title={'View Category'} />} />
                        <Route path="Categories/edit/:id" element={<CategoryEdit {...props} title={'Edit Category'} />} />
                        <Route path="Categories/create" element={<CategoryCreate {...props} title={'Create Category'} />} />
                                            <Route path="Carts/view/:id" element={<CartView {...props} title={'View Cart'} />} />
                        <Route path="Carts/edit/:id" element={<CartEdit {...props} title={'Edit Cart'} />} />
                        <Route path="Carts/create" element={<CartCreate {...props} title={'Create Cart'} />} />
                                            <Route path="Users/view/:id" element={<UserView {...props} title={'View User'} />} />
                        <Route path="Users/edit/:id" element={<UserEdit {...props} title={'Edit User'} />} />
                        <Route path="Users/create" element={<UserCreate {...props} title={'Create User'} />} />
                                            <Route path="Analyticses/view/:id" element={<AnalyticsView {...props} title={'View Analytics'} />} />
                        <Route path="Analyticses/edit/:id" element={<AnalyticsEdit {...props} title={'Edit Analytics'} />} />
                        <Route path="Analyticses/create" element={<AnalyticsCreate {...props} title={'Create Analytics'} />} />
                                            <Route path="Orders/view/:id" element={<OrderView {...props} title={'View Order'} />} />
                        <Route path="Orders/edit/:id" element={<OrderEdit {...props} title={'Edit Order'} />} />
                        <Route path="Orders/create" element={<OrderCreate {...props} title={'Create Order'} />} />
                                            <Route path="Wishlists/view/:id" element={<WishlistView {...props} title={'View Wishlist'} />} />
                        <Route path="Wishlists/edit/:id" element={<WishlistEdit {...props} title={'Edit Wishlist'} />} />
                        <Route path="Wishlists/create" element={<WishlistCreate {...props} title={'Create Wishlist'} />} />
                                            <Route path="Payments/view/:id" element={<PaymentView {...props} title={'View Payment'} />} />
                        <Route path="Payments/edit/:id" element={<PaymentEdit {...props} title={'Edit Payment'} />} />
                        <Route path="Payments/create" element={<PaymentCreate {...props} title={'Create Payment'} />} />
                                            <Route path="Shipments/view/:id" element={<ShipmentView {...props} title={'View Shipment'} />} />
                        <Route path="Shipments/edit/:id" element={<ShipmentEdit {...props} title={'Edit Shipment'} />} />
                        <Route path="Shipments/create" element={<ShipmentCreate {...props} title={'Create Shipment'} />} />

                <Route path="/category_table" element={<Categories {...props} title={'Category Table'} />} />
                <Route path="/order_table" element={<Orders {...props} title={'Order Table'} />} />
                <Route path="/wishlist_table" element={<Wishlists {...props} title={'Wishlist Table'} />} />
                <Route path="/payment_tiles" element={<PaymentTiles {...props} title={'Payment Tiles'} />} />
                <Route path="/analytics_tiles" element={<AnalyticsTiles {...props} title={'Analytics Tiles'} />} />
                <Route path="/customersupport_table" element={<CustomerSupports {...props} title={'CustomerSupport Table'} />} />
                <Route path="/discount_tiles" element={<DiscountTiles {...props} title={'Discount Tiles'} />} />
                <Route path="/review_table" element={<Reviews {...props} title={'Review Table'} />} />
                <Route path="/product_table" element={<Products {...props} title={'Product Table'} />} />
                <Route path="/user_tiles" element={<UserTiles {...props} title={'User Tiles'} />} />
                <Route path="/shipment_tiles" element={<ShipmentTiles {...props} title={'Shipment Tiles'} />} />
                <Route path="/cart_table" element={<Carts {...props} title={'Cart Table'} />} />
        </Routes>
    )

};

export default Component;
