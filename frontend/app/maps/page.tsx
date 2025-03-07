import MapsListPage from "../../components/MapsListPage/MapsListPage";

export default async function Maps({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MapsListPage>{children}</MapsListPage>;
}
