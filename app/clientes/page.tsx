'use client'

import { useAppStore } from "@/store/StoreProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useMemo, useState } from "react";
import { Customer } from "@/lib/types/customer";
import { Modal, ModalContent, ModalTitle, ModalHeader, ModalDescription, ModalFooter, ModalClose } from "@/components/ui/Modal";

export default function ClientesPage() {
    const customers = useAppStore((state) => state.customers);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortType, setSortType] = useState("default");
    const [open, setOpen] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

    const filteredCustomers = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        const results = customers.filter((customer) => {
            const textToSearch = [customer.firstName, customer.lastName, customer.email, customer.address].join(" ").toLowerCase();
            return textToSearch.includes(query);
        });
        return results;
    }, [customers, searchQuery]);

    if (!customers.length) {
        return <h1>No hay clientes disponibles</h1>;
    }

    const handleReset = () => {
        setSearchQuery("");
        setSortType("default");
    };

    return (
        <>
            <div className="mb-6 grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto] md:items-end">
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Buscar producto</label>
                    <input type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Buscar por nombre, descripción o palabra clave"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                {/* <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Ordenar por precio</label>
                    <select
                        value={sortType}
                        onChange={(event) => setSortType(event.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="default">Sin ordenar</option>
                        <option value="price-asc">Menor a mayor</option>
                        <option value="price-desc">Mayor a menor</option>
                    </select>
                </div> */}

                <div className="flex items-center">
                    <Button type="button" onClick={handleReset} className="w-full rounded-md px-4 py-2 text-sm">
                        Reiniciar
                    </Button>
                </div>
            </div>

            {filteredCustomers.length === 0 ? (
                <h2>No se encontraron clientes que coincidan con tu búsqueda.</h2>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCustomers.map((customer) => (
                        <Card key={customer.id} onClick={() => setSelectedCustomer(customer)}>
                            <CardHeader>
                                <CardTitle>{customer.firstName} {customer.lastName}</CardTitle>
                                <CardDescription>{customer.email}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{customer.address?.street}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

             <Modal open={selectedCustomer !== null} onOpenChange={(open) => { if (!open) setSelectedCustomer(null) }}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>{selectedCustomer?.firstName} {selectedCustomer?.lastName}</ModalTitle>
                        <ModalDescription>{selectedCustomer?.email}</ModalDescription>
                    </ModalHeader>
                    <p>{selectedCustomer?.address?.street}</p>
                    <ModalFooter>
                        <ModalClose asChild>
                            <Button variant="destroy">Cancelar</Button>
                        </ModalClose>
                        <Button variant="primary">Confirmar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}