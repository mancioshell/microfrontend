import { Product } from "./product"

export class Event {

    constructor(private eventClient: any) {
        this.eventClient = eventClient.EventService
    }

    addProductToCart(product: Product): void {
        this.eventClient.addProductToCart(product)
    }

    removeProductFromCart(product: Product): void {
        this.eventClient.removeProductFromCart(product)
    }

    onProductChange(onAdd : (product: Product) => void, onRemove: (product: Product) => void): void {
        this.eventClient.onProductChange(onAdd, onRemove)
    }
}