"use client"; // Make this a client component

import { useState } from "react";

export default function ProductForm() {
  const [product, setProduct] = useState("");
  const [embedding, setEmbedding] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/embed", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product }),
    });

    const data = await response.json();
    setEmbedding(data.embedding);
  };

  return (
    <div className="p-5 text-gray-500">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Enter product"
          className="border p-2"
        />
        <button type="submit" className="ml-2 bg-sky-500 text-white p-2">
          Generate Embedding
        </button>
      </form>

      {embedding && (
        <pre className="mt-4 p-2 bg-gray-100">{JSON.stringify(embedding, null, 2)}</pre>
      )}
    </div>
  );
}
