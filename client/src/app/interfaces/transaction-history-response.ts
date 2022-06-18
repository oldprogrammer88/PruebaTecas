export interface TransactionHistoryResponse {
    transactions: {date: Date, amount: number, typeTransaction: string, accountNumber: number} [],
    size: number,
    page: number,
    totalPages: number
}
