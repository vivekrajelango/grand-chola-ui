"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";
import { AppState } from "@/store/reducers";
import { useDispatch } from "react-redux";
import { addItemsCount, createNewOrder, saveCart } from "@/store/actions";
import { Bike, Hand, Pencil, ShoppingCart, Trash2 } from "lucide-react";
import { ModalPopUp } from "@/components/common/Modal";
import { routePath } from "@/constants/api";
import OrderSuccess from "@/components/Success";
import { isAfter11PM } from "@/utils/helpers";
import { DELIVERY_FEE } from "@/constants/constants";
import LoaderComponent from "@/components/common/Loader";

const Cart = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const cartDetails = useSelector((state: AppState) => state.user.cartDetails);
    const orderID = useSelector((state: AppState) => state.user.createOrder.orderID);
    const persistItemsDetails = useSelector((state: AppState) => state.user.addItemsCount);
    const [itemCounts, setItemCounts] = useState<{ [key: string]: number }>(persistItemsDetails || {});
    const [selectedItems, setSelectedItems] = useState<any>(cartDetails);
    const [isOrderId, setOrderId] = useState(orderID);
    const [isNotes, setNotes] = useState(false);
    const [textVal, setTextVal] = useState('');
    const [isLabel, setLabel] = useState('');
    const [isOptions, setOptions] = useState(isAfter11PM() ? 'Pick-Up' :'Delivery');
    const [isOpen, setOpen] = useState(false);
    const [isData, setData] = useState<any>(null);
    const [isAddress, setAddress] = useState<any>(null);
    const [error, setError] = useState<boolean>(false);
    const [isLoading, setLoading] = useState(false);
    

    const changeHandler = (e: any) => {
        setError(false);
        let { name, value } = e.target;
        setData({ ...isData, [name]: value });
    }

    const calculateTotal = () => {
        return selectedItems.length && selectedItems?.reduce((acc: any, item: any) => acc + item.price * item.count, 0).toFixed(2);
    };

    const generateWhatsAppMessage = () => {
        let message = "My Order Details:\n\n";

        // Add headers for the "table"
        message += "Item                  Qty.      Price    Amount\n";
        message += "----------------------------------------\n";

        // Loop through orders and add each to the message
        selectedItems &&
            selectedItems.forEach((item: any, index: number) => {
                // const serialNo = `${index + 1}`.padEnd(4); // Serial number column with padding
                const itemName = `${item.name}`.padEnd(30) // Item name column with padding
                const quantity = `${item.count}`.padEnd(8); // Quantity column with padding
                const price = `£${item.price}`.padEnd(8); // Price column
                const total = `£${item.price * item.count}`

                message += `${itemName}${quantity}${price}${total}\n`;
            });

        // Add total price
        message += "\n---------------------------------------\n";
        message += `Name: ${isData?.name} \n`;
        message += `Mobile: ${isData?.mobile} \n`;
        message += `Address: ${isAddress}`;
        message += "\n---------------------------------------\n";
        message += `Instruction: ${textVal}`;
        message += "\n---------------------------------------\n";
        message += `Total Price: £${calculateTotal()} (${isOptions})`;
        message += "\n----------------------------------------\n";

        // URL encode the message
        return encodeURIComponent(message);
    };

    const addItem = (item: any) => {
        setItemCounts((prevCounts) => ({
            ...prevCounts,
            [item.itemID]: (prevCounts[item.itemID] || 0) + 1
        }));

        // Update the selectedItems array
        setSelectedItems((prevItems: any) => {
            const existingItem = prevItems?.find((i: any) => i.itemID === item.itemID);
            if (existingItem) {
                return prevItems.map((i: any) =>
                    i.itemID === item.itemID ? { ...i, count: i.count + 1 } : i
                );
            }
            return [...prevItems, { itemID: item.itemID, name: item.name, price: item.onlinePrice, count: 1, offer: item.offer }];
        });
    };

    const removeItem = (item: any) => {
        setItemCounts((prevCounts) => ({
            ...prevCounts,
            [item.itemID]: prevCounts[item.itemID] > 0 ? prevCounts[item.itemID] - 1 : 0
        }));

        setSelectedItems((prevItems: any) => {
            const existingItem = prevItems.find((i: any) => i.itemID === item.itemID);
            if (existingItem && existingItem.count > 1) {
                return prevItems.map((i: any) =>
                    i.itemID === item.itemID ? { ...i, count: i.count - 1 } : i
                );
            }
            return prevItems.filter((i: any) => i.itemID !== item.itemID);
        });
    };

    const textChangeHandler = (e: any) => {
        setTextVal(e.target.value);
    }

    const confirmText = () => {
        setNotes(false);
        setLabel(textVal);
    }

    const confirmOrder= async()=>{ 
        if (isData?.name ==="" || isData?.name ===undefined || isData?.mobile ==="" || isData?.mobile ===undefined) {
            setError(true);
            return;
        }
        localStorage.setItem('details', JSON.stringify(isData));
        setOpen(false);
        setLoading(true);

        const data =  {
            "order": 
                {
                "name": isData?.name || '',
                "mobile": isData?.mobile || '',
                "address":  isData?.address || '',
                "options": isOptions,
                "orderDetails": selectedItems,
                "status": "new",
                "instructions": textVal,
                "price": calculateTotal()
            }
        }
        await dispatch(createNewOrder(routePath.CREATE_ORDER, data));
        setLoading(false);
        window.location.href = whatsappLink;
        dispatch(saveCart([]));
        dispatch(addItemsCount({}));
        router.push('/')
    }


    useEffect(() => {
        if (selectedItems) dispatch(saveCart(selectedItems));
        if (itemCounts) dispatch(addItemsCount(itemCounts));
        if (orderID) setOrderId(orderID);
    }, [selectedItems, itemCounts, orderID])

    useEffect(() => {
        const details = JSON.parse(localStorage.getItem('details') || '{}');
        setData(details);
    }, []);


    const phoneNumber = "447775731723";

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${generateWhatsAppMessage()}`;

    return (
        <div className="p-3 text-blue mx-auto md:max-w-md md:border-2 animate-fade-in">
            <div className="flex flex-row items-center justify-center text-white bg-center h-20 my-1 " >
                <img src="/logo.jpeg" alt="image" width="25%" />
            </div>
            <div className="ml-2 mr-1 mt-1" >
            
          </div>
            {/* <h1 className="text-2xl mb-3">Confirm Order:</h1> */}
            <div className="overflow-x-scroll max-h-[450px]">
                <div className="p-0 font-sans bg-white w-full border-[0.5px] border-gray-300 rounded-lg shadow-lg">
                    <section 
                        style={{
                            animation: 'slideUp 0.5s ease-out forwards',
                            animationDelay: `${0.1}s`
                          }}
                        className="flex flex-row items-center justify-between border-b-2 border-gray-300 mb-1 py-2.5 text-md font-medium text-red-700"
                    >
                        <div className="flex text-xl pl-8">Order Receipt</div>
                        <div className="flex flex-row gap-3 pe-3" >
                            <div 
                                onClick={()=>router.push('/voice')}
                                className="w-[30px] h-[30px] bg-cover"
                                style={{
                                    backgroundImage: 'url("/mic.gif")',
                                }}
                            ></div>
                            <Pencil
                                className="text-gray-700"
                                onClick={() => {
                                    router.push('/menus')
                                }}
                            />
                            <Trash2
                                className="text-gray-700"
                                onClick={() => {
                                    dispatch(saveCart([]));
                                    dispatch(addItemsCount({}));
                                    router.push('/menus')

                                }}
                            />
                        </div>

                    </section>

                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px', padding: '10px' }}>
                        <thead>
                            <tr 
                                style={{
                                    animation: 'slideUp 0.5s ease-out forwards',
                                    animationDelay: `${0.1}s`
                                  }}
                                className="font-medium"
                            >
                                <th style={{ textAlign: 'center', borderBottom: '1px solid #ccc', padding: '5px 0px' }}>Item</th>
                                <th style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>Qty</th>
                                <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc' }}>Price</th>
                                <th style={{ textAlign: 'center', borderBottom: '1px solid #ccc' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedItems.length && selectedItems.map((item: any, index: number) => (
                                <tr 
                                    key={index}
                                    style={{
                                        animation: 'slideUp 0.5s ease-out forwards',
                                        animationDelay: `${index * 0.1}s`
                                      }}
                                >
                                    <td className="pl-3 py-2.5 text-md" style={{ textAlign: 'left', borderBottom: '1px solid #e5e5e5', lineHeight: '20px' }}>
                                        {item.name}
                                        {item.offer !== '0' && <div className="text-red-400 -mt-1 text-sm">{`(${item.offer}% off)`}</div>}
                                    </td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid rgb(235, 235, 235)' }}>
                                        <div className="relative flex flex-row items-center max-w-[8rem] my-1">
                                            <button
                                                onClick={() => removeItem(item)}
                                                id="decrement-button" className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-1 h-6 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                                <svg className="w-3 h-3 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                                </svg>
                                            </button>
                                            <span className="bg-gray-100 border-x-0 border-gray-600 h-6 text-center text-gray-900 text-base focus:ring-blue-500 focus:border-blue-500 block w-8">{itemCounts[item.itemID]}</span>

                                            <button
                                                onClick={() => {
                                                    const finalPrice = item.offer !== '0'
                                                        ? item.onlinePrice - (item.onlinePrice * item.offer) / 100
                                                        : item.onlinePrice;

                                                    addItem({
                                                        ...item,
                                                        onlinePrice: finalPrice
                                                    });
                                                }}
                                                id="increment-button" className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-1 h-6 focus:ring-gray-100 focus:ring-2 focus:outline-none">
                                                <svg className="w-3 h-3 text-gray-900 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'center', borderBottom: '1px solid #e5e5e5' }}>{item?.price}</td>
                                    <td className="pr-3" style={{ textAlign: 'right', borderBottom: '1px solid #e5e5e5' }}>£{item?.price * item.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2 
                        style={{
                            animation: 'slideUp 0.5s ease-out forwards',
                            animationDelay: `${ 0.1}s`,
                            textAlign: 'right'
                          }}
                        className="text-red-700 text-xl pe-4 pb-1">Total: £{calculateTotal()}</h2>
                </div>
            </div>
            <div 
                style={{
                    animation: 'slideUp 0.5s ease-out forwards',
                    animationDelay: `${ 0.1}s`
                }}
                className="animate-pulse text-yellow-800 text-end mt-3 cursor-pointer" onClick={() => setNotes(!isNotes)}>
                {isNotes ? 'x Close' : '+ Add Instruction'}
            </div>
            {isNotes &&
                <div className="flex items-center px-1 py-2 rounded-lg bg-gray-50">
                    <textarea id="chat" value={textVal} onChange={textChangeHandler} className="block mx-2 p-1.5 w-full text-base text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Your message..."></textarea>
                    <button onClick={confirmText} className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100">
                        <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                    </button>
                </div>
            }
            {isLabel && !isNotes &&
                <p className="text-right text-gray-400">{isLabel}</p>
            }

            <div className="flex flex-col justify-center items-center w-full gap-2 mt-6">
                {selectedItems.length > 0 ?
                    <a
                        className="inline-flex h-12 w-1/2 text-1xl animate-shimmer items-center justify-center rounded-md border border-pink-500 bg-[linear-gradient(110deg,#fd1d1d,30%,#f56040,50%,#fcaf45,70%,#bc2a8d)] bg-[length:200%_100%] px-3 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-white"
                        onClick={() => setOpen(!isOpen)}

                    >
                        Place order
                        <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a> : <div className="flex flex-row gap-2 text-red-900"><ShoppingCart /> Your Cart is empty</div>}
                <button
                    onClick={() => {
                        router.push('/menus')

                    }}
                >Go back</button>
            </div>

            <ModalPopUp open={isOpen} handleModalClose={() => setOpen(!isOpen)}>
                {/* {isOrderId ? 
                <OrderSuccess isOrderId={isOrderId} closeHandler={()=>{router.push('/'), setOrderId(0)}} /> : */}
                <div className="p-4 bg-white rounded-lg sm:p-5">
                    <div className="flex flex-col gap-2 p-2 mt-5">
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-900 ">Name*</label>
                            <input type="text" name="name" id="name" placeholder="Enter your name" className="bg-gray-50  border border-gray-300 text-gray-600 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={isData?.name || ''} onChange={changeHandler} />
                        </div>
                        {error && (isData?.name ==="" || isData?.name ===undefined) && <p style={{ color: 'red' }}>Please enter your name</p>}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-900 ">Mobile Number*</label>
                            <input type="number" name="mobile" id="mobile" placeholder="Enter mobile number" className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={isData?.mobile || ''} onChange={changeHandler} />
                        </div>
                        {error && (isData?.mobile ==="" || isData?.mobile ===undefined) && <p style={{ color: 'red' }}>Please enter your Mobile number</p>}
                        {/* {isOptions === 'Delivery' && <div>
                            <label className="block mb-1 text-sm font-medium text-gray-900 ">Address</label>
                            <textarea
                                rows={4}
                                name="address"
                                value={isData?.address || ''}
                                onChange={changeHandler}
                                placeholder="Enter your address"
                                required
                                className="w-full text-base p-2.5 border bg-gray-50 text-gray-900 border-gray-300 rounded-lg"
                            />
                        </div>} */}
                    </div>
                    
                    <div className='flex flex-row items-center justify-center gap-3 mt-3 mb-8 text-sm'>
                        {/* <label className='flex flex-row gap-2 items-center justify-center'>
                            <input type="checkbox" name="delivery" className="h-5 w-5" checked={isOptions === 'Delivery'} onChange={() => setOptions('Delivery')}/>
                            <p className='text-gray-600'>Delivery</p>
                        </label> */}
                        <label className='flex flex-row gap-2 items-center justify-center'>
                            <input type="checkbox" name="pick-up" className="h-5 w-5" checked={isOptions === 'Pick-Up'} onChange={() => setOptions('Pick-Up')} />
                            <p className='text-gray-600'>Pick-up</p>
                        </label> 
                    </div>
                    
                    {/* {isOptions === 'Delivery' ?
                        <div className="flex flex-row gap-2 items-center justify-center text-gray-400 mb-2">
                            <Bike className="text-red-400" />
                            <small className="text-red-500">Delivery charges may applicable</small>
                        </div> :
                        <div className="flex flex-row gap-2 items-center justify-center text-gray-400 mb-2">
                            <Hand className="text-gray-400" />
                            <small>See you in few mins</small>
                        </div>
                    } */}
                    <div className="flex justify-center items-center space-x-4">
                        <a
                            className="inline-flex h-12 w-[75%] text-1xl animate-shimmer items-center justify-center rounded-md border border-pink-500 bg-[linear-gradient(110deg,#fd1d1d,30%,#f56040,50%,#fcaf45,70%,#bc2a8d)] bg-[length:200%_100%] px-3 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-white"
                            onClick={confirmOrder}
                        >
                            Confirm
                        </a>
                    </div>
                </div>
                {/* } */}
            </ModalPopUp>
            {isLoading && <LoaderComponent isOrder={true} />}
        </div>
    )
}

export default Cart;