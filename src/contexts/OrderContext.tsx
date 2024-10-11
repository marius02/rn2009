import axios from "axios";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { ServerURL } from "../constants";
import { useAuth } from "./AuthContext";

export type OrderData = {
  id?: number
  phone: string;
  city: string;
  price: string | number;
  location: string;
  status?: string;
  assignedTo?: string;
}
export type User = {
  id: number,
  username: string,
}

interface OrderContextType {
  orders?: OrderData[];
  setOrders: React.Dispatch<React.SetStateAction<OrderData[]>>,
  normalUsers: User[];
  getNormalUsers: () => Promise<void>;
  selectedOrder?: OrderData,
  setSelectedOrder: React.Dispatch<React.SetStateAction<OrderData | undefined>>
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error(
      'useOrderContext must be used within an OrderContextProvider'
    );
  }
  return context;
};

export function OrderContextProvider({ children }: { children: ReactNode }) {
  const { userData } = useAuth()
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [normalUsers, setNormalUsers] = useState<User[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderData>();

  const getNormalUsers = useCallback(async () => {
    if (userData && userData.role === "master") {
      try {
        const result = await axios.get(ServerURL + "/getNormalUsers");
        if (result.data) {
          setNormalUsers(result.data);
        }
      } catch (e) {
        console.log(" Error in fetching normoal users:", e)
      }
    }
  }, [userData]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        normalUsers,
        getNormalUsers,
        selectedOrder,
        setSelectedOrder,
      }
      }>
      {children}
    </OrderContext.Provider>
  )
}
