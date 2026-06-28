import "./style.css";

type SwitchButtonProps = {
  state: boolean;
  onSwitch: React.Dispatch<React.SetStateAction<boolean>>;
  on_url?: string;
  off_url?: string;
};
export const SwitchButton = ({ state, onSwitch, on_url = "", off_url = "" }: SwitchButtonProps) => {
  const showUrl = state ? on_url : off_url;
  return (
    <div className="switch-button" onClick={() => onSwitch(!state)}>
      <div className="background"></div>
      <div className={`switch-icon ${state ? "on" : ""}`}>{showUrl.length && <img className="off-icon" src={showUrl} alt="switch button image" />}</div>
    </div>
  );
};
