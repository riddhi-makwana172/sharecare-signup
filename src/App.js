import "./assets/main.scss";
import { StyledEngineProvider } from "@mui/material/styles";
import Main from "./components/Main";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Main />
    </StyledEngineProvider>
  );
}

export default App;
