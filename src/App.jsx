import { LoginPage } from "./features/LoginPage";
import { AdminPanel } from "./features/admin/AdminPanel";
import { LoadingPage } from "./features/LoadingPage";
import { ManagerPanel } from "./features/manager/ManagerPanel";
import { OperatorPanel } from "./features/operator/OperatorPanel";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import CreateOrder from "./components/operator/CreateOrder";
import CustomersOrder from "./components/operator/CustomersOrder";
import CurrentOrder from "./components/operator/CurrentOrder";
import OperatorPanelOrders from "./components/operator/OperatorPanelOrders";
import { StackContext } from "./StackContext";
import OperatorDashboard from "./components/operator/OperatorDashboard";
import { CurrentOrderNotFount } from "./components/operator/CurentOrderNotFound";
import { StoremanPanel } from "./features/storeman/StoremanPanel";
import ManagerOrders from "./components/manager/ManagerOrders";
import ManagerDashboard from "./components/manager/ManagerDashboard";
import ManagerCustomers from "./components/manager/ManagerCustomers";
import ManagerCurrentOrder from "./components/manager/ManagerCurrentOrder";
import StoremanDashboard from "./components/storeman/StoremanDashboard";
import StoremanCurrentOrder from "./components/storeman/StoremanCurrentOrder";
import { StoremanCurrentOrderNotFount } from "./components/storeman/StoremanCurentOrderNotFound";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <StackContext>
          <Routes>
            <Route exact path="/" element={<LoadingPage />} />
            <Route exact path="/LoginPage" element={<LoginPage />} />
            <Route exact path="/AdminPanel" element={<AdminPanel />} />
            <Route exact path="/OperatorPanel" element={<OperatorPanel />}>
              <Route
                path="/OperatorPanel/OperatorDashboard"
                element={<OperatorDashboard />}
              />
              <Route
                path="/OperatorPanel/CustomersOperatorPanel"
                element={<OperatorPanelOrders />}
              />
              <Route
                exact
                path="/OperatorPanel/CreateOrder"
                element={<CreateOrder />}
              />
              <Route
                path="/OperatorPanel/CustomersOrder"
                element={<CustomersOrder />}
              />
              <Route
                path="/OperatorPanel/CurrentOrder"
                element={<CurrentOrder />}
              />
              <Route
                path="/OperatorPanel/CurrentOrderNotFound"
                element={<CurrentOrderNotFount />}
              />
            </Route>
            <Route exact path="/ManagerPanel" element={<ManagerPanel />}>
            <Route
                path="/ManagerPanel/ManagerDashboard"
                element={<ManagerDashboard />}
              />
              <Route
                path="/ManagerPanel/Orders"
                element={<ManagerOrders />}
              />
              <Route
                exact
                path="/ManagerPanel/Customers"
                element={<ManagerCustomers />}
              />
              <Route
                exact
                path="/ManagerPanel/CurrentOrder"
                element={<ManagerCurrentOrder />}
              />
            </Route>
            <Route exact path="/StoremanPanel" element={<StoremanPanel />}>
            <Route
                exact
                path="/StoremanPanel/StoremanDashboard"
                element={<StoremanDashboard />}
              />
              <Route
                exact
                path="/StoremanPanel/StoremanCurrentOrder"
                element={<StoremanCurrentOrder />}
              />
              <Route
                exact
                path="/StoremanPanel/StoremanCurrentOrderNotFound"
                element={<StoremanCurrentOrderNotFount />}
              />
            </Route>
          </Routes>
        </StackContext>
      </BrowserRouter>
    </>
  );
}
