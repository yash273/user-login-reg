export const emailRegx: RegExp = /^[a-zA-Z0-9_\.-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,3}$/
export const nameRegx: RegExp = /^[A-Za-z\s\-']+$/
export const passRegx: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
export const mobRegx: RegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
export const userIdRegx: RegExp = /^\d+$/
export const titleRegx: RegExp = /^[^-\s][a-zA-Z0-9_\s-]+$/
export const bodyRegx: RegExp = /^[^-\s][a-zA-Z0-9_\s-]+$/