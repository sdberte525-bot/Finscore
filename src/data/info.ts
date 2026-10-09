/*
 * Help pages and size chart. Policy terms and measurements are placeholders:
 * confirm them against the real fulfilment setup and production samples
 * before launch.
 */

export const sizeChart = {
  unit: "in",
  note: "Garment measurements laid flat. Chest is measured armpit to armpit.",
  columns: ["Size", "Chest", "Length", "Sleeve (long sleeve)"],
  rows: [
    ["XS", "20", "26.5", "31"],
    ["S", "21.5", "27.5", "32"],
    ["M", "23", "28.5", "33"],
    ["L", "24.5", "29.5", "34"],
    ["XL", "26", "30.5", "35"],
    ["XXL", "27.5", "31.5", "36"],
  ],
} as const;

export const shippingSummary =
  "Orders ship within 3 to 5 business days with tracking. Unworn pieces with tags can be returned within 30 days.";

export const infoPages = {
  "shipping-returns": {
    title: "Shipping and returns",
    description: "How Swolvation orders ship, and how to return or exchange a piece.",
    sections: [
      {
        heading: "Shipping",
        body: [
          "Orders are packed and shipped within 3 to 5 business days. You'll get a tracking link by email as soon as your order leaves us.",
          "We currently ship to the United States and Canada. Shipping costs and any duties are shown at checkout before you pay.",
        ],
      },
      {
        heading: "Returns and exchanges",
        body: [
          "Unworn, unwashed pieces with tags attached can be returned within 30 days of delivery.",
          "To start a return or swap a size, email us with your order number and we'll send instructions.",
        ],
      },
    ],
  },
  "size-guide": {
    title: "Size guide",
    description: "Garment measurements for every Swolvation piece.",
    sections: [
      {
        heading: "How it fits",
        body: [
          "Long sleeves are relaxed with a dropped shoulder. Take your usual size, or size up for more drape.",
          "Tees are oversized and boxy, cut short in the body. Size down if you prefer a closer fit.",
        ],
      },
    ],
  },
  contact: {
    title: "Contact",
    description: "Get in touch with Swolvation about orders, sizing, or collaborations.",
    sections: [
      {
        heading: "Orders and sizing",
        body: ["Email hello@swolvation.com with your order number. We reply within two working days."],
      },
      {
        heading: "Community and collaborations",
        body: [
          "Photos and features: community@swolvation.com.",
          "Gyms, coaches and makers: collabs@swolvation.com.",
        ],
      },
    ],
  },
} as const;

export type InfoTopic = keyof typeof infoPages;
