import type { WorkoutDay } from "../schemas/daysSchemas";

export const days: (WorkoutDay & { id: string })[] = [
  {
    id: "chest-biceps",
    name: "Chest and biceps",
    order: 1,
    exercises: [
      {
        name: "Bench press",
        sets: [
          { reps: 10, weight: 60 },
          { reps: 8, weight: 65 },
          { reps: 6, weight: 70 },
        ],
      },
      {
        name: "Biceps curl",
        sets: [
          { reps: 12, weight: 10 },
          { reps: 10, weight: 12.5 },
          { reps: 8, weight: 15 },
        ],
      },
    ],
  },
  {
    id: "back-triceps",
    name: "Back and triceps",
    order: 2,
    exercises: [
      {
        name: "Lat pulldown",
        sets: [
          { reps: 10, weight: 50 },
          { reps: 8, weight: 55 },
          { reps: 8, weight: 55 },
        ],
      },
      {
        name: "Triceps pushdown",
        sets: [
          { reps: 12, weight: 20 },
          { reps: 10, weight: 25 },
          { reps: 10, weight: 25 },
        ],
      },
    ],
  },
  {
    id: "legs",
    name: "Legs",
    order: 3,
    exercises: [
      {
        name: "Squat",
        sets: [
          { reps: 8, weight: 80 },
          { reps: 6, weight: 90 },
          { reps: 6, weight: 90 },
        ],
      },
    ],
  },
];
