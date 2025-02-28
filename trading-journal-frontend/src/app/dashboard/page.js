import React from "react";
import { FaChartLine, FaCog, FaPlusCircle, FaChartBar } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const accountBalance = 4950.0;
  const cashBalance = 6875.07;
  const activeBalance = 11825.07;

  const trades = [
    { date: "27/2/2568", symbol: "GOLD", qty: 3, entry: 2902.21, total: 8706.62 },
    { date: "26/2/2568", symbol: "LLY", qty: 3.5, entry: 888.84, total: 3110.93 },
    { date: "20/2/2568", symbol: "USDJPY", qty: 0.05, entry: 150.52, total: 0 },
  ];

  return (
    <div className="d-flex" style={{ height: "100vh", backgroundColor: "#1A1A1A" }}>
      {/* Sidebar Menu */}
      <aside className="bg-dark text-white p-4" style={{ width: "250px" }}>
        <h1 className="text-center mb-4">Trading Journal</h1>
        <nav className="d-flex flex-column">
          <a href="#" className="text-orange-400 mb-3 d-flex align-items-center gap-2 hover-white">
            <FaPlusCircle /> New Trade
          </a>
          <a href="#" className="text-orange-400 mb-3 d-flex align-items-center gap-2 hover-white">
            <FaChartLine /> Dashboard
          </a>
          <a href="#" className="text-orange-400 mb-3 d-flex align-items-center gap-2 hover-white">
            <FaChartBar /> Stats
          </a>
          <a href="#" className="text-orange-400 mb-3 d-flex align-items-center gap-2 hover-white">
            <FaCog /> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-5" style={{ backgroundColor: "#2D2D2D" }}>
        <div className="mb-5">
          {/* Balance Overview */}
          <div className="d-flex justify-content-between mb-4">
            <div className="bg-dark p-4 rounded text-center" style={{ width: "30%" }}>
              <h2 className="text-light">Balance</h2>
              <p className="text-success font-weight-bold">${accountBalance.toLocaleString()}</p>
            </div>
            <div className="bg-dark p-4 rounded text-center" style={{ width: "30%" }}>
              <h2 className="text-light">Cash</h2>
              <p className="text-success font-weight-bold">${cashBalance.toLocaleString()}</p>
            </div>
            <div className="bg-dark p-4 rounded text-center" style={{ width: "30%" }}>
              <h2 className="text-light">Active</h2>
              <p className="text-success font-weight-bold">${activeBalance.toLocaleString()}</p>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="bg-dark p-4 rounded">
            <h2 className="text-white mb-4">Recent Trades</h2>
            <table className="table table-dark table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Symbol</th>
                  <th>Qty</th>
                  <th>Entry</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {trades.map((trade, index) => (
                  <tr key={index}>
                    <td>{trade.date}</td>
                    <td>{trade.symbol}</td>
                    <td>{trade.qty}</td>
                    <td>${trade.entry.toLocaleString()}</td>
                    <td>${trade.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
