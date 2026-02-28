import React from 'react'

function BusyPage() {
    return (
        <main className="bg-white">
            <div className="flex flex-col justify-center1 items-center px-6 mx-auto h-screen xl:px-0">
           
                <div className="block md:max-w-md mt-14">
                    <img src="bg.jpg" alt="maintenance image" />
                </div>
                <div className="text-center xl:max-w-4xl mb-11">
                    <h1 className="mb-1 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">Our Kitchen is busy now !!</h1>
                    <p className="mb-12 text-base font-normal text-gray-500 md:text-lg">We will be serve you shortly</p>
                </div>
                <div className="flex flex-row w-full items-center justify-center text-white bg-center h-20  " >
                    <img className="md:w-[10%]" src="logo.jpeg" alt="image" width="50%" />
                </div>
            </div>
        </main>
    )
}

export default BusyPage