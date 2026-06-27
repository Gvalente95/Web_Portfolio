import "./style.css";

type SwitchButtonProps = {
  state: boolean;
  onSwitch: React.Dispatch<React.SetStateAction<boolean>>;
  on_url?: string;
  off_url?: string;
};
export const SwitchButton = ({ state, onSwitch, on_url = "", off_url = "" }: SwitchButtonProps) => {
  return (
    <div className="switch-button" onClick={() => onSwitch(!state)}>
      <div className="background"></div>
      <div className={`switch-icon ${state ? "on" : ""}`}>{on_url?.length && off_url?.length ? <img className="switch-image" src={state ? off_url : on_url}></img> : null}</div>
    </div>
  );
};
