import { daySchema } from "../schemas/daysSchemas";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import type { Day } from "../schemas/daysSchemas";

export function toDay(snapshot: QueryDocumentSnapshot): Day {
  return { id: snapshot.id, ...daySchema.parse(snapshot.data()) };
}
