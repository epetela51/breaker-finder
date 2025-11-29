import React from "react";
import { Home, Zap, Power, Lightbulb } from "lucide-react";
import { Link } from "react-router";

import homeData from "../../data/breakerData.json";
import { useBreakerSelection } from "./useBreakerSelection";

import SelectField from "../../components/SelectField/SelectField";
import UnknownAccordion from "../../components/UnknownAccordian/UnknownAccordian";

const BreakerFinder = () => {
  const { selectedFloor, selectedRoom, selectedType, selectedItem, handleFloorChange, handleRoomChange, handleTypeChange, handleItemChange, resetSelections } = useBreakerSelection();

  const KNOWN_TYPES = ["outlets", "lights", "appliances"];

  // Check if a floor has rooms or goes directly to types
  const hasRooms = (floor) => {
    if (!floor || !homeData[floor]) return false;
    const floorData = homeData[floor];
    const floorKeys = Object.keys(floorData);
    // If any direct child is a known type, there are no rooms
    return !floorKeys.some((key) => KNOWN_TYPES.includes(key));
  };

  const floors = Object.keys(homeData).filter((floor) => floor !== "Unknowns");
  const floorHasRooms = selectedFloor ? hasRooms(selectedFloor) : false;
  const rooms = selectedFloor && floorHasRooms ? Object.keys(homeData[selectedFloor]) : [];

  // Types: if no rooms, get from floor directly; otherwise from room
  const types = selectedFloor ? (floorHasRooms && selectedRoom ? Object.keys(homeData[selectedFloor][selectedRoom]) : floorHasRooms ? [] : Object.keys(homeData[selectedFloor])) : [];

  // Items: handle both cases (with and without rooms)
  const items =
    selectedFloor && selectedType
      ? floorHasRooms && selectedRoom
        ? Object.keys(homeData[selectedFloor][selectedRoom][selectedType])
        : !floorHasRooms
        ? Object.keys(homeData[selectedFloor][selectedType])
        : []
      : [];

  // Breaker info: handle both cases
  const breakerInfo =
    selectedFloor && selectedType && selectedItem
      ? floorHasRooms && selectedRoom
        ? homeData[selectedFloor][selectedRoom][selectedType][selectedItem]
        : !floorHasRooms
        ? homeData[selectedFloor][selectedType][selectedItem]
        : null
      : null;

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

  return (
    <div className="min-h-screen p-4">
      <Link to="/" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500 transition-colors">
        Go Home
      </Link>
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-4">
          <div className="flex items-center justify-center mb-6">
            <Home className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Find That Breaker</h1>
          </div>

          <div className="space-y-4">
            <SelectField label="Select Area" value={selectedFloor} onChange={handleFloorChange} options={floors} placeholder="choose an area..." />

            {selectedFloor && floorHasRooms && <SelectField label="Select Room" value={selectedRoom} onChange={handleRoomChange} options={rooms} placeholder="Choose a room..." />}

            {selectedFloor && ((floorHasRooms && selectedRoom) || !floorHasRooms) && (
              <SelectField
                label="Select Type"
                value={selectedType}
                onChange={handleTypeChange}
                options={types}
                placeholder="Choose type..."
                formatOption={(option) => option.charAt(0).toUpperCase() + option.slice(1)}
              />
            )}

            {selectedType && <SelectField label="Select Item" value={selectedItem} onChange={handleItemChange} options={items} placeholder="Choose item..." />}
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

          {(selectedFloor || selectedRoom || selectedType || selectedItem) && (
            <button onClick={resetSelections} className="w-full mt-4 px-4 py-2 bg-green-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Reset
            </button>
          )}
        </div>

        <UnknownAccordion />

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          <p className="font-semibold mb-1">⚠️ Safety Reminder</p>
          <p>Always turn off the main breaker before working on electrical systems or face the consequences.</p>
        </div>
      </div>
    </div>
  );
};

export default BreakerFinder;
