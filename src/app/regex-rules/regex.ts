export const emailRegx: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const nameRegx: RegExp = /^[A-Za-z\s\-']+$/
export const passRegx: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
export const mobRegx: RegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/