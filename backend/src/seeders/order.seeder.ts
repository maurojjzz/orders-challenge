import { EntityManager } from "@mikro-orm/core";
import { Order, OrderStatus } from "../entities/order.entity.js";

export const seedOrders = async (em: EntityManager) => {
  const existingOrders = await em.count(Order);
  
  if (existingOrders > 0) {
    console.log("⚠️  Database already has orders. Skipping seed...");
    return;
  }

  console.log("🌱 Seeding orders...");

  const orders = [
    {
      id: "19b4c65b-7cc0-4be4-9243-1d68859895fd",
      customer_name: "Cameron Mooreau",
      item: "Google lens",
      quantity: 1,
      status: OrderStatus.PENDING,
      created_at: new Date("2025-10-21T02:33:33"),
    },
    {
      id: "21295f22-988d-4d68-8ae0-14c6282b7207",
      customer_name: "Jane Smith",
      item: "Rice",
      quantity: 1,
      status: OrderStatus.COMPLETED,
      created_at: new Date("2025-10-21T02:27:59"),
    },
    {
      id: "2321cd1e-0971-435e-8fbf-02b40f61b926",
      customer_name: "Alice Smith",
      item: "Laptop",
      quantity: 1,
      status: OrderStatus.PENDING,
      created_at: new Date("2025-10-21T11:30:13"),
    },
    {
      id: "2b395d94-35fb-441e-a722-7f38f0a4d74f",
      customer_name: "Fournier Kastumore",
      item: "Rice",
      quantity: 1,
      status: OrderStatus.PENDING,
      created_at: new Date("2025-10-21T11:28:08"),
    },
    {
      id: "54d218af-dca1-4084-92ee-6604b757b6f8",
      customer_name: "Richard Hollen",
      item: "Shoes",
      quantity: 1,
      status: OrderStatus.COMPLETED,
      created_at: new Date("2025-10-21T11:29:39"),
    },
    {
      id: "6cc10825-ccfa-41cf-a8da-e898b1b17774",
      customer_name: "Samantha Hudson",
      item: "Keyboard",
      quantity: 4,
      status: OrderStatus.CANCELLED,
      created_at: new Date("2025-10-21T11:29:44"),
    },
    {
      id: "7c07d887-377f-40f9-8816-fe6cd95421b3",
      customer_name: "Fifith Kastumore",
      item: "Rice",
      quantity: 1,
      status: OrderStatus.COMPLETED,
      created_at: new Date("2025-10-21T11:28:40"),
    },
    {
      id: "804b423e-3cc4-4915-b502-a6332dce7f38",
      customer_name: "Camila Roena",
      item: "Lightbulb",
      quantity: 4,
      status: OrderStatus.PENDING,
      created_at: new Date("2025-10-21T11:29:45"),
    },
    {
      id: "9078d9d7-6136-45ab-ade5-37e3afe8fd9a",
      customer_name: "Livie Dejay",
      item: "Cd player",
      quantity: 1,
      status: OrderStatus.COMPLETED,
      created_at: new Date("2025-10-21T11:30:13"),
    },
    {
      id: "91bbeec6-1cb0-4a60-8dcc-0b1e6db91f6f",
      customer_name: "Paolo Loklaos",
      item: "Book",
      quantity: 2,
      status: OrderStatus.CANCELLED,
      created_at: new Date("2025-10-21T11:30:14"),
    },
    {
      id: "9f1d1a89-755a-4b0b-9adb-afdeac44a517",
      customer_name: "Alice Smith",
      item: "Laptop",
      quantity: 3,
      status: OrderStatus.PENDING,
      created_at: new Date("2025-10-21T11:29:46"),
    },
    {
      id: "c14ddd2e-1a31-4580-aab3-1e24b19875dc",
      customer_name: "Alice Smith",
      item: "Laptop",
      quantity: 1,
      status: OrderStatus.COMPLETED,
      created_at: new Date("2025-10-21T11:30:15"),
    },
    {
      id: "d75a06cb-ecf2-411b-9d28-582ac305f687",
      customer_name: "Mauro Jimenez",
      item: "Remote",
      quantity: 1,
      status: OrderStatus.CANCELLED,
      created_at: new Date("2025-10-22T02:43:21"),
    },
  ];

  for (const orderData of orders) {
    const order = em.create(Order, orderData);
    em.persist(order);
  }

  await em.flush();
  console.log(`✅ Successfully seeded ${orders.length} orders!`);
};
