import { useState } from "react";
import { Power, Lightbulb, Zap, AlertCircle, ChevronUp, ChevronDown } from "lucide-react";

import homeData from "../../data/breakerData.json";

const UnknownAccordion = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    outlets: false,
    lights: false,
    appliances: false,
  });

  const unknowns = homeData.Unknowns;

  const getTotalCount = () => {
    return Object.values(unknowns).reduce((total, category) => {
      return total + Object.keys(category).length;
    }, 0);
  };

  const getCategoryIcon = (type) => {
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

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const totalCount = getTotalCount();

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden">
      {/* Header - Always visible */}
      <button onClick={() => setIsExpanded(!isExpanded)} className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 rounded-full p-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-gray-800">Unknown Breakers</h3>
            <p className="text-sm text-gray-500">
              {totalCount} {totalCount === 1 ? "item" : "items"} need to be mapped
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{totalCount}</span>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          <div className="px-6 py-4 bg-orange-50">
            <p className="text-sm text-orange-800">These items haven't been assigned to a breaker yet. Once you find where they go, update the list</p>
          </div>

          <div className="divide-y divide-gray-200">
            {Object.entries(unknowns).map(([categoryType, items]) => (
              <div key={categoryType}>
                {/* Category Header */}
                <button onClick={() => toggleCategory(categoryType)} className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="text-indigo-600">{getCategoryIcon(categoryType)}</div>
                    <span className="font-medium text-gray-700 capitalize">{categoryType}</span>
                    <span className="text-xs text-gray-500">({Object.keys(items).length})</span>
                  </div>
                  {expandedCategories[categoryType] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                {/* Category Items */}
                {expandedCategories[categoryType] && (
                  <div className="bg-gray-50 px-6 py-3">
                    <ul className="space-y-2">
                      {Object.entries(items).map(([itemName], index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700 bg-white px-3 py-2 rounded border border-gray-200">
                          <span className="flex-1 text-left">{itemName}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnknownAccordion;
