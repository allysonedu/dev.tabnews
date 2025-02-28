import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config({ path: ".env.example" });

async function createClientWithRetry(retries = 0) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
    console.log("✅ Conectado ao banco de dados!");
    return client;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default {
  query: async (queryText) => {
    const client = await createClientWithRetry();
    const result = await client.query(queryText);
    await client.end();
    return result;
  },
};
