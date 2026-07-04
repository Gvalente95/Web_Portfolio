type NeonButtonProps = {
  onClick: (v: boolean) => void;
  label: string;
  state: boolean;
};

import "./style.css";

export function NeonButton({ onClick, label, state }: NeonButtonProps) {
  return (
    <div className={`neon-button${state ? " active" : ""}`}>
      <button onClick={() => onClick(!state)}>{label}</button>
    </div>
  );
}
