import { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import CallenderMoney from "./pages/CallenderMoney";
import PieChartMoney from "./pages/PieChartMoney";
import EditMoney from "./pages/EditExpenses";
import UploadMoney from "./pages/UploadMoney";
import ProtectedLayout from "./Component/ProtectedLayout";
import "./firebase/firebaseApp";
import "./App.css";
import Header from "./Component/Header";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 2000,
      refetchOnWindowFocus: false,
    },
  },
}); // 인스턴스 생성
function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header
            routingInfo={[
              {
                to: "/",
                title: "Pie Chart",
              },
              {
                to: "edit",
                title: "Edit",
              },
              {
                to: "upload",
                title: "Upload",
              },
            ]}
          />
          <Routes>
            <Route path="/" element={<ProtectedLayout />}>
              <Route index element={<PieChartMoney />}></Route>
              <Route path="/pie" element={<CallenderMoney />}></Route>
              <Route path="/edit" element={<EditMoney />}></Route>
              <Route path="/upload" element={<UploadMoney />}></Route>
            </Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
