import React, { useState } from 'react';

const defaultForm = {
    name: '',
    categoryID: '',
    onlinePrice: '',
    dineinPrice: '',
    shortDescription: '',
    offer: '0',
    isVeg: false,
    spicy: false,
    visible: true,
    imgSrc: ''
};

function AddMenuPage({ saveHandler, categories }: any) {
    const [form, setForm] = useState({ ...defaultForm });

    const changeHandler = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const formSubmit = (e: any) => {
        e.preventDefault();
        if (!form.name || !form.categoryID || !form.onlinePrice) return;
        saveHandler(form);
        setForm({ ...defaultForm });
    };

    return (
        <div className="min-h-[350px]">
            <form onSubmit={formSubmit} className="flex flex-col gap-3 p-4 mt-4">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Name <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Masala Dosa"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        value={form.name}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Category <span className="text-red-500">*</span></label>
                    <select
                        name="categoryID"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        value={form.categoryID}
                        onChange={changeHandler}
                    >
                        <option value="">Select a category</option>
                        {categories?.map((cat: any) => (
                            <option key={cat.categoryID} value={cat.categoryID}>
                                {cat.title}
                            </option>
                        ))}
                    </select>
                </div>
                <section className="flex flex-row gap-3">
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium text-gray-900">Online Price <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="onlinePrice"
                            required
                            placeholder="e.g. 120"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            value={form.onlinePrice}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium text-gray-900">Dine-in Price</label>
                        <input
                            type="text"
                            name="dineinPrice"
                            placeholder="e.g. 100"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            value={form.dineinPrice}
                            onChange={changeHandler}
                        />
                    </div>
                </section>
                <section className="flex flex-row gap-3">
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium text-gray-900">Offer %</label>
                        <input
                            type="text"
                            name="offer"
                            placeholder="e.g. 10"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            value={form.offer}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-1 text-sm font-medium text-gray-900">Image URL</label>
                        <input
                            type="text"
                            name="imgSrc"
                            placeholder="https://..."
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                            value={form.imgSrc}
                            onChange={changeHandler}
                        />
                    </div>
                </section>
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-900">Short Description</label>
                    <input
                        type="text"
                        name="shortDescription"
                        placeholder="Brief description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        value={form.shortDescription}
                        onChange={changeHandler}
                    />
                </div>
                <div className="flex flex-row gap-6 mt-1">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" name="isVeg" className="h-4 w-4" checked={form.isVeg} onChange={changeHandler} />
                        Veg
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" name="spicy" className="h-4 w-4" checked={form.spicy} onChange={changeHandler} />
                        Spicy
                    </label>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" name="visible" className="h-4 w-4" checked={form.visible} onChange={changeHandler} />
                        Visible
                    </label>
                </div>
                <div className="flex justify-center mt-4 pb-8">
                    <button
                        type="submit"
                        className="w-[40%] text-white bg-emerald-500 hover:bg-emerald-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Add Item
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddMenuPage;
