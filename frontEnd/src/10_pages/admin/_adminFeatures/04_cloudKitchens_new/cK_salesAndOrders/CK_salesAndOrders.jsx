import React from "react";
import { useCK_salesAndOrders } from "./03_cK_salesAndOrders_hooks/_cK_salesAndOrders_hooks.index.js";
import "./_styles/cK_salesAndOrders.css";

const CK_salesAndOrders = () => {
  const { states, handlers, childProps, t } = useCK_salesAndOrders();
  return (
    <div>
      <h1>CK_salesAndOrders</h1>
    </div>
  );
};

export default CK_salesAndOrders;
