"use client";

import axios from "axios";
import Image from "next/image";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import Table from "@/components/table";
import { formatCurrency } from "@/lib/format-currency";
import Link from "next/link";

const columns = [
  {
    key: "thumbnail",
    name: "Thumbnail",
    cell: (row) => {
      return (
        <div className="relative aspect-[4/3] w-[150px]">
          <Image src={row.thumbnail} alt={`image-${row.name}`} fill className="object-contain" />
        </div>
      );
    },
  },
  {
    key: "title",
    name: "Name",
    cell: (row) => {
      return (
        <div className="flex flex-col">
          <Link className="font-bold" href={`/product/${row.id}`} scroll={false}>{row.title}</Link>
          <span>{row.description}</span>
        </div>
      );
    },
  },
  {
    key: "price",
    name: "Price",
    cell: (row) => {
      return formatCurrency(row.price);
    },
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true)
  const debouncedValue = useDebounce(query, 300);

  const getProducts = async (query) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://dummyjson.com/products${query ? "/search" : ""}`,
        {
          params: {
            q: query,
          },
        }
      );

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setInitialLoad(false)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedValue) {
      getProducts(debouncedValue);
    } else {
      getProducts()
    }
  }, [debouncedValue]);

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="max-w-screen-md min-h-[calc(100vh-5rem)] px-4 py-8 mx-auto">
      <input
        type="search"
        name="query"
        id="searchQuery"
        className="w-full mb-8 border-gray-300 rounded-md"
        placeholder="Search Product"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      
      <div className="w-full overflow-x-auto">
        {!isLoading && !initialLoad ? (
          !!products.length ? (
            <Table data={products} columns={columns} />
          ) : (
            <>No products matched your search keyword.</>
          )
        ) : (
          <>{initialLoad ? 'Loading...' : 'Searching...'}</>
        )}
      </div>
    </div>
  );
};

export default Home;
