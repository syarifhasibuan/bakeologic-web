import type { paths } from "~/schema";

export type ProductsJSON =
  paths["/products"]["get"]["responses"][200]["content"]["application/json"];
