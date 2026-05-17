import "./App.css";
import Kanban from "./components/Kanban";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Kanban />
      </DndProvider>
      {/* */}
    </>
  );
}

export default App;
