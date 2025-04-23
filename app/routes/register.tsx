import { Link } from "react-router";
import { Logo } from "~/components/custom/logo";
import { RegisterForm } from "~/components/custom/register-form";

export default function Login() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Logo />
        </Link>
        <RegisterForm />
      </div>
    </div>
  );
}
