import { useState } from "react";

import { SetRow } from "../../components/SetRow/SetRow";

export function HomePage() {
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(10);

  return (
    <div>
      <div>HomePage</div>
      <SetRow
        reps={reps}
        weight={weight}
        onRepsChange={setReps}
        onWeightChange={setWeight}
      />
    </div>
  );
}
