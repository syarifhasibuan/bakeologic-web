import { data, Link, redirect } from "react-router";
import { LoginForm } from "~/components/custom/login-form";
import { Logo } from "~/components/custom/logo";
import type { Route } from "./+types/login";
import type {
  AuthLoginRequestBody,
  AuthLoginResponseSuccessBody,
  AuthLoginResponseFailedBody,
} from "~/modules/auth/type";
import { backendApiUrl } from "~/env";
import { commitSession, getSession } from "~/sessions.server";
import type { ZodError } from "zod";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login to Bakeologic" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (session.has("token")) return redirect("/dashboard");

  return data(
    { error: session.get("error") },
    { headers: { "Set-Cookie": await commitSession(session) } }
  );
}

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const formData = await request.formData();

  const loginData: AuthLoginRequestBody = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  const response = await fetch(`${backendApiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const loginResultFailed: AuthLoginResponseFailedBody =
      await response.json();

    if ((loginResultFailed.error as ZodError)?.name === "ZodError") {
      const errorMessage = (loginResultFailed.error as ZodError).issues
        .map((issue) => issue.message)
        .join(", ");

      session.flash("error", errorMessage);
    } else {
      session.flash("error", loginResultFailed.message);
    }

    return redirect("/login", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  const loginResult: AuthLoginResponseSuccessBody = await response.json();
  // console.log(loginResult);

  session.set("token", loginResult.token);
  // console.log(session.get("token"));

  // Login succeeded, redirect to the dashboard
  return redirect("/dashboard", {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}

export default function Login({ loaderData }: Route.ComponentProps) {
  const { error } = loaderData;

  return (
    <div className="flex w-full min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <section className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Logo />
        </Link>

        {error && <p>{error}</p>}

        <LoginForm />
      </section>
    </div>
  );
}
