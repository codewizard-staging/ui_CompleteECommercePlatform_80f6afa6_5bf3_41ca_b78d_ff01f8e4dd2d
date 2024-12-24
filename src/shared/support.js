import {
	
		
 	 							// For Nested APIs / Join tables			
	 	 	 	
		
 	 	
		
 							// For Nested APIs / Join tables			
	 							// For Nested APIs / Join tables			
	 							// For Nested APIs / Join tables			
	 							// For Nested APIs / Join tables			
	 							// For Nested APIs / Join tables			
	 	
		
 	 	
		
 							// For Nested APIs / Join tables			
	 	
		
 	 	
		
 							// For Nested APIs / Join tables			
	 							// For Nested APIs / Join tables			
	 							// For Nested APIs / Join tables			
	 	 							// For Nested APIs / Join tables			
	 	
		
 	 	
		
 	 	 	
		
 	 							// For Nested APIs / Join tables			
	 	
		
 	
		
 	 							// For Nested APIs / Join tables			
	   SetOrderSingle, SetOrderProductsJoin, SetPaymentSingle, SetUserSingle, SetUserCartsJoin, SetUserOrdersJoin, SetUserReviewsJoin, SetUserWishlistsJoin, SetUserSupportTicketsJoin, SetDiscountSingle, SetCategorySingle, SetCategoryProductsJoin, SetCustomerSupportSingle, SetProductSingle, SetProductCartsJoin, SetProductOrdersJoin, SetProductReviewsJoin, SetProductWishlistsJoin, SetShipmentSingle, SetReviewSingle, SetWishlistSingle, SetWishlistProductsJoin, SetAnalyticsSingle, SetCartSingle, SetCartProductsJoin
} from "./services";
import Helper from "shared/helper";

var fn = {};

const defaultError = "Something went wrong while processing request!";

		
     
fn.AddOrUpdateOrder = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetOrderSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateOrderProducts = async (ProductId, OrderId, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: ProductId, Deleted: input.Deleted };
            rslt = await SetOrderProductsJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, ProductId: input.ProductId });
            }

            data = { ProductId: input.ProductId, Deleted: input.Deleted };

            rslt = await SetProductSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, ProductId: input.ProductId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetProductSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: ProductId, ProductId: id, OrderId };
                rslt = await SetOrderProductsJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdatePayment = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetPaymentSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateUser = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetUserSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateUserCarts = async (CartId, UserId, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: CartId, Deleted: input.Deleted };
            rslt = await SetUserCartsJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, CartId: input.CartId });
            }

            data = { CartId: input.CartId, Deleted: input.Deleted };

            rslt = await SetCartSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, CartId: input.CartId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetCartSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: CartId, CartId: id, UserId };
                rslt = await SetUserCartsJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateUserOrders = async (OrderId, UserId, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: OrderId, Deleted: input.Deleted };
            rslt = await SetUserOrdersJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, OrderId: input.OrderId });
            }

            data = { OrderId: input.OrderId, Deleted: input.Deleted };

            rslt = await SetOrderSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, OrderId: input.OrderId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetOrderSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: OrderId, OrderId: id, UserId };
                rslt = await SetUserOrdersJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateUserReviews = async (ReviewId, UserId, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: ReviewId, Deleted: input.Deleted };
            rslt = await SetUserReviewsJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, ReviewId: input.ReviewId });
            }

            data = { ReviewId: input.ReviewId, Deleted: input.Deleted };

            rslt = await SetReviewSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, ReviewId: input.ReviewId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetReviewSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: ReviewId, ReviewId: id, UserId };
                rslt = await SetUserReviewsJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateUserWishlists = async (WishlistId, UserId, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: WishlistId, Deleted: input.Deleted };
            rslt = await SetUserWishlistsJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, WishlistId: input.WishlistId });
            }

            data = { WishlistId: input.WishlistId, Deleted: input.Deleted };

            rslt = await SetWishlistSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, WishlistId: input.WishlistId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetWishlistSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: WishlistId, WishlistId: id, UserId };
                rslt = await SetUserWishlistsJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateUserSupportTickets = async (TicketId, UserId, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: TicketId, Deleted: input.Deleted };
            rslt = await SetUserSupportTicketsJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, TicketId: input.TicketId });
            }

            data = { TicketId: input.TicketId, Deleted: input.Deleted };

            rslt = await SetCustomerSupportSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, TicketId: input.TicketId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetCustomerSupportSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: TicketId, TicketId: id, UserId };
                rslt = await SetUserSupportTicketsJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateDiscount = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetDiscountSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateCategory = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetCategorySingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateCategoryProducts = async (ProductId, CategoryId, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: ProductId, Deleted: input.Deleted };
            rslt = await SetCategoryProductsJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, ProductId: input.ProductId });
            }

            data = { ProductId: input.ProductId, Deleted: input.Deleted };

            rslt = await SetProductSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, ProductId: input.ProductId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetProductSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: ProductId, ProductId: id, CategoryId };
                rslt = await SetCategoryProductsJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateCustomerSupport = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetCustomerSupportSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateProduct = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetProductSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateProductCarts = async (CartId, ProductId, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: CartId, Deleted: input.Deleted };
            rslt = await SetProductCartsJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, CartId: input.CartId });
            }

            data = { CartId: input.CartId, Deleted: input.Deleted };

            rslt = await SetCartSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, CartId: input.CartId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetCartSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: CartId, CartId: id, ProductId };
                rslt = await SetProductCartsJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateProductOrders = async (OrderId, ProductId, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: OrderId, Deleted: input.Deleted };
            rslt = await SetProductOrdersJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, OrderId: input.OrderId });
            }

            data = { OrderId: input.OrderId, Deleted: input.Deleted };

            rslt = await SetOrderSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, OrderId: input.OrderId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetOrderSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: OrderId, OrderId: id, ProductId };
                rslt = await SetProductOrdersJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateProductReviews = async (ReviewId, ProductId, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: ReviewId, Deleted: input.Deleted };
            rslt = await SetProductReviewsJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, ReviewId: input.ReviewId });
            }

            data = { ReviewId: input.ReviewId, Deleted: input.Deleted };

            rslt = await SetReviewSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, ReviewId: input.ReviewId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetReviewSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: ReviewId, ReviewId: id, ProductId };
                rslt = await SetProductReviewsJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateProductWishlists = async (WishlistId, ProductId, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: WishlistId, Deleted: input.Deleted };
            rslt = await SetProductWishlistsJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, WishlistId: input.WishlistId });
            }

            data = { WishlistId: input.WishlistId, Deleted: input.Deleted };

            rslt = await SetWishlistSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, WishlistId: input.WishlistId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetWishlistSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: WishlistId, WishlistId: id, ProductId };
                rslt = await SetProductWishlistsJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateShipment = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetShipmentSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateReview = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetReviewSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateWishlist = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetWishlistSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateWishlistProducts = async (ProductId, WishlistId, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: ProductId, Deleted: input.Deleted };
            rslt = await SetWishlistProductsJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, ProductId: input.ProductId });
            }

            data = { ProductId: input.ProductId, Deleted: input.Deleted };

            rslt = await SetProductSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, ProductId: input.ProductId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetProductSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: ProductId, ProductId: id, WishlistId };
                rslt = await SetWishlistProductsJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateAnalytics = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetAnalyticsSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}
		
     
