import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";

// There's root loader to get all the user-relevant data
export default [
  layout("layouts/app.tsx", [
    index("routes/home.tsx"),
    route("products", "routes/products.tsx"),
    route("products/:slug", "routes/products-slug.tsx"),
    route("about", "routes/about.tsx"),
    route("faq", "routes/faq.tsx"),
    route("contact", "routes/contact.tsx"),
    route("shops", "routes/shops.tsx"),

    route("dashboard", "routes/dashboard.tsx"),
    route("cart", "routes/cart.tsx"),

    route("demo", "routes/demo.tsx"),
  ]),

  route("register", "routes/register.tsx"),
  route("login", "routes/login.tsx"),
  route("logout", "routes/logout.tsx"),
] satisfies RouteConfig;
