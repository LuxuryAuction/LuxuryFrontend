import { CategoryLotsView } from "@/src/views/Auction/CategoryLots";

export default async function CategoryLotsPage(props: {
  params: Promise<{ locale: string; categoryId: string }>;
}) {
  const params = await props.params;
  return <CategoryLotsView categoryId={params.categoryId} />;
}
