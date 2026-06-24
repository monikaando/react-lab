type CounterButtonProps = {
  label: string;
  onClick: () => void;
};

export default function CounterButton({ label, onClick }: CounterButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
}
