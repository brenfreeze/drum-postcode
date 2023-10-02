import ProductDetails from "@/containers/product-details";
import axios from "axios";

async function fetchProductDetails(id) {
  const res = await axios.get(`https://dummyjson.com/products/${id}`);

  return res.data;
}

export const dynamic = "force_dynamic";

export default async function ViewProductPage({ params }) {
  const productDetails = await fetchProductDetails(params.id);

  return (
    <div className="max-w-screen-md px-4 py-12 mx-auto">
      <ProductDetails {...productDetails} />
    </div>
  );
}
