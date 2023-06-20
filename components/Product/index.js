import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";
import { useState } from "react";
import ProductForm from "../ProductForm";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;
  const [isEditMode, setIsEditMode] = useState(false);
  const { data, isLoading, mutate } = useSWR(`/api/products/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  async function handleEditProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });
    console.log(productData);
    if (response.ok) {
      mutate();
    }
    event.target.reset();
  }

  async function handleDeleteProduct() {
    const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (response.ok) {
      await response.json();
      router.push("/");
    } else {
      console.log(response.status);
    }
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      <button
        type="button"
        onClick={() => {
          setIsEditMode(!isEditMode);
        }}
      >
        🪚
      </button>
      <button type="button" onClick={() => handleDeleteProduct(id)}>
        ❌
      </button>
      {isEditMode && (
        <ProductForm onSubmit={handleEditProduct} heading={"edit a fish"} />
      )}
      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
