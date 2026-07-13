import express from "express";
import cors from "cors";

import UsuarioRoutes from "./routes/UsuarioRoutes";
import ItensRoutes from "./routes/ItemRoutes";

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/usuarios", UsuarioRoutes);
app.use("/itens", ItensRoutes);

const port = 3000;

app.listen(port, () => {
    console.log("\x1b[1;32m%s\x1b[0m", `🚀 Servidor online na porta ${port}`);
})