import React, { useState } from "react";
import { Home, Zap, Power, Lightbulb } from "lucide-react";

// QR Code component using QR Server API
const QRCode = ({ url, size = 200 }) => {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
  return (
    <div className="flex flex-col items-center">
      <img
        src={qrUrl}
        alt="QR Code"
        className="border-4 border-gray-200 rounded-lg"
        onError={(e) => {
          console.error("QR Code failed to load");
          e.target.style.display = "none";
        }}
      />
    </div>
  );
};

const BreakerFinder = () => {
  const [showQR, setShowQR] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  // Sample data structure - customize this with your actual home layout
  const homeData = {
    "Living Room": {
      outlets: {
        "North Wall Outlet": "Breaker 5",
        "South Wall Outlet": "Breaker 5",
        "TV Outlet": "Breaker 12",
      },
      lights: {
        "Ceiling Light": "Breaker 3",
        "Floor Lamp Outlet": "Breaker 5",
      },
      appliances: {
        TV: "Breaker 12",
        "Entertainment Center": "Breaker 12",
      },
    },
    Kitchen: {
      outlets: {
        "Counter Outlet 1": "Breaker 8",
        "Counter Outlet 2": "Breaker 9",
        "Island Outlet": "Breaker 10",
      },
      lights: {
        "Ceiling Lights": "Breaker 4",
        "Under Cabinet Lights": "Breaker 4",
      },
      appliances: {
        Refrigerator: "Breaker 15",
        Dishwasher: "Breaker 16",
        Microwave: "Breaker 11",
        "Garbage Disposal": "Breaker 17",
      },
    },
    "Master Bedroom": {
      outlets: {
        "Left Nightstand": "Breaker 6",
        "Right Nightstand": "Breaker 6",
        "Dresser Outlet": "Breaker 6",
      },
      lights: {
        "Ceiling Fan Light": "Breaker 2",
        "Closet Light": "Breaker 2",
      },
      appliances: {
        "Ceiling Fan": "Breaker 2",
      },
    },
    Bathroom: {
      outlets: {
        "Vanity Outlet": "Breaker 7 (GFCI)",
      },
      lights: {
        "Vanity Lights": "Breaker 1",
        "Shower Light": "Breaker 1",
      },
      appliances: {
        "Exhaust Fan": "Breaker 1",
      },
    },
    Garage: {
      outlets: {
        "Workbench Outlet": "Breaker 13",
        "Door Outlet": "Breaker 13",
      },
      lights: {
        "Overhead Lights": "Breaker 14",
      },
      appliances: {
        "Garage Door Opener": "Breaker 14",
      },
    },
  };

  const rooms = Object.keys(homeData);
  const types = selectedRoom ? Object.keys(homeData[selectedRoom]) : [];
  const items = selectedRoom && selectedType ? Object.keys(homeData[selectedRoom][selectedType]) : [];
  const breakerInfo = selectedRoom && selectedType && selectedItem ? homeData[selectedRoom][selectedType][selectedItem] : null;

  const currentUrl = window.location.href;

  const getTypeIcon = (type) => {
    switch (type) {
      case "outlets":
        return <Power className="w-4 h-4" />;
      case "lights":
        return <Lightbulb className="w-4 h-4" />;
      case "appliances":
        return <Zap className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const resetSelections = () => {
    setSelectedRoom("");
    setSelectedType("");
    setSelectedItem("");
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-4">
          <div className="flex items-center justify-center mb-6">
            <Home className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Find That Breaker</h1>
          </div>

          <button onClick={() => setShowQR(!showQR)} className="w-full mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            {showQR ? "Hide QR Code" : "Show QR Code"}
          </button>

          {showQR && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center mb-3">Scan to access this tool</p>
              <QRCode url={currentUrl} size={200} />
              <p className="text-xs text-gray-500 text-center mt-3">Save or print this QR code for quick access</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Room</label>
              <select
                value={selectedRoom}
                onChange={(e) => {
                  setSelectedRoom(e.target.value);
                  setSelectedType("");
                  setSelectedItem("");
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Choose a room...</option>
                {rooms.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>

            {selectedRoom && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Type</label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setSelectedItem("");
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Choose type...</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedType && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Item</label>
                <select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Choose item...</option>
                  {items.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {breakerInfo && (
            <div className="mt-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {getTypeIcon(selectedType)}
                  <span className="ml-2 text-sm text-gray-600">{selectedItem}</span>
                </div>
              </div>
              <div className="mt-3 p-3 bg-white rounded-md">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Breaker Location</p>
                <p className="text-2xl font-bold text-indigo-600 mt-1">{breakerInfo}</p>
              </div>
            </div>
          )}

          {(selectedRoom || selectedType || selectedItem) && (
            <button onClick={resetSelections} className="w-full mt-4 px-4 py-2 bg-green-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Reset
            </button>
          )}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          <p className="font-semibold mb-1">⚠️ Safety Reminder</p>
          <p>Always turn off the main breaker before working on electrical systems or face the consequences.</p>
        </div>
      </div>
    </div>
  );
};

export default BreakerFinder;
