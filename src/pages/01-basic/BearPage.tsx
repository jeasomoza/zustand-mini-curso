import { BearesDisplay } from "./components/BearesDisplay";
import { BlackBears } from "./components/BlackBears";
import { PandaBears } from "./components/PandaBears";
import { PolarBears } from "./components/PolarBears";

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <BlackBears />
        <PolarBears />
        <PandaBears />
        <BearesDisplay />
      </div>
    </>
  );
};
