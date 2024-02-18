import MapsList from "../../components/MapsList/MapsList";
import { fetchMaps } from "@/db/queries/fetchMaps";

export default async function Maps({
  children,
}: {
  children: React.ReactNode;
}) {
  const maps = await fetchMaps();

  return <MapsList maps={maps}>{children}</MapsList>;
}
