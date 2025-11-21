import { useState } from 'react';

export const useBreakerSelection = () => {
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const handleFloorChange = (value) => {
    setSelectedFloor(value);
    setSelectedRoom("");
    setSelectedType("");
    setSelectedItem("");
  };

  const handleRoomChange = (value) => {
    setSelectedRoom(value);
    setSelectedType("");
    setSelectedItem("");
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
    setSelectedItem("");
  };

  const handleItemChange = (value) => {
    setSelectedItem(value);
  };

  const resetSelections = () => {
    setSelectedFloor("");
    setSelectedRoom("");
    setSelectedType("");
    setSelectedItem("");
  };

  return {
    selectedFloor,
    selectedRoom,
    selectedType,
    selectedItem,
    handleFloorChange,
    handleRoomChange,
    handleTypeChange,
    handleItemChange,
    resetSelections,
  };
};

