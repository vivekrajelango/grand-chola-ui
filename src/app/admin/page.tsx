"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { AppState } from "@/store/reducers";
import dayjs from 'dayjs';
import { getMenuListfromApi, updateItemById, getRestaurantVisibility, updateRestaurantVisibility, getAllOrders, updateOrderStatus, addMenuItem, deleteMenuItem, getCategoryListfromApi } from "@/store/actions";
import { routePath } from "@/constants/api";
import Table from "@/components/common/Table";
import { DateFormats, MenuColumns, OrderColumns } from "@/constants/constants";
import TabComponent from "@/components/common/Tabs";
import LoaderComponent from "@/components/common/Loader";
import { ModalPopUp } from "@/components/common/Modal";
import EditPage from "@/components/EditPage";
import AddMenuPage from "@/components/AddMenuPage";
import Accordion from "@/components/common/Accordion";
import { RefreshCcw, RotateCw } from "lucide-react";
import SearchBar from "@/components/common/SearchBar";
import BarChartComponent from "@/components/common/Chart";
import SalesDashboard from "@/components/common/Sales";
import Drawer from "@/components/common/Drawer";
import { sendOrderAcceptance, sendPaymentRequest } from "@/utils/whatsappService";


function Admin() {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathName = usePathname();
    const getStatus = useSelector((state: AppState) => state.user.visibilityStatus);
    const getMenuList = useSelector((state: AppState) => state.user.getMenuAPiList);
    const getOrderList = useSelector((state: AppState) => state.user.getOrdersList);
    const getCategoryList = useSelector((state: AppState) => state.user.getCategoryList);
    // const [currentTime, setCurrentTime] = useState(dayjs().format(DateFormats.DATE_WITH_TIME));
    const currentTimeRef = useRef(dayjs().format(DateFormats.DATE_WITH_TIME));
    
    const [isStatus, setStatus] = useState(getStatus);
    const [isMenuFetched, setIsMenuFetched] = useState(false);
    const [Menus, setMenus] = useState<any>(getMenuList);
    const [Orders, setOrders] = useState<any>(getOrderList);
    const [activeTab, setActiveTab] = useState('orders');
    const [isOpen, setOpen] = useState(false);
    const [isAddOpen, setAddOpen] = useState(false);
    const [isDeleteConfirm, setDeleteConfirm] = useState(false);
    const [menuData, setMenuData] = useState<any>(null);
    const [isLoader, setLoader] = useState(false);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof any;
        direction: 'asc' | 'desc';
    } | null>(null);

    const handleSort = (key: keyof any) => {
        setSortConfig({
            key,
            direction: sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        });

        const sortedData = [...Menus].sort((a, b) => {
            if (a[key] < b[key]) return sortConfig?.direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return sortConfig?.direction === 'asc' ? 1 : -1;
            return 0;
        });
        
        setMenus(sortedData);
    };

    const handleMenuById = (item: any) => {
        setMenuData(item);
        setOpen(true)
    }

    const saveHandler = async (item: any) => {
        setOpen(false);
        setLoader(true);
        const scrollPosition = window.scrollY;
        const data = {
            "menuItems": [item]
        }
        await dispatch(updateItemById(routePath.UPDATE_ITEM_BY_ID, data));
        await dispatch(getMenuListfromApi(routePath.GET_ADMIN_MENU_LIST, ""));
        // if (pathName) {
        //     router.replace(pathName);
        // }
        setLoader(false);
        // setActiveTab('menus');
        window.scrollTo(0, scrollPosition);
    }

    const deleteHandler = async () => {
        if (!menuData?.itemID) return;
        setDeleteConfirm(false);
        setOpen(false);
        setLoader(true);
        await dispatch(deleteMenuItem(routePath.DELETE_MENU_ITEM, { itemID: menuData.itemID }));
        await dispatch(getMenuListfromApi(routePath.GET_ADMIN_MENU_LIST, ""));
        setLoader(false);
    }

    const addSaveHandler = async (item: any) => {
        setAddOpen(false);
        setLoader(true);
        await dispatch(addMenuItem(routePath.ADD_MENU_ITEM, { menuItem: item }));
        await dispatch(getMenuListfromApi(routePath.GET_ADMIN_MENU_LIST, ""));
        setLoader(false);
    }

    const handleVisibilityStatus = () => {
        setOpen(!isOpen);
    }

    const filterText = (text: any) => {
        if (text.trim() === "") {
            setMenus(getMenuList);
        } else {
            const filteredMenus = Menus.filter((menu: any) => {
                return menu.name.toLowerCase().includes(text.toLowerCase())
            });
            setMenus(filteredMenus);
        }
    }

    const submitVisibilityStatus = async () => {
        await dispatch(updateRestaurantVisibility(routePath.UPDATE_VISIBILITY, { visible: !isStatus }));
        setOpen(!isOpen);
    }

    const refreshOrder = () => {
        dispatch(getAllOrders(routePath.GET_ORDERS_LIST, ""));
    }

    const handleStatus = async (id: any, status: any, orderDetails?: any) => {
        const data = {
            orderID: id,
            status: status
        }
        await dispatch(updateOrderStatus(routePath.UPDATE_ORDER_STATUS, data));

        // Send WhatsApp notifications based on order status
        try {
            if (orderDetails) {
                if (status === 'accepted') {
                    await sendOrderAcceptance({
                        orderNumber: id.toString(),
                        customerName: orderDetails.name,
                        customerPhone: orderDetails.mobile,
                        orderStatus: status
                    });
                } else if (status === 'ready') {
                    await sendPaymentRequest({
                        orderNumber: id.toString(),
                        customerName: orderDetails.name,
                        customerPhone: orderDetails.mobile,
                        orderStatus: status,
                        orderAmount: parseFloat(orderDetails.price)
                    });
                }
            }
        } catch (error) {
            console.error('Failed to send WhatsApp notification:', error);
        }

        refreshOrder();
    }

    useEffect(() => {
        if (localStorage.getItem('dashboard') === 'true') {
            refreshOrder();
            const interval = setInterval(() => {
                refreshOrder();
            }, 120000);

            return () => clearInterval(interval);
        } else {
            router.push('/login');
        }
    }, []);

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         currentTimeRef.current = dayjs().format(DateFormats.DATE_WITH_TIME);
    //     }, 1000);

    //     return () => clearInterval(timer);
    // }, []);

    const updateTime = useCallback(() => {
        currentTimeRef.current = dayjs().format("YYYY-MM-DD HH:mm:ss");
    }, []);

    useEffect(() => {
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer); 
    }, [updateTime]);

    useEffect(() => {
        dispatch(getRestaurantVisibility(routePath.GET_VISIBILITY, ""));
    }, []);

    useEffect(() => {
        setStatus(getStatus);
    }, [getStatus])

    useEffect(() => {
        if (!getCategoryList || getCategoryList.length === 0) {
            dispatch(getCategoryListfromApi(routePath.GET_CATEGORIES, ""));
        }
    }, []);

    useEffect(() => {
        if (!isMenuFetched && (!getMenuList || getMenuList.length === 0)) {
            dispatch(getMenuListfromApi(routePath.GET_ADMIN_MENU_LIST, ""));
            setIsMenuFetched(true);
        }

        if (getMenuList) setMenus(getMenuList);
        if (getOrderList) setOrders(getOrderList);
    }, [getMenuList, getOrderList, isMenuFetched]);

    return (
        <div className="bg-white">
            <TabComponent activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'orders' &&
                <>
                    <div className='flex flex-col items-end justify-center mt-24 p-3 text-gray-600'>
                        <div className="flex flex-row w-full justify-between items-center gap-2">
                            <div className="font-bold">{dayjs().format(DateFormats.DAY)} : {currentTimeRef.current}</div>
                            
                            <div className="flex items-center justify-center rounded-lg w-10 h-10 p-1 bg-purple-500 mb-4 ">
                                <RefreshCcw size={24} className="text-white" onClick={refreshOrder} />
                            </div>
                        </div>
                        {Orders?.length ?
                            <div className="bg-gray-50 w-full flex items-center justify-center">
                                <Accordion items={Orders} updateStatus={handleStatus} />
                            </div>
                            : <div className="bg-gray-50 w-full flex items-center justify-center">
                                Refreshing...
                            </div>
                        }
                    </div>
                </>
            }
            {activeTab === 'menus' &&
                <div className="mt-20 overflow-y-scroll">
                    <div className="flex flex-row items-center justify-between px-2">
                        <SearchBar handleSearch={filterText} />
                        <button
                            onClick={() => setAddOpen(true)}
                            className="ml-2 flex-shrink-0 flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg px-3 py-2"
                        >
                            + Add Menu
                        </button>
                    </div>
                    {Menus.length ? (
                        <div className="mt-3 p-2">
                            <Table
                                data={Menus}
                                columns={MenuColumns}
                                onRowClick={handleMenuById}
                                handleSort={handleSort}
                                sortConfig={sortConfig}
                            />
                        </div>
                    ) : <p>No data</p>}
                    <Drawer isShowStatus={isOpen} closeHandler={() => { setOpen(false); setDeleteConfirm(false); }} position="bottom" title={menuData?.name || ''}>
                        <EditPage data={menuData} saveHandler={saveHandler} />
                        <div className="flex justify-center pb-4">
                            <button
                                onClick={() => setDeleteConfirm(true)}
                                className="w-[40%] text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Delete
                            </button>
                        </div>
                        {isDeleteConfirm && (
                            <div className="mx-4 mb-4 p-4 text-center bg-red-50 rounded-lg border border-red-200">
                                <p className="mb-3 text-sm text-gray-700">Are you sure you want to delete <strong>{menuData?.name}</strong>?</p>
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() => setDeleteConfirm(false)}
                                        className="py-2 px-4 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={deleteHandler}
                                        className="py-2 px-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                                    >
                                        Yes, Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </Drawer>
                    <Drawer isShowStatus={isAddOpen} closeHandler={() => setAddOpen(false)} position="bottom" title="Add New Menu Item">
                        <AddMenuPage saveHandler={addSaveHandler} categories={getCategoryList} />
                    </Drawer>
                    {/* <ModalPopUp open={isOpen} handleModalClose={() => setOpen(!isOpen)}>
                        <EditPage data={menuData} saveHandler={saveHandler} />
                    </ModalPopUp> */}
                </div>
            }
            {activeTab === 'status' &&
                <>
                    <div className='mt-24 p-4 text-gray-600'>
                        <label className='flex flex-row gap-2 items-center justify-left'>Customer Menus Visible:
                            <input type="checkbox" name="visible" className="h-5 w-5" checked={isStatus} onChange={handleVisibilityStatus} />
                            <p className={isStatus ? 'text-gray-600' : 'text-red-600'}>{isStatus ? 'ON' : 'OFF'}</p>
                        </label>
                        -------------------------------------
                    </div>
                    <div className="mt-0 pt-4">
                        {/* <BarChartComponent value={Orders} /> */}
                        <SalesDashboard sampleOrders={Orders}/>
                    </div>

                    <ModalPopUp open={isOpen} handleModalClose={() => setOpen(!isOpen)}>
                        <div className="p-4 text-center bg-white rounded-lg sm:p-5">
                            <p className="mb-4 text-gray-500">Are you sure?</p>
                            <div className="flex justify-center items-center space-x-4">
                                <button type="button" onClick={() => setOpen(!isOpen)} className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10">
                                    No, cancel
                                </button>
                                <button type="submit" onClick={submitVisibilityStatus} className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300">
                                    Yes, I'm sure
                                </button>
                            </div>
                        </div>
                    </ModalPopUp>
                </>
            }

            {isLoader && <LoaderComponent />}

        </div>

    )
}

export default Admin