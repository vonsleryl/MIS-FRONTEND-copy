/* eslint-disable react/prop-types */

const FilterComponent = ({ filters, setFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex space-x-4 ">
      <select
        name="campus_id"
        onChange={handleInputChange}
        className="px-4 py-2 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-strokedark dark:bg-boxdark text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Campuses</option>
        <option value="1">Campus 1</option>
        {/* Add more campuses */}
      </select>

      <select
        name="semester_id"
        onChange={handleInputChange}
        className="px-4 py-2 rounded-md bg-white text-black dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-strokedark dark:bg-boxdark text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Semesters</option>
        <option value="1">Semester 1</option>
        {/* Add more semesters */}
      </select>

      {/* Add more filters as needed */}
    </div>

  );
};

export default FilterComponent;
