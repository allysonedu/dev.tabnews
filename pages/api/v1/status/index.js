import database from "infra/database";

async function status(request, response) {
  const result = await database.query("SELECT 1+1");
  console.log(result.rows);
  response.status(200).json({ chave: "Server is running" });
}

export default status;
