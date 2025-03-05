import { fetchMap } from "@/db/queries/maps";
import MainMap from "@/components/Map/MainMap";
export const dynamicParams = true;

export default async function Maps(props: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { children } = props;

  const map = await fetchMap({ id: +params.id });

  return <MainMap map={map}>{children}</MainMap>;
}
