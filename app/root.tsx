import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { backendApiUrl } from "~/env";
import type { AuthMeResponseSuccessBody } from "~/modules/auth/type";
import type { CartJSON } from "~/modules/cart/type";
import type { CategoriesJSON } from "~/modules/category/type";
import { destroySession, getSession } from "~/sessions.server";
import type { Route } from "./+types/root";
import "@fontsource-variable/merriweather";
import "./app.css";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const token = session.get("token");

  const [categoriesResponse, authMeResponse, cartResponse] = await Promise.all([
    fetch(`${backendApiUrl}/categories`),
    fetch(`${backendApiUrl}/auth/me`, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }),
    fetch(`${backendApiUrl}/cart`, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    }),
  ]);
  // TODO: Have 1 endpoint to get everything

  // Get categories
  if (!categoriesResponse.ok) {
    return data({ categories: [], user: undefined, cart: undefined });
  }
  const categories: CategoriesJSON = await categoriesResponse.json();

  // Get user
  if (!authMeResponse.ok) {
    return data(
      { categories, user: undefined, cart: undefined },
      { headers: { "Set-Cookie": await destroySession(session) } }
    );
  }
  const user: AuthMeResponseSuccessBody = await authMeResponse.json();

  // Get cart
  if (!cartResponse.ok) {
    return data({ categories, user, cart: undefined });
  }
  const cart: CartJSON = await cartResponse.json();

  return { categories, user, cart };
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-serif">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
