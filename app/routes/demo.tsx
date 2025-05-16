import { Form } from "react-router";
import ButtonLoading from "~/components/ui/button-loading";
import { Input } from "~/components/ui/input";

export async function action() {
  return null;
}

export default function DemoRoute() {
  return (
    <div>
      <h1>Demo Route</h1>
      <Form method="post">
        <Input type="text" name="demo" placeholder="Demo" />
        <ButtonLoading />
      </Form>
    </div>
  );
}
