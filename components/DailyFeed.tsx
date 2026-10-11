import daily from "@/content/daily.json";
import { formatDate } from "@/lib/content";
import { LatestUpdates, type UpdateItem } from "@/components/LatestUpdates";

export function DailyFeed() {
  const items: UpdateItem[] = [...daily.items]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((i) => ({ ...(i as object), dateLabel: formatDate(i.date) } as UpdateItem));
  return <LatestUpdates items={items} checked={formatDate(daily.checkedOn)} />;
}