fn.AddOrUpdateCart = async (input, excludesItems) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, id = null;
        let excludes = excludesItems || [];
        Object.values(input)
            .filter((x) => x.value)
            .map((x) => {
                if (excludes.indexOf(x.key) === -1) {
                    data[x.key] = x.value;
                }
            });

        global.Busy(true);
        let rslt = await SetCartSingle(data);
        global.Busy(false);
        if (rslt.status) {
            id = rslt.id;
            status = true;
        } else {
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }

        return resolve({ status, id });
    });
}


  
fn.AddOrUpdateCartProducts = async (ProductId, CartId, input) => {
    return new Promise(async (resolve) => {
        let data = {}, status = false, rslt, id = null;
        global.Busy(true);

        if (input.Deleted) {
            data = { Id: ProductId, Deleted: input.Deleted };
            rslt = await SetCartProductsJoin(data);
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, ProductId: input.ProductId });
            }

            data = { ProductId: input.ProductId, Deleted: input.Deleted };

            rslt = await SetProductSingle(data);
	    
            if (!rslt.status) {
                global.Busy(false);
                const msg = rslt.statusText || defaultError;
                global.AlertPopup("error", msg);
                return resolve({ status, ProductId: input.ProductId });
            }

            return resolve({ status: true });
        }

        const edited = input.Edited || false;

        delete input['Edited'];

        rslt = await SetProductSingle(input);
        if (rslt.status) {
            id = rslt.id;
            status = true;
            if (!Helper.IsNullValue(id) && !edited) {
                data = { Id: ProductId, ProductId: id, CartId };
                rslt = await SetCartProductsJoin(data);
                if (!rslt.status) {
                    global.Busy(false);
                    const msg = rslt.statusText || defaultError;
                    global.AlertPopup("error", msg);
                    return resolve({ status, id });
                }
            }
        } else {
            global.Busy(false);
            const msg = rslt.statusText || defaultError;
            global.AlertPopup("error", msg);
        }
        global.Busy(false);

        return resolve({ status, id });
    });
}




export default fn;
