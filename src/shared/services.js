import Helper from "shared/helper";
import { apiUrl as serverApi } from "config";

const GetEntityInfo = async (name) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}${name}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}



 


	    
	 	
	
		
/* Orders */

const GetOrdersCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Orders/$count`;
        if (query) url = `${serverApi}Orders/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetOrdersMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Orders`;
        if (query) url = `${serverApi}Orders?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetOrderSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Orders(${id})`;
        if (params) {
            url = `${serverApi}Orders(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetOrderSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.OrderId;
        let method = "POST";
        let url = `${serverApi}Orders`;
        if (input.OrderId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Orders(${input.OrderId})`;
        } else if (input.OrderId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Orders(${input.OrderId})`;
        }

        delete input['OrderId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.OrderId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   	   							// For Nested APIs
			/* $navPropName */

const SetOrderProductsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, OrderId, ProductId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}OrderProductss`;
        let data = { ProductId, OrderId: OrderId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}OrderProductss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}OrderProductss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetOrderProductsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}OrderProductss?$filter=OrderId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        	   	   		
	
	    
	 	
	
		
/* Payments */

const GetPaymentsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Payments/$count`;
        if (query) url = `${serverApi}Payments/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetPaymentsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Payments`;
        if (query) url = `${serverApi}Payments?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetPaymentSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Payments(${id})`;
        if (params) {
            url = `${serverApi}Payments(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetPaymentSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.PaymentId;
        let method = "POST";
        let url = `${serverApi}Payments`;
        if (input.PaymentId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Payments(${input.PaymentId})`;
        } else if (input.PaymentId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Payments(${input.PaymentId})`;
        }

        delete input['PaymentId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.PaymentId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   		
	
	    
	 	
	
		
/* Users */

const GetUsersCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Users/$count`;
        if (query) url = `${serverApi}Users/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetUsersMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Users`;
        if (query) url = `${serverApi}Users?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetUserSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Users(${id})`;
        if (params) {
            url = `${serverApi}Users(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetUserSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.UserId;
        let method = "POST";
        let url = `${serverApi}Users`;
        if (input.UserId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Users(${input.UserId})`;
        } else if (input.UserId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Users(${input.UserId})`;
        }

        delete input['UserId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.UserId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */

const SetUserCartsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, UserId, CartId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}UserCartss`;
        let data = { CartId, UserId: UserId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}UserCartss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}UserCartss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetUserCartsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}UserCartss?$filter=UserId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        	   							// For Nested APIs
			/* $navPropName */

const SetUserOrdersJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, UserId, OrderId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}UserOrderss`;
        let data = { OrderId, UserId: UserId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}UserOrderss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}UserOrderss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetUserOrdersJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}UserOrderss?$filter=UserId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        	   							// For Nested APIs
			/* $navPropName */

const SetUserReviewsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, UserId, ReviewId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}UserReviewss`;
        let data = { ReviewId, UserId: UserId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}UserReviewss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}UserReviewss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetUserReviewsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}UserReviewss?$filter=UserId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        	   							// For Nested APIs
			/* $navPropName */

const SetUserWishlistsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, UserId, WishlistId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}UserWishlistss`;
        let data = { WishlistId, UserId: UserId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}UserWishlistss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}UserWishlistss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetUserWishlistsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}UserWishlistss?$filter=UserId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        	   							// For Nested APIs
			/* $navPropName */

const SetUserSupportTicketsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, UserId, TicketId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}UserSupportTicketss`;
        let data = { TicketId, UserId: UserId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}UserSupportTicketss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}UserSupportTicketss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetUserSupportTicketsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}UserSupportTicketss?$filter=UserId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
	    
	 	
	
		
/* Discounts */

const GetDiscountsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Discounts/$count`;
        if (query) url = `${serverApi}Discounts/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetDiscountsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Discounts`;
        if (query) url = `${serverApi}Discounts?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetDiscountSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Discounts(${id})`;
        if (params) {
            url = `${serverApi}Discounts(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetDiscountSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.DiscountId;
        let method = "POST";
        let url = `${serverApi}Discounts`;
        if (input.DiscountId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Discounts(${input.DiscountId})`;
        } else if (input.DiscountId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Discounts(${input.DiscountId})`;
        }

        delete input['DiscountId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.DiscountId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   		
	
	    
	 	
	
		
/* Categories */

const GetCategoriesCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Categories/$count`;
        if (query) url = `${serverApi}Categories/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetCategoriesMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Categories`;
        if (query) url = `${serverApi}Categories?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetCategorySingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Categories(${id})`;
        if (params) {
            url = `${serverApi}Categories(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetCategorySingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.CategoryId;
        let method = "POST";
        let url = `${serverApi}Categories`;
        if (input.CategoryId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Categories(${input.CategoryId})`;
        } else if (input.CategoryId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Categories(${input.CategoryId})`;
        }

        delete input['CategoryId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.CategoryId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */

const SetCategoryProductsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, CategoryId, ProductId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}CategoryProductss`;
        let data = { ProductId, CategoryId: CategoryId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}CategoryProductss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}CategoryProductss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetCategoryProductsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}CategoryProductss?$filter=CategoryId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
	    
	 	
	
		
/* CustomerSupports */

const GetCustomerSupportsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}CustomerSupports/$count`;
        if (query) url = `${serverApi}CustomerSupports/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetCustomerSupportsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}CustomerSupports`;
        if (query) url = `${serverApi}CustomerSupports?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetCustomerSupportSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}CustomerSupports(${id})`;
        if (params) {
            url = `${serverApi}CustomerSupports(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetCustomerSupportSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.TicketId;
        let method = "POST";
        let url = `${serverApi}CustomerSupports`;
        if (input.TicketId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}CustomerSupports(${input.TicketId})`;
        } else if (input.TicketId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}CustomerSupports(${input.TicketId})`;
        }

        delete input['TicketId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.TicketId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   		
	
	    
	 	
	
		
/* Products */

const GetProductsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Products/$count`;
        if (query) url = `${serverApi}Products/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetProductsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Products`;
        if (query) url = `${serverApi}Products?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetProductSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Products(${id})`;
        if (params) {
            url = `${serverApi}Products(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetProductSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.ProductId;
        let method = "POST";
        let url = `${serverApi}Products`;
        if (input.ProductId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Products(${input.ProductId})`;
        } else if (input.ProductId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Products(${input.ProductId})`;
        }

        delete input['ProductId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.ProductId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */

const SetProductCartsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, ProductId, CartId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}ProductCartss`;
        let data = { CartId, ProductId: ProductId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}ProductCartss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}ProductCartss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetProductCartsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}ProductCartss?$filter=ProductId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        	   							// For Nested APIs
			/* $navPropName */

const SetProductOrdersJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, ProductId, OrderId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}ProductOrderss`;
        let data = { OrderId, ProductId: ProductId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}ProductOrderss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}ProductOrderss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetProductOrdersJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}ProductOrderss?$filter=ProductId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        	   							// For Nested APIs
			/* $navPropName */

const SetProductReviewsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, ProductId, ReviewId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}ProductReviewss`;
        let data = { ReviewId, ProductId: ProductId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}ProductReviewss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}ProductReviewss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetProductReviewsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}ProductReviewss?$filter=ProductId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        	   	   							// For Nested APIs
			/* $navPropName */

const SetProductWishlistsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, ProductId, WishlistId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}ProductWishlistss`;
        let data = { WishlistId, ProductId: ProductId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}ProductWishlistss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}ProductWishlistss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetProductWishlistsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}ProductWishlistss?$filter=ProductId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
	    
	 	
	
		
/* Shipments */

const GetShipmentsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Shipments/$count`;
        if (query) url = `${serverApi}Shipments/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetShipmentsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Shipments`;
        if (query) url = `${serverApi}Shipments?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetShipmentSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Shipments(${id})`;
        if (params) {
            url = `${serverApi}Shipments(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetShipmentSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.ShipmentId;
        let method = "POST";
        let url = `${serverApi}Shipments`;
        if (input.ShipmentId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Shipments(${input.ShipmentId})`;
        } else if (input.ShipmentId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Shipments(${input.ShipmentId})`;
        }

        delete input['ShipmentId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.ShipmentId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   		
	
	    
	 	
	
		
/* Reviews */

const GetReviewsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Reviews/$count`;
        if (query) url = `${serverApi}Reviews/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetReviewsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Reviews`;
        if (query) url = `${serverApi}Reviews?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetReviewSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Reviews(${id})`;
        if (params) {
            url = `${serverApi}Reviews(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetReviewSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.ReviewId;
        let method = "POST";
        let url = `${serverApi}Reviews`;
        if (input.ReviewId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Reviews(${input.ReviewId})`;
        } else if (input.ReviewId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Reviews(${input.ReviewId})`;
        }

        delete input['ReviewId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.ReviewId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   	   		
	
	    
	 	
	
		
/* Wishlists */

const GetWishlistsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Wishlists/$count`;
        if (query) url = `${serverApi}Wishlists/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetWishlistsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Wishlists`;
        if (query) url = `${serverApi}Wishlists?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetWishlistSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Wishlists(${id})`;
        if (params) {
            url = `${serverApi}Wishlists(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetWishlistSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.WishlistId;
        let method = "POST";
        let url = `${serverApi}Wishlists`;
        if (input.WishlistId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Wishlists(${input.WishlistId})`;
        } else if (input.WishlistId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Wishlists(${input.WishlistId})`;
        }

        delete input['WishlistId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.WishlistId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   	   							// For Nested APIs
			/* $navPropName */

const SetWishlistProductsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, WishlistId, ProductId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}WishlistProductss`;
        let data = { ProductId, WishlistId: WishlistId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}WishlistProductss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}WishlistProductss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetWishlistProductsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}WishlistProductss?$filter=WishlistId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
	    
	 	
	
		
/* Analytics */

const GetAnalyticsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Analytics/$count`;
        if (query) url = `${serverApi}Analytics/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetAnalyticsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Analytics`;
        if (query) url = `${serverApi}Analytics?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetAnalyticsSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Analytics(${id})`;
        if (params) {
            url = `${serverApi}Analytics(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetAnalyticsSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.AnalyticsId;
        let method = "POST";
        let url = `${serverApi}Analytics`;
        if (input.AnalyticsId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Analytics(${input.AnalyticsId})`;
        } else if (input.AnalyticsId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Analytics(${input.AnalyticsId})`;
        }

        delete input['AnalyticsId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.AnalyticsId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
	
	
	    
	 	
	
		
/* Carts */

const GetCartsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Carts/$count`;
        if (query) url = `${serverApi}Carts/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetCartsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Carts`;
        if (query) url = `${serverApi}Carts?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetCartSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Carts(${id})`;
        if (params) {
            url = `${serverApi}Carts(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetCartSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.CartId;
        let method = "POST";
        let url = `${serverApi}Carts`;
        if (input.CartId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Carts(${input.CartId})`;
        } else if (input.CartId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Carts(${input.CartId})`;
        }

        delete input['CartId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.CartId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   	   							// For Nested APIs
			/* $navPropName */

const SetCartProductsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, CartId, ProductId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}CartProductss`;
        let data = { ProductId, CartId: CartId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}CartProductss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}CartProductss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetCartProductsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}CartProductss?$filter=CartId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
 


// Below is a reference function - a possible business logic for ecom reference app
const GetProductStatus = async (productId) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}ProductOnBoardings?$filter=ProductId eq ${productId}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                let _tmp = { Status: '' };
                if (json.value && json.value.length > 0) {
                    _tmp = json.value[0];
                }
                return resolve({ status: res.ok, values: _tmp });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}




const GetMetaData = async () => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}$metadata`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (res.status === 200) {
                const values = await res.text();
                return resolve({ status: res.ok, values });
            }

            return resolve({ status: false, statusText: "Failed fetching data" });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

/* Prodict List View Details */
const GetProductOnBoardings = async () => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}ProductOnBoardings`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

export {
 GetEntityInfo,  GetOrdersCount, GetOrdersMulti, GetOrderSingle, SetOrderSingle, SetOrderProductsJoin, GetOrderProductsJoin, GetPaymentsCount, GetPaymentsMulti, GetPaymentSingle, SetPaymentSingle, GetUsersCount, GetUsersMulti, GetUserSingle, SetUserSingle, SetUserCartsJoin, GetUserCartsJoin, SetUserOrdersJoin, GetUserOrdersJoin, SetUserReviewsJoin, GetUserReviewsJoin, SetUserWishlistsJoin, GetUserWishlistsJoin, SetUserSupportTicketsJoin, GetUserSupportTicketsJoin, GetDiscountsCount, GetDiscountsMulti, GetDiscountSingle, SetDiscountSingle, GetCategoriesCount, GetCategoriesMulti, GetCategorySingle, SetCategorySingle, SetCategoryProductsJoin, GetCategoryProductsJoin, GetCustomerSupportsCount, GetCustomerSupportsMulti, GetCustomerSupportSingle, SetCustomerSupportSingle, GetProductsCount, GetProductsMulti, GetProductSingle, SetProductSingle, SetProductCartsJoin, GetProductCartsJoin, SetProductOrdersJoin, GetProductOrdersJoin, SetProductReviewsJoin, GetProductReviewsJoin, SetProductWishlistsJoin, GetProductWishlistsJoin, GetShipmentsCount, GetShipmentsMulti, GetShipmentSingle, SetShipmentSingle, GetReviewsCount, GetReviewsMulti, GetReviewSingle, SetReviewSingle, GetWishlistsCount, GetWishlistsMulti, GetWishlistSingle, SetWishlistSingle, SetWishlistProductsJoin, GetWishlistProductsJoin, GetAnalyticsCount, GetAnalyticsMulti, GetAnalyticsSingle, SetAnalyticsSingle, GetCartsCount, GetCartsMulti, GetCartSingle, SetCartSingle, SetCartProductsJoin, GetCartProductsJoin, GetProductStatus, GetMetaData, GetProductOnBoardings
};
