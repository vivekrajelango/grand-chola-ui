export const PAGE_LAYOUT = {
    LOGIN: 'login',
    SIGN_UP: 'signUp',
    FORGOT_PASSWORD: 'forgotPass',
    RESET_PASSWORD: 'resetPass'
}

export const DELIVERY_FEE = 25;

export const USER_ROLES = {
    ADMIN: 'admin',
    BUSINESS: 'business',
    USER:'user'
}

export const USER_STATUS = {
    ACTIVE: 'active',
    ONBOARDING: 'onboarding',
    AWAITING_APPROVAL: 'awaiting_approval',
    AWAITING_MENU:'awaiting_menu',
    REJECTED:'rejected',
    INACTIVE:'inactive'
}

export const DateFormats = {
    DATE_WITH_SLASH: 'DD/MM/YYYY',
    MONTH_LETTER_WITH_YEAR: 'MMM YYYY',
    DATE_WITH_TIME: 'DD/MM/YYYY HH:mm:ss',
    DAY: 'ddd',
    HH: 'HH:mm'
}

export const MenuColumns = [
    { label: 'Name', dataKey: 'name' },
    { label: 'Rate', dataKey: 'onlinePrice' },
    { label: 'Offer', dataKey: 'offer' },
    { label: 'Active', dataKey: 'visible' }
]

export const OrderColumns = [
    { label: 'Name', dataKey: 'name' },
    { label: 'Mobile', dataKey: 'mobile' },
    { label: 'Option', dataKey: 'option' },
    { label: 'Price', dataKey: 'price' }
]

export const MENU_CATEGORIES = ['Biriyani', 'Meals', 'Chicken', 'Fish', 'Rice', 'Gravy', 'Fry', 'Juice']

export const CHART_COLORS = [
    '#0088FE', // Blue
    '#00C49F', // Teal
    '#FF8042', // Orange
    '#AF19FF', // Purple
    '#FF6F61', // Coral
    '#6B5B95', // Lavender
    '#88B04B', // Green
    '#F7CAC9', // Soft Pink
    '#92A8D1', // Light Blue
    '#955251', // Maroon
    '#B565A7', // Mauve
    '#009B77', // Emerald
    '#DD4124', // Red
    '#D65076', // Rose
    '#45B8AC', // Turquoise
    '#EFC050', // Mustard
    '#5B5EA6', // Indigo
    '#9B2335', // Crimson
    '#DFCFBE', // Beige
];