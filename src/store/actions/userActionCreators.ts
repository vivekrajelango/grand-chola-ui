import _ from 'lodash';
import { AxiosResponse } from 'axios';
import { createAsyncAction, createAction } from 'redux-promise-middleware-actions';
import { userDetailsTypes } from '@/types/userDetails/userDetails';
import { postData, getData } from '@/utils/apiMethods';

export const getMenuListfromApi = createAsyncAction(
  userDetailsTypes.GET_MENU_LIST_FROM_API,
  async (routePath, data) => {
    const response = await getData(routePath, data);
    return response;
  }
);

export const getCategoryListfromApi = createAsyncAction(
  userDetailsTypes.GET_CATEGORIES,
  async (routePath, data) => {
    const response = await getData(routePath, data);
    return response;
  }
);

export const getRestaurantVisibility = createAsyncAction(
  userDetailsTypes.GET_VISIBILITY,
  async (routePath, data) => {
    const response = await getData(routePath, data);
    return response;
  }
);

export const updateRestaurantVisibility = createAsyncAction(
  userDetailsTypes.UPDATE_VISIBILITY,
  async (routePath, data) => {
    const response = await postData(routePath, data);
    return response;
  }
);

export const updateItemById = createAction(
  userDetailsTypes.UPDATE_ITEM_BY_ID,
  async (routePath, data) => {
    const response = await postData(routePath, data);
    return response;
  }
);

export const createNewOrder = createAction(
  userDetailsTypes.CREATE_ORDER,
  async (routePath, data) => {
    const response = await postData(routePath, data);
    return response;
  }
);

export const updateOrderStatus = createAction(
  userDetailsTypes.UPDATE_ORDER_STATUS,
  async (routePath, data) => {
    const response = await postData(routePath, data);
    return response;
  }
);

export const closeSuccessMessage = createAction(
  userDetailsTypes.CLOSE_SUCCESS_MESSAGE,
  (data)=>(data)
);

export const getAllOrders = createAsyncAction(
  userDetailsTypes.GET_ORDER_LIST,
  async (routePath, data) => {
    const response = await getData(routePath, data);
    return response;
  }
);


export const saveCart = createAction(
  userDetailsTypes.SAVE_CART,
  (data)=>(data)
)

export const addItemsCount = createAction(
  userDetailsTypes.ITEMS_COUNT,
  (data)=>(data)
)

export const addFavourites = createAction(
  userDetailsTypes.ADD_FAVOURITES,
  (data)=>(data)
)


export const filteredItems = createAction(
  userDetailsTypes.FILTERED_ITEMS,
  (data)=>(data)
)






