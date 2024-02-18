import { JiraTasks } from "../../components";


export const JiraPage = () => {
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <JiraTasks title="Pendientes" value="OPEN" />

        <JiraTasks title="Avanzando" value="IN_PROGRESS" />

        <JiraTasks title="Terminadas" value="DONE" />
      </div>
    </>
  );
};
