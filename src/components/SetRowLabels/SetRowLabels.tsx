import styles from "./SetRowLabels.module.css";

type SetRowLabelsProps = {
  lastLabel?: string;
};

export function SetRowLabels({ lastLabel }: SetRowLabelsProps) {
  return (
    <div className={styles.labels}>
      <span>Weight (kg)</span>
      <span>Reps</span>
      {lastLabel && <span>{lastLabel}</span>}
    </div>
  );
}
