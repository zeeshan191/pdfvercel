import Quotation from "./QuotationPdf";
import PoPdf from "./PoPdf";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/Quotation/:id" component={Quotation} />
        <Route exact path="/PoPdf/:id" component={PoPdf} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
