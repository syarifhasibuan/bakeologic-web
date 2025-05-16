import { useNavigation } from "react-router";
import { Button } from "~/components/ui/button";

export default function ButtonLoading({
  textIdle = "Submit",
  textSubmitting = "Submitting...",
}: {
  textIdle?: string;
  textSubmitting?: string;
}) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? textSubmitting : textIdle}
    </Button>
  );
}
