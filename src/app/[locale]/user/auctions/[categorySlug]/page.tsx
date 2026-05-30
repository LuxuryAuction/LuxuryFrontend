import { CategoryLotsView } from "@/src/views/Auction/CategoryLots";

export default async function CategoryLotsPage(props: {
  params: Promise<{ locale: string; categorySlug: string }>;
}) {
  const params = await props.params;
  return <CategoryLotsView slug={params.categorySlug} />;
}
