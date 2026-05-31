'use client'

import { useAppStore } from "@/store/StoreProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useMemo, useState } from "react";
import { Modal, ModalContent, ModalTitle, ModalHeader, ModalDescription, ModalFooter, ModalClose } from "@/components/ui/Modal";
import { Order } from "@/lib/types/order";

const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    preparing: "bg-purple-100 text-purple-800",
    shipped: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};

function toSpanish(text: string) {
    const translations: Record<string, string> = {
        pending: "Pendiente",
        confirmed: "Confirmado",
        preparing: "En Preparación",
        shipped: "Enviado",
        delivered: "Entregado",
        cancelled: "Cancelado"
    };
    return translations[text] || text;
}

export default function PedidosPage() {
    const orders = useAppStore((state) => state.orders);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("Todos");
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const statuses = useMemo(() => {
        const uniqueStatuses = Array.from(new Set(orders.map((order) => order.status)));
        return ["Todos", ...uniqueStatuses];
    }, [orders]);

    const filteredOrders = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return orders.filter((order) => {
            const matchesStatus = selectedStatus === "Todos" || order.status === selectedStatus;
            const textToSearch = [
                order.id,
                order.orderNumber,
                order.customer?.firstName,
                order.customer?.lastName,
                order.totalAmount.toString(),
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            return matchesStatus && textToSearch.includes(query);
        });
    }, [orders, searchQuery, selectedStatus]);

    const handleReset = () => {
        setSearchQuery("");
        setSelectedStatus("Todos");
    };

    if (!orders.length) {
        return <h1>No hay pedidos disponibles</h1>;
    }

    return (
        <>
            <div className="mb-6 grid gap-4 md:grid-cols-[1.5fr_1fr_auto_auto] md:items-end">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Buscar pedido</label>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Buscar por ID, número de pedido, cliente o monto"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Filtrar por estado</label>
                    <select
                        value={selectedStatus}
                        onChange={(event) => setSelectedStatus(event.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        {statuses.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center">
                    <Button type="button" onClick={handleReset} className="w-full rounded-md px-4 py-2 text-sm">
                        Reiniciar
                    </Button>
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <p className="text-sm text-gray-600">No se encontraron pedidos que coincidan con tu búsqueda.</p>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {filteredOrders.map((order) => (
                        <Card key={order.id} className="cursor-pointer transition-shadow hover:shadow-lg" onClick={() => setSelectedOrder(order)}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle>{order.orderNumber}</CardTitle>
                                        <CardDescription>
                                            {order.customer?.firstName} {order.customer?.lastName}
                                        </CardDescription>
                                    </div>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-800"
                                            }`}
                                    >
                                        {toSpanish(order.status)}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                    <div>
                                        <p className="text-xs text-gray-600">ID</p>
                                        <p className="font-medium">{order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Monto Total</p>
                                        <p className="font-medium text-lg">${order.totalAmount.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Método de Pago</p>
                                        <p className="font-medium">{order.paymentMethod}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600">Estado Pago</p>
                                        <p className="font-medium text-sm">{order.paymentStatus}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {selectedOrder && (
                <Modal open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
                    <ModalContent className="max-w-lg">
                        <ModalHeader>
                            <ModalTitle>Detalles del Pedido</ModalTitle>
                    
                        </ModalHeader>
                        <div className="space-y-4 px-6 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Número de Pedido</p>
                                    <p className="text-base">{selectedOrder.orderNumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Estado</p>
                                    <p className="text-base">{toSpanish(selectedOrder.status)}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Fecha de Creación</p>
                                    <p className="text-base">
                                        {new Date(selectedOrder.createdAt).toLocaleDateString("es-ES", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Última Actualización</p>
                                    <p className="text-base">
                                        {new Date(selectedOrder.updatedAt).toLocaleDateString("es-ES", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-600">Cliente</p>
                                <p className="text-base">
                                    {selectedOrder.customer?.firstName} {selectedOrder.customer?.lastName}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-600 mb-2">Items</p>
                                <div className="space-y-2 bg-gray-50 p-3 rounded">
                                    {selectedOrder.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <span>
                                                {item.productName} x{item.quantity}
                                            </span>
                                            <span>${item.subtotal.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between font-medium">
                                    <span>Total:</span>
                                    <span className="text-lg">${selectedOrder.totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <ModalFooter>
                            <Button variant='primary' onClick={() => setSelectedOrder(null)} className="w-full">
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
}