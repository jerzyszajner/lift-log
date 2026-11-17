import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../services/firebase";
import { daySchema } from "../schemas/daysSchemas";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import type { DayFormValues, Day, DayData } from "../schemas/daysSchemas";

export function toDay(snapshot: QueryDocumentSnapshot): Day {
  return { id: snapshot.id, ...daySchema.parse(snapshot.data()) };
}

export function subscribeToDays(
  uid: string,
  onData: (days: Day[]) => void,
  onError: (error: Error) => void,
) {
  return onSnapshot(
    query(collection(db, "users", uid, "days"), orderBy("weekday")),
    (snapshot) => onData(snapshot.docs.map(toDay)),
    onError,
  );
}

export function addDay(uid: string, values: DayFormValues) {
  const data: DayData = {
    name: values.name,
    weekday: values.weekday,
    exercises: values.exercises,
  };
  return addDoc(collection(db, "users", uid, "days"), data);
}

export function updateDay(uid: string, id: string, values: DayFormValues) {
  return updateDoc(doc(db, "users", uid, "days", id), {
    name: values.name,
    weekday: values.weekday,
    exercises: values.exercises,
  });
}
