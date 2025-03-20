import { Link, Form } from "react-router";
import { ShoppingCartIcon, UserRound } from "lucide-react";

import { Input } from "~/components/ui/input";
import logo from "~/assets/logo.png";

export function Header() {
  return (
    <header className="mb-2">
      <div className="flex flex-row justify-center m-2">
        <div className="flex flex-row items-center justify-between w-6xl">
          <Link to="/">
            <img src={logo} />
          </Link>
          <div className="flex flex-row justify-center items-center gap-x-8">
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="flex flex-row gap-x-4 items-center">
            <Form method="GET">
              <Input name="q" type="search" placeholder="Search" />
            </Form>
            <Link to="/cart">
              <ShoppingCartIcon />
            </Link>
            <Link to="/dashboard">
              <UserRound />
            </Link>
          </div>
        </div>
      </div>
      <hr className="w-screen" />
    </header>
  );
}
