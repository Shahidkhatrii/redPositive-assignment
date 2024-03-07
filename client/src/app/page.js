import NavBar from "./components/NavBar";
import Table from "./components/Table";
import { FetchContextProvider } from "./context/fetchContext";
export default function Home() {
  return (
    <FetchContextProvider>
      <main className="w-screen h-screen">
        <NavBar />

        <div className="w-[100vw] h-[90vh] pt-20 flex justify-center overflow-hidden">
          <Table />
        </div>
      </main>
    </FetchContextProvider>
  );
}
