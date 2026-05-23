const pastOrders = [
  {
    orderId: ObjectId, // ref → orders._id
    uniqueOrderId: String, // "1218210569568849920" — useful for joins back to raw data

    // Context (denormalized snapshots — won't change since orders are closed)
    brand: ObjectId, // ref → brands._id === {name: "Vkusno", logo: "https://example.com/logo.png"}
    branch: ObjectId, // ref → branches._id  ==={name: "Dubai Mall", address: "Dubai Mall, Dubai, UAE", coordinates: {lat: 25.276987, lng: 55.296233}}← ADD THIS, you'll want sales by location
    channel: ObjectId, // ref → salesChannels._id  ==={name: "Deliveroo", logo: "https://example.com/deliveroo.png"} (Deliveroo / Careem / Talabat)
    receivedAt: Date, // for time-series charts === "receivedAt": "2025-03-15T18:53:53.000Z"
    // This line item's numbers (per-item, not the whole order)
    qty: Number, // "Qty" from OrderItemsSales
    unitPrice: Number, // "Item Price"
    grossAmount: Number, // "Item Total Sales Amount" = qty × unitPrice (pre-discount)
    discount: Number, // "Item Discount"
    netAmount: Number, // grossAmount - discount, pre-VAT
    status: String, // "completed" | "cancelled" — so cancelled orders can be filtered out of revenue charts if the user might want to see cancelled orders in the revenue charts
  },
];
