import database from "infra/database";

async function status(req, res) {
  const updateAt = new Date().toISOString();

  const result = await database.query("SHOW  server_version;");
  const version = result.rows[0].server_version;

  const MaxConnectionsResult = await database.query("SHOW max_connections;");
  const maxConnections = MaxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpened = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  }); // query com parametro fixo
  const isDatabaseOpened = databaseOpened.rows[0].count;

  res.status(200).json({
    updated_at: updateAt,
    dependencies: {
      database: {
        version_pg: version,
        max_connections: parseInt(maxConnections),
        is_opened: isDatabaseOpened,
      },
    },
  });
}

export default status;
