export interface handleClickModel{
    handleClick: (item:string)=>void;
}


export interface OrderDetail {
    itemID: string;
    name: string;
    price: string;
    count: number;
    offer: string;
}

export interface Orders {
    _id: string;
    restaurantID: string;
    name: string;
    mobile: string;
    options: string;
    address: string;
    price: string;
    createdAt: string;
    orderDetails: OrderDetail[];
    instructions: string;
    status: string;
    __v: number;
    orderID: number;
    updatedAt: string;
}

export type DateRange = 'daily' | 'weekly' | 'monthly';