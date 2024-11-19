/* eslint-disable react/prop-types */
import React from "react";
import axios from "axios";

const DataExportButton = ({ endpoint, filename, filters }) => {
  const handleExport = async () => {
    try {
      const response = await axios.get(endpoint, {
        params: filters,
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="mt-5 rounded-sm border border-stroke bg-white px-2 py-2 shadow-default dark:border-strokedark dark:bg-boxdark text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Export Data
    </button>
  );
  
};

export default DataExportButton;
