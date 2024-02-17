import { WhiteCard } from "../../../components";
import { useBearStore } from "../../../stores";

export const PandaBears = () => {
  const Bears = useBearStore((state) => state.pandaBears);
  const increase = useBearStore((state) => state.increasePandaBears);
  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className="flex flex-col md:flex-row">
        <button onClick={() => increase(-1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10"> {Bears} </span>
        <button onClick={() => increase(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};
