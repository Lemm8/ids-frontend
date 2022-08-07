import { axiosPrivate } from "./api";

export const getPedidosCliente = async ( usuario, controllerSignal ) => {
    try {
        const response = await axiosPrivate.get(`/pedidos?cliente=${usuario}`, {
            signal: controllerSignal
        });
        return {
            success: true,
            res: response
        }
    } catch (error) {
        return {
            success: false,
            res: error.response
        };
    }
}