import React, { ReactNode } from 'react'

interface CardProps {
    children: ReactNode
}
function Card({children}:CardProps) {
    return (
        <div className="p-2 text-black bg-red-300 border-2 border-gray-200 rounded-lg shadow-sm 2xl:col-span-2">
            {children}
        </div>
    )
}

export default Card