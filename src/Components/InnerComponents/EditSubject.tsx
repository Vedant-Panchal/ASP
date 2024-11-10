import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface Subject {
  id: string;
  name: string;
  credits: string;
  ccaMarks: string;
  endSemMarks: string;
  totalOutOf100?: number;
  gradePoints?: number;
  creditsXGradePoints?: number;
  totalCredits?: number;
  totalCreditsXGradePoints?: number;
}

interface EditSubjectProps {
  subjects: Subject[];
  setSubjects: (subjects: Subject[]) => void;
  index: string;
}

const EditSubject: React.FC<EditSubjectProps> = ({ subjects, setSubjects, index }) => {
  const [hidden, setHidden] = useState(true);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [subjectData, setSubjectData] = useState<Subject>({
    name: "",
    credits: "",
    ccaMarks: "",
    endSemMarks: "",
    id: "",
  });

  useEffect(() => {
    setSubjectData(subject || {
      name: "",
      credits: "",
      ccaMarks: "",
      endSemMarks: "",
      id: "",
    });
  }, [subject]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateGradePoints = (marks: number): number => {
    if (marks >= 91) return 10;
    if (marks >= 81) return 9;
    if (marks >= 71) return 8;
    if (marks >= 61) return 7;
    if (marks >= 51) return 6;
    if (marks >= 46) return 5;
    return 4;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subject) return;

    const updatedSubjects = subjects.map((old) =>
      old.id === index ? subjectData : old
    );

    let totalCredits = 0;
    let totalCreditsXGradePoints = 0;

    updatedSubjects.forEach((subject) => {
      const totalMarks = Number(subject.endSemMarks) + Number(subject.ccaMarks);
      const gradePoints = calculateGradePoints(totalMarks);
      const creditsXGradePoints = Number(subject.credits) * gradePoints;

      subject.totalOutOf100 = totalMarks;
      subject.gradePoints = gradePoints;
      subject.creditsXGradePoints = creditsXGradePoints;

      totalCredits += Number(subject.credits);
      totalCreditsXGradePoints += creditsXGradePoints;
    });

    const finalSubjects = updatedSubjects.map(subject => ({
      ...subject,
      totalCredits,
      totalCreditsXGradePoints
    }));

    setSubjects(finalSubjects);
    localStorage.setItem("subjects", JSON.stringify(finalSubjects));
    setHidden(true);
  };

  const findItem = (id: string) => {
    const foundSubject = subjects.find((subject) => subject.id === id);
    if (foundSubject) {
      setSubject(foundSubject);
      setHidden(false);
    } else {
      console.error(`Subject with id ${id} not found.`);
    }
  };

  return (
    <>
      <div className="flex justify-center m-5">
        <button
          className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs md:text-sm md:px-5 md:py-2.5 px-3 py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
          onClick={() => {
            findItem(index);
          }}
        >
          Edit
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
                  Edit Subject Data
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setHidden(true)}
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
                  {[
                    { name: "name", label: "Name", type: "text", placeholder: "Subject Name" },
                    { name: "credits", label: "Credits", type: "text", placeholder: "Subject Credits" },
                    { name: "ccaMarks", label: "CCA/Mid-Sem Marks", type: "number", placeholder: "Out of 50" },
                    { name: "endSemMarks", label: "End-Sem Marks", type: "number", placeholder: "Out of 50" }
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={subjectData[field.name as keyof Subject]}
                        onChange={handleChange}
                        className="shadow-sm bg-[#F2F2F2] text-zinc-900 text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-darkNav/80 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-slate-500 dark:focus:border-slate-500 dark:shadow-sm-light dark:text-slate-200"
                        placeholder={field.placeholder}
                        required
                      />
                    </div>
                  ))}
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
                  Edit Subject
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSubject;
