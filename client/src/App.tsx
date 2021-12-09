import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout";
import { verifyThunk } from "./redux/auth-reducer";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="main">
      <Layout />
    </main>
  );
};

export default App;
