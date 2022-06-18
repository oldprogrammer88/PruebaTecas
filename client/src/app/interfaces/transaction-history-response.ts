export interface TransactionHistoryResponse {
    transactions: {date: Date, amount: number, typeTransaction: string} [],
    size: number,
    page: number,
    totalPages: number
}
