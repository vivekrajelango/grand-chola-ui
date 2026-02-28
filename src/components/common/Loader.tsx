import React from 'react'

interface LoaderProps{
    isLoading?: boolean;
    isOrder?:boolean
}
const LoaderComponent = ({isLoading=true, isOrder=false}: LoaderProps) => {
    return (
        <div className={`w-full h-full fixed top-0 left-0 bg-white opacity-90 z-50 ${isLoading ? 'block' : 'hidden'}`}>
            <div className="flex justify-center items-center mt-[35vh]">
                <div aria-label="Loading..." role="status" className="flex flex-col items-center justify-center">
                    <svg className="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                        <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24"></line>
                        <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                        </line>
                        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24"></line>
                        <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                        </line>
                        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="24"></line>
                        <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                        </line>
                    </svg>
                    <span className="text-2xl mb-2 font-medium text-gray-500">Loading...</span>
                    {isOrder && <h3 className='text-2xl font-medium px-5 text-center text-green-800'>Connecting your WhatsApp number</h3>}
                </div>
            </div>
        </div>
    )
}

export default LoaderComponent