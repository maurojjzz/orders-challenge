import express from "express";
import cors from "cors";
import { RequestContext } from "@mikro-orm/core";
import { orm, syncSchema } from "./shared/orm.js";
import { router } from "./routes/index.js";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next)=>{
    RequestContext.create(orm.em, next);
})

app.use('/api', router);

(async () => {
    await syncSchema();
    app.listen(process.env.PORT, () => {
        console.log(`
            \n-------------------------------\n
Server running on port ${process.env.PORT}
            \n-------------------------------\n`);
    });
})();