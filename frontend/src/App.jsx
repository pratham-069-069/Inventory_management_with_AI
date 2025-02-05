import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [products, setProducts] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [message, setMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/products").then((res) => setProducts(res.data));
    axios.get("http://localhost:5000/alerts").then((res) => setAlerts(res.data));
  }, []);

  const handleChat = async () => {
    const response = await axios.post("http://localhost:5000/chatbot", { message });
    setChatResponse(response.data.reply);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Smart Inventory Management</h1>

      <h2 className="text-xl font-semibold">Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name} - Stock: {product.stock_quantity}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-4">Low Stock Alerts</h2>
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id}>{alert.alert_type} - {alert.threshold} units left</li>
        ))}
      </ul>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Ask the Chatbot</h2>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about inventory..."
          className="border p-2 w-full"
        />
        <button onClick={handleChat} className="bg-blue-500 text-white p-2 mt-2">Ask</button>
        <p className="mt-2">{chatResponse}</p>
      </div>
    </div>
  );
}
