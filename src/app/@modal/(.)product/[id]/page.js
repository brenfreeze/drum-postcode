import ProductModal from "@/components/product-modal";
import ProductDetails from "@/containers/product-details";
import axios from "axios";

async function fetchProductDetails(id) {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);

  return res.data;
}

export const dynamic = "force_dynamic";

export default async function ViewProductModal({ params }) {
  const productDetails = await fetchProductDetails(params.id);

  return (
    <ProductModal>
      <ProductDetails {...productDetails} />
    </ProductModal>
  );
}
