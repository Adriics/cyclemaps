import dataSource from "./dataSourceConfig"

dataSource
  .initialize()
  .then(() => console.log("✅ Conectado a Supabase"))
  .catch((err) => console.error("❌ Error al conectar:", err))
