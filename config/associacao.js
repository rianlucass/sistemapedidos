import Pedido from "../models/Pedido.js";
import PedidoItens from "../models/PedidoItens.js";

Pedido.hasMany(PedidoItens, { 
    foreignKey: "pedido_id", 
    as: "itens" 
})

PedidoItens.belongsTo(Pedido, { 
    foreignKey: "pedido_id", 
    as: "pedido" })

export { Pedido, PedidoItens }
