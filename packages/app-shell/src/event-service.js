import { Subject } from "rxjs";

const cartSubject = new Subject();

const EventService = {
  addProductToCart: (product) => cartSubject.next({ product, action: "ADD" }),
  removeProductFromCart: (product) =>
    cartSubject.next({ product, action: "REMOVE" }),
  onProductChange: (onAdd, onRemove) => {
    const subscription = cartSubject.subscribe(({ product, action }) => {
      switch (action) {
        case "ADD":
          onAdd(product);
          break;
        case "REMOVE":
          onRemove(product);
          break;
      }
    });

    return subscription;
  },
};

export { EventService };
export default EventService;
