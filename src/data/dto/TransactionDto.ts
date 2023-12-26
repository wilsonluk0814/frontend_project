export interface TransactionDto {
    tid:       number;
    dateTime:  string;
    status:    string;
    total:     number;
    items:     TransactionDtoItem[];
    buyer_uid: number;
}

export interface TransactionDtoItem {
    tpid:     number;
    quantity: number;
    subtotal: number;
    product:  TransactionDtoProduct;
}

export interface TransactionDtoProduct {
    pid:         number;
    name:        string;
    description: string;
    imageUrl:    string;
    price:       number;
    stock:       number;
}