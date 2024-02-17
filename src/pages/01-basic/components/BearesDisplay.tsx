import { useShallow } from "zustand/react/shallow";
import { WhiteCard } from "../../../components";
import { useBearStore } from "../../../stores";

export const BearesDisplay = () => {
  const bearers = useBearStore(useShallow((state) => state.bearers));
  const doNothing = useBearStore((state) => state.doNothing);
  const addBearer = useBearStore((state) => state.addBearer);
  const clearBearers = useBearStore((state) => state.clearBearers);

  return (
    <WhiteCard>
      <h1>Osos</h1>
      <button onClick={doNothing}>Do Nothing</button>
      <button onClick={addBearer}>Agregar Oso</button>
      <button onClick={clearBearers}>Eliminar Oso</button>
      <pre>{JSON.stringify(bearers, null, 2)}</pre>
    </WhiteCard>
  );
};
