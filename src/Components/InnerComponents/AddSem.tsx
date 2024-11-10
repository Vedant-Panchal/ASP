import React, { useState } from "react";

interface AddSemProps {
  handleSemData: (data: { sem: string; sgpa: string; id: string }) => void;
}

const AddSem: React.FC<AddSemProps> = ({ handleSemData }) => {
  const [hidden, setHidden] = useState(true);
  const [semData, setSemData] = useState({
    sem: "SEM-1",
    sgpa: "",
    id: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHidden(true);
    handleSemData(semData);
    setSemData({
      sem: "SEM-1",
      sgpa: "",
      id: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSemData((prev) => ({
      ...prev,
      [name]: value,
      id: Date.now().toString(),
    }));
  };

  return (
    <>
      <div className="flex justify-center m-5">
        <button
          className="block text-[10px] text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg md:text-sm md:w-36 px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
          onClick={() => setHidden(!hidden)}
        >
          Add Semester
        </button>
      </div>
      <div
        tabIndex={-1}
        hidden={hidden}
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full md:h-full backdrop-blur-sm"
      >
        <div className="flex flex-row items-center justify-center">
          <div className="relative flex items-center justify-center p-4 w-full max-w-2xl h-full">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-darkElevate sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add Semester
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setHidden(!hidden)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Semester
                    </label>
                    <select
                      name="sem"
                      value={semData.sem}
                      onChange={handleChange}
                      className="shadow-sm bg-[#F2F2F2] text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200"
                    >
                      {Array.from({ length: 8 }, (_, i) => (
                        <option key={i} value={`SEM-${i + 1}`}>
                          {`SEM-${i + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      SGPA
                    </label>
                    <input
                      type="number"
                      name="sgpa"
                      value={semData.sgpa}
                      onChange={handleChange}
                      className="shadow-sm bg-[#F2F2F2] text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200"
                      placeholder="1-10"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <svg
                    className="mr-1 -ml-1 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add New Semester
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSem;
