import { CategoryLotsView } from "@/src/views/Auction/CategoryLots";

export default async function CategoryLotsPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const params = await props.params;
  return <CategoryLotsView slug={params.slug} />;
}
