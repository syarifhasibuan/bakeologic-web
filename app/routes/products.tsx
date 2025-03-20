import { Link } from "react-router";
import type { Route } from "./+types/products";
import { backendApiUrl } from "~/env";
import type { ProductsJSON } from "~/modules/product/type";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products from Bakeologic" },
    { name: "description", content: "See all products." },
  ];
}

export async function loader() {
  const response = await fetch(`${backendApiUrl}/products`);
  const products: ProductsJSON = await response.json();
  return { products };
}

export default function Products({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData;

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => {
          // TODO: Refactor to separate function
          const productImageObject = product.images[0];

          const imageUrl = productImageObject?.url
            ? productImageObject.url
            : "https://placehold.co/300x200";

          const altText = productImageObject?.altText
            ? productImageObject.altText
            : product.name;

          return (
            <li key={product.id}>
              <Link to={`/products/${product.slug}`}>
                <div>
                  {/* TODO: <ProductImage product={product} /> */}
                  <img src={imageUrl} alt={altText} />
                  <h2>{product.name}</h2>
                  <p>{product.price}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
