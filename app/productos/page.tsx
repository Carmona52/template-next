'use client'

import { useAppStore } from "@/store/StoreProvider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Product } from "@/lib/types/products";
import { Modal, ModalContent, ModalTrigger, ModalTitle, ModalHeader, ModalDescription, ModalFooter, ModalClose } from "@/components/ui/Modal";

export default function ProductosPage() {
    const products = useAppStore((state) => state.products);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [sortType, setSortType] = useState("default");
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)


    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(products.flatMap((product) => product.categories)));
        return ["Todos", ...uniqueCategories];
    }, [products]);

    const filteredProducts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        const results = products.filter((product) => {
            const matchesCategory = selectedCategory === "Todos" || product.categories.includes(selectedCategory);

            const textToSearch = [product.name, product.description, ...(product.keywords ?? [])].join(" ").toLowerCase();

            const matchesQuery = query === "" || textToSearch.includes(query);

            return matchesCategory && matchesQuery;
        });

        if (sortType === "price-asc") {
            return [...results].sort((a, b) => a.price - b.price);
        }

        if (sortType === "price-desc") {
            return [...results].sort((a, b) => b.price - a.price);
        }

        return results;
    }, [products, searchQuery, selectedCategory, sortType]);

    if (!products.length) {
        return <h1>No hay productos disponibles</h1>;
    }

    const handleReset = () => {
        setSearchQuery("");
        setSelectedCategory("Todos");
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

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Filtrar por categoría</label>
                    <select
                        value={selectedCategory}
                        onChange={(event) => setSelectedCategory(event.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
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
                </div>

                <div className="flex items-center">
                    <Button type="button" onClick={handleReset} className="w-full rounded-md px-4 py-2 text-sm">
                        Reiniciar
                    </Button>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <p className="text-sm text-gray-600">No se encontraron productos que coincidan con tu búsqueda.</p>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {filteredProducts.map((product, index) => (
                        <Card variant="default" key={`${product.name}-${index}`} onClick={() => setSelectedProduct(product)}>
                            <CardHeader>
                                {!product.image && (
                                    <div>
                                        <h1>Sin Imagen Disponible</h1>
                                    </div>
                                )}

                                {product.image && (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={100}
                                        height={100}
                                        className="w-32 rounded-md object-cover"
                                    />
                                )}
                            </CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                            <CardDescription>{product.description}</CardDescription>
                            <CardContent>
                                <div className="mb-2 text-sm text-gray-500">Categorías: {product.categories.join(", ")}</div>
                                <div className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</div>
                            </CardContent>
                        </Card>
                        
                    ))}
                </div>

                
            )}
            <Modal open={selectedProduct !== null} onOpenChange={(open) => { if (!open) setSelectedProduct(null) }}>
                <ModalContent>
                    <ModalHeader>
                        <ModalTitle>{selectedProduct?.name}</ModalTitle>
                        <ModalDescription>{selectedProduct?.description}</ModalDescription>
                    </ModalHeader>
                    <p>${selectedProduct?.price.toFixed(2)}</p>
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