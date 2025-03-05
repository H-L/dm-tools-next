import MapsList from "../../components/MapsList/MapsList";

// TODO: Use fetch instead of prisma directly
import { fetchMaps } from "@/db/queries/maps";

export default async function Maps({
  children,
}: {
  children: React.ReactNode;
}) {
  const maps = await fetchMaps();

  return <MapsList maps={maps}>{children}</MapsList>;
}
