import { orm } from "./shared/orm.js";
import { seedOrders } from "./seeders/order.seeder.js";

(async () => {
  try {
    console.log("\n🚀 Starting database seeding...\n");
    
    const em = orm.em.fork();
    
    await seedOrders(em);
    
    console.log("\n✨ Database seeding completed!\n");
    
    await orm.close();
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error seeding database:", error);
    await orm.close();
    process.exit(1);
  }
})();
