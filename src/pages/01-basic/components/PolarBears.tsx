import { WhiteCard } from "../../../components";
import { useBearStore } from "../../../stores";

export const PolarBears = () => {
  const Bears = useBearStore((state) => state.polarBears);
  const increase = useBearStore((state) => state.increasePolarBears);
  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increase(-1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {Bears} </span>
        <button onClick={() => increase(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};
