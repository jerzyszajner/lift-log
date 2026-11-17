import styles from "./SetRowLabels.module.css";

type SetRowLabelsProps = {
  lastLabel?: string;
};

export function SetRowLabels({ lastLabel }: SetRowLabelsProps) {
  return (
    <div className={styles.labels}>
      <span>Reps</span>
      <span className={styles.weightLabel}>Kg</span>
      {lastLabel && <span className={styles.lastLabel}>{lastLabel}</span>}
    </div>
  );
}
