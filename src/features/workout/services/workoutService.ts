import { collection, doc, writeBatch } from "firebase/firestore";
import { db } from "../../../services/firebase";
import type { DayExercise } from "../../days/schemas/daysSchemas";
import type { LogData } from "../schemas/workoutSchemas";

export function finishWorkout(
  uid: string,
  dayId: string,
  log: LogData,
  exercises: DayExercise[],
) {
  const batch = writeBatch(db);
  batch.set(doc(collection(db, "users", uid, "logs")), log);
  batch.update(doc(db, "users", uid, "days", dayId), { exercises });
  return batch.commit();
}
