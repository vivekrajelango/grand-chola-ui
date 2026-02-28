import { OrderColumns } from '@/constants/constants';
import { userDetailsTypes as types } from '@/types/userDetails/userDetails';
import _ from 'lodash';

export interface UserAppState {
  visibilityStatus: boolean;
  getMenuAPiListFetched: boolean;
  getMenuAPiList: any;
  getCategoryListFetched: boolean;
  getCategoryList: any;
  getOfferList: any;
  cartDetails: string,
  addItemsCount: any,
  favourites: any,
  filtered: any,
  createOrderStatus: boolean,
  createOrder: any,
  getOrdersList: any
}

const initialState: UserAppState = {
  visibilityStatus:false,
  getMenuAPiListFetched: false,
  getMenuAPiList: [],
  getCategoryListFetched: false,
  getCategoryList: [],
  getOfferList: [],
  cartDetails: '',
  addItemsCount: {},
  favourites:[],
  filtered:[],
  createOrderStatus: false,
  createOrder: {},
  getOrdersList: []
};


export default function actionReducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
): any {
  switch (type) {
    case types.SAVE_CART: {
      return {
        ...state,
        cartDetails:payload
      }
    }
    case types.ITEMS_COUNT: {
      return {
        ...state,
        addItemsCount:payload
      }
    }
    case types.ADD_FAVOURITES: {
      return {
        ...state,
        favourites:[
          ...state.favourites,
          payload
        ]
      }
    }
    case types.FILTERED_ITEMS: {
      return {
        ...state,
        filtered:payload
      }
    }
    //Get api for Menu list
    case types.GET_MENU_LIST_FROM_API_PENDING: {
      return {
        ...state,
        getMenuAPiListFetched:false
      }
    }
    case types.GET_MENU_LIST_FROM_API_FULFILLED: {
      return {
        ...state,
        getMenuAPiListFetched:true,
        getMenuAPiList: payload.data.menu,
        getOfferList: payload.data.offers
      }
    }
    case types.GET_MENU_LIST_FROM_API_REJECTED: {
      return {
        ...state,
        getMenuAPiListFetched:true
      }
    }

    //Get categories list
    case types.GET_CATEGORIES_PENDING: {
      return {
        ...state,
        getCategoryListFetched:false
      }
    }
    case types.GET_CATEGORIES_FULFILLED: {
      return {
        ...state,
        getCategoryListFetched:true,
        getCategoryList: payload.data.categories
      }
    }
    case types.GET_CATEGORIES_REJECTED: {
      return {
        ...state,
        getCategoryListFetched:false
      }
    }

    //Get Visibility Status
    case types.GET_VISIBILITY_PENDING: {
      return {
        ...state,
      }
    }
    case types.GET_VISIBILITY_FULFILLED: {
      return {
        ...state,
        visibilityStatus:payload.data.restaurant[0].visible,
      }
    }
    case types.GET_VISIBILITY_REJECTED: {
      return {
        ...state,
        visibilityStatus:payload.data.restaurant[0].visible
      }
    }

    //Update Visibility Status
    case types.UPDATE_VISIBILITY_PENDING: {
      return {
        ...state,
      }
    }
    case types.UPDATE_VISIBILITY_FULFILLED: {
      return {
        ...state,
        visibilityStatus:payload.data.visible,
      }
    }
    case types.GET_VISIBILITY_REJECTED: {
      return {
        ...state,
        visibilityStatus:payload.data.visible
      }
    }

    //Creating new orders
    case types.CREATE_ORDER_PENDING: {
      return {
        ...state,
        createOrderStatus: false,
        createOrder:{}
      }
    }
    case types.CREATE_ORDER_FULFILLED: {
      return {
        ...state,
        createOrderStatus: true,
        createOrder:payload.data
      }
    }
    case types.CREATE_ORDER_REJECTED: {
      return {
        ...state,
        createOrderStatus: false,
        createOrder:payload.data
      }
    }

    //Update Order Close modal status
    case types.CLOSE_SUCCESS_MESSAGE: {
      return {
        ...state,
        createOrderStatus: payload,
        createOrder:{
          orderID:0
        }
      }
    }

    //Get all orders for admin
    case types.GET_ORDER_LIST_PENDING: {
      return {
        ...state,
        getOrdersList:[]
      }
    }
    case types.GET_ORDER_LIST_FULFILLED: {
      return {
        ...state,
        getOrdersList:payload.data.orders
      }
    }
    case types.GET_ORDER_LIST_REJECTED: {
      return {
        ...state,
        getOrdersList:[]
      }
    }
    
    default:
      return state;
  }
}
