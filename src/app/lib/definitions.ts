export type PeopleField = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
};

export type ItemField = {
  id: string;
  name: string;
  price: number;
};

export type PickupDeliveryField = {
  id: string;
  name: string;
};

export type PaymentField = {
  id: string;
  name: string;
};

export type OrderStatusField = {
  id: string;
  name: string;
};

export type Order = {
  id: string;
  buyerId: string;
  recipientId: string;
  orderDate: Date;
  deliveryDate: Date;
  totalPurchase: number;
  pickupDeliveryId: string;
  shippingCost: number;
  grandTotal: number;
  paymentId: string;
  orderStatusId: string;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
  buyer: Person;
  recipient: Person;
  payment: NamedEntity;
  pickupDelivery: NamedEntity;
  status: NamedEntity;
  items: OrderItem[];
};

export type Person = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  createdAt: Date;
  updatedAt: Date;
};

export type NamedEntity = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  quantity: number;
  orderId: string;
  itemId: string;
  item: Item;
};

export type Item = {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderTableRow = {
  id: string;
  buyerId: string;
  recipientId: string;
  orderDate: Date;
  deliveryDate: Date;
  totalPurchase: number;
  pickupDeliveryId: string;
  shippingCost: number;
  grandTotal: number;
  paymentId: string;
  orderStatusId: string;
  note: string | null;
  createdAt: Date;
  updatedAt: Date;
  buyer: {
    name: string;
  };
  recipient: {
    name: string;
  };
  pickupDelivery: {
    name: string;
  };
  payment: {
    name: string;
  };
  status: {
    name: string;
  };
  items: {
    item: {
      id: string;
      name: string;
      price: number;
      createdAt: Date;
      updatedAt: Date;
    };
    quantity: number;
  }[];
};
