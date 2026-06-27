import { auth } from "@/auth";
import { addSubscriber, isSubscribed, removeSubscriber } from "@/lib/db";

export const dynamic = "force-dynamic";

/** État de l'abonnement de l'utilisateur connecté. */
export async function GET() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return Response.json({ subscribed: false });
  return Response.json({ subscribed: await isSubscribed(email) });
}

/** Abonne l'utilisateur connecté au récap mensuel. */
export async function POST() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return new Response("Unauthorized", { status: 401 });
  await addSubscriber(email);
  return Response.json({ subscribed: true });
}

/** Désabonne l'utilisateur connecté. */
export async function DELETE() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return new Response("Unauthorized", { status: 401 });
  await removeSubscriber(email);
  return Response.json({ subscribed: false });
}
