import daily from "@/content/daily.json";
import { formatDate } from "@/lib/content";
import { LatestUpdates, type UpdateItem } from "@/components/LatestUpdates";

export function DailyFeed() {
  const unique = new Map(
    daily.items.map((item) => [JSON.stringify([item.date, item.tool, item.title, item.url]), item]),
  );
  const items: UpdateItem[] = [...unique.values()]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((i) => ({ ...(i as object), dateLabel: formatDate(i.date) } as UpdateItem));
  return <LatestUpdates items={items} checked={formatDate(daily.checkedOn)} />;
}
