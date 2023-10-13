export const numberFormat = value =>
new Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR"
}).format(value)