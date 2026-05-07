import { CategoryLotsView } from "@/src/views/Auction/CategoryLots";

export default async function CategoryLotsPage(props: PageProps<'/user/auctions/[categoryId]'>) {
  const params = await props.params;
  return <CategoryLotsView categoryId={params.categoryId} />;
}
