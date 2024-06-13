import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { UserContext } from "../../context/AuthContext";
import { useContext } from "react";
import {
  PowerOff,
  PanelsTopLeft,
  Moon,
  Sun,
  ChevronDown,
  GraduationCap,
} from "lucide-react";
import AddSubject from "../InnerComponents/AddSubject";
import EditSubject from "../InnerComponents/EditSubject";
import AddSem from "../InnerComponents/AddSem";
import EditSem from "../InnerComponents/EditSem";

function Calculator() {
  const [error, seterror] = useState("");
  const [profileHidden, setProfileHidden] = useState(true);
  const navigate = useNavigate();
  const [asidehidden, setasidehidden] = useState(true);
  const { currentUser, logoutUser, mode, setmode } = useContext(UserContext);
  const [cgpa, setcgpa] = useState(0);
  const userName = currentUser.displayName;
  const userEmail = currentUser.email;
  const [profilePicture, setProfilePicture] = useState(null);
  const [sgpaaccordian, setSgpaaccordian] = useState(false);
  const [cgpaaccordian, setcgpaaccordian] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    name: "",
    ccaMarks: "",
    endSemMarks: "",
    credits: "",
  });
  const [semsData, setSemsData] = useState([]);

  useEffect(() => {
    // Load subjects from localStorage on component mount
    const storedSubjects = localStorage.getItem("subjects");
    console.log("Stored Subjects:", storedSubjects);
    if (storedSubjects !== null) {
      setSubjects(JSON.parse(storedSubjects));
    }
  }, []);

  useEffect(() => {
    // Save subjects to localStorage whenever subjects are updated
    if (subjects.length === 0) {
      localStorage.removeItem("subjects");
    } else {
      localStorage.setItem("subjects", JSON.stringify(subjects));
      console.log("Subjects Saved to localStorage:", subjects);
    }
  }, [subjects]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (currentUser) {
          const url = `https://api.dicebear.com/7.x/initials/svg?seed=${userName}`;
          setProfilePicture(url);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [userEmail]);
  useEffect(() => {
    const storedSemsData = localStorage.getItem("semsData");
    console.log("Stored SemsData:", storedSemsData);
    if (storedSemsData !== null) {
      setSemsData(JSON.parse(storedSemsData));
    }
  }, []);

  useEffect(() => {
    if (semsData.length === 0) {
      localStorage.removeItem("semsData");
    } else {
      let totalSgpa = 0;
      let i = 0;

      semsData.forEach((sem) => {
        totalSgpa += Number(sem.sgpa);
        i++;
      });
      setcgpa(parseFloat(totalSgpa / i).toFixed(2));
      localStorage.setItem("semsData", JSON.stringify(semsData));
      console.log("SemsData Saved to localStorage:", semsData);
    }
  }, [semsData]);
  const handleSignOut = async () => {
    seterror("");

    const bgColor = mode === "dark" ? "#15131D" : "#F2F2F1";
    const txtColor = mode === "dark" ? "#F1F5F9" : "#18181B";
    Swal.fire({
      title: "Are you sure?",
      imageUrl: "assets/svgviewer-png-output.png  ",
      text: "You will be logged out of this application",
      showDenyButton: true,
      confirmButtonText: "Yes, logout",
      denyButtonText: `Cancel`,
      customClass: {
        confirmButton:
          "px-3 py-2.5 border border-emerald-400 mr-2 rounded-lg text-md bg-green-500/70 hover:bg-green-500/80 focus:bg-green-500/80",
        denyButton:
          "px-3 py-2.5 border border-rose-300 rounded-lg text-md bg-rose-500/70 hover:bg-rose-500/80 focus:bg-rose-500/80",
      },
      buttonsStyling: false,
      background: bgColor,
      color: txtColor,
      backdrop: `
            rgba(46, 43, 59, 0.8) 
            left top
            no-repeat
            `,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        logoutUser();
        navigate("/signin");
      } else if (result.isDenied) {
        return;
      }
    });
  };
  useEffect(() => {
    return mode === "dark"
      ? document.getElementById("root").classList.add("dark")
      : document.getElementById("root").classList.remove("dark");
  }, [mode]);
  const toggleMode = () => {
    setmode(mode === "light" ? "dark" : "light");
  };
  const handleSemData = (semData) => {
    const updatedSemsData = [...semsData, semData];
    setSemsData(updatedSemsData);
  };
  // Calculate cumulative values
  let updatedTotalCredits = 0;
  let updatedTotalCreditsXGradePoints = 0;
  const handleAddSubject = (subjectData) => {
    const updatedSubjects = [...subjects, subjectData];

    updatedSubjects.forEach((subject) => {
      subject.totalOutOf100 =
        Number(subject.endSemMarks) + Number(subject.ccaMarks);
      subject.gradePoints = gradePoints(subject.totalOutOf100);
      subject.creditsXGradePoints = subject.credits * subject.gradePoints;

      updatedTotalCredits += Number(subject.credits);
      updatedTotalCreditsXGradePoints += subject.creditsXGradePoints;
    });

    // Update the cumulative values in each subject
    updatedSubjects.forEach((subject) => {
      subject.totalCredits = updatedTotalCredits;
      subject.totalCreditsXGradePoints = updatedTotalCreditsXGradePoints;
    });

    setSubjects(updatedSubjects);

    // Reset newSubject state
    setNewSubject({
      name: "",
      ccaMarks: "",
      endSemMarks: "",
      credits: "",
    });
  };

  // Function to delete a subject
  const handleDeleteSubject = (index) => {
    console.log("Deleting subject at index:", index);

    const updatedSubjects = subjects.filter((subject) => subject.id !== index);

    console.log("Updated Subjects after delete:", updatedSubjects);

    let updatedTotalCredits = 0;
    let updatedTotalCreditsXGradePoints = 0;

    updatedSubjects.forEach((subject) => {
      subject.totalOutOf100 =
        Number(subject.endSemMarks) + Number(subject.ccaMarks);
      subject.gradePoints = gradePoints(subject.totalOutOf100);
      subject.creditsXGradePoints = subject.credits * subject.gradePoints;

      updatedTotalCredits += Number(subject.credits);
      updatedTotalCreditsXGradePoints += subject.creditsXGradePoints;
    });

    // Update the cumulative values in each subject
    updatedSubjects.forEach((subject) => {
      subject.totalCredits = updatedTotalCredits;
      subject.totalCreditsXGradePoints = updatedTotalCreditsXGradePoints;
    });

    console.log("Updated Subjects with recalculated values:", updatedSubjects);

    setSubjects(updatedSubjects);

    // Save updated subjects to localStorage
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
  };

  const handleDeleteSem = (index) => {
    const updatedSem = semsData.filter((sem) => sem.id !== index);
    setSemsData(updatedSem);
    let totalSgpa = 0;
    let i = 0;

    semsData.forEach((sem) => {
      totalSgpa += Number(sem.sgpa);
      i++;
    });
    setcgpa(parseFloat(totalSgpa / i).toFixed(2));
    localStorage.setItem("semsData", JSON.stringify(semsData));
  };
  const gradePoints = (marks) => {
    let grade = "";
    if (marks >= 91 && marks <= 100) {
      grade = 10;
    } else if (marks >= 81 && marks <= 90) {
      grade = 9;
    } else if (marks >= 71 && marks <= 80) {
      grade = 8;
    } else if (marks >= 61 && marks <= 70) {
      grade = 7;
    } else if (marks >= 51 && marks <= 60) {
      grade = 6;
    } else if (marks >= 46 && marks <= 50) {
      // Add more conditions if needed
      grade = 5 /* Corresponding grade */;
    } else {
      // Handle other cases if needed
      grade = 4;
    }
    return grade;
  };
  return (
    <>
      <div className="antialiased h-max  bg-Light20 dark:bg-dark">
        <nav className="bg-slate-100 px-4  dark:bg-darkNav dark:shadow-sm fixed left-0 right-0 top-0 z-50 shadow-lg rounded-sm">
          <div className="flex flex-wrap justify-between items-center relative">
            <div className="flex justify-start items-center">
              <button
                className="p-2 mr-2 text-slate-600 rounded-lg cursor-pointer  hover:text-gray-900 hover:bg-slate-200/80 focus:bg-slate-200/80 dark:focus:bg-darkElevateHover  dark:focus:ring-gray-700 dark:text-slate-200 dark:hover:bg-darkElevate dark:hover:text-slate-300 transition-all duration-200 ease-in"
                onClick={() => {
                  setasidehidden(!asidehidden);
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  aria-hidden="true"
                  className="hidden w-6 h-6"
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
              </button>
              <Link
                to="/dashboard"
                className="flex items-center justify-between mr-4"
              >
                <img
                  src="/assets/Logo.png"
                  className="mr-3 h-16 ml-3"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="flex flex-row items-center justify-start w-fit lg:order-2">
              <button
                className={`${
                  mode === "light" ? "bg-yellow-300" : "bg-darkElevate"
                } w-fit h-fit p-2 rounded-full transition-all duration-500 ease-in mr-2`}
                onClick={toggleMode}
              >
                <span className="transition-all duration-200 ease-in">
                  {mode === "dark" ? (
                    <Moon size={22} className=" opacity-100 text-slate-100" />
                  ) : (
                    <Sun size={22} className="text-yellow-800 opacity-100" />
                  )}
                </span>
              </button>
              <button
                type="button"
                className="flex mr-2 text-sm z-50 dark:bg-darkElevate rounded-full md:mr-2"
                id="user-menu-button"
                onClick={() => setProfileHidden(!profileHidden)}
              >
                <img
                  className="w-8 h-8 m-2 rounded-full"
                  src={profilePicture}
                  alt="user photo"
                />
              </button>
              {/* Dropdown menu */}
              <div
                className="absolute top-0 right-0 z-20 my-2 w-56 text-base list-none bg-white outline-dashed outline-2 lg:outline-2 dark:outline-light shadow dark:bg-dark dark:divide-gray-600 rounded-xl"
                id="dropdown"
                hidden={profileHidden}
              >
                <div className="py-3 px-4">
                  <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                    {userName}
                  </span>
                  <span className="block  text-gray-900 truncate dark:text-white mt-5 mb-5">
                    {userEmail}
                  </span>
                  <Link
                    className="block dark:border-light border-zinc-900 border-t-2 pt-3 text-gray-900 truncate dark:text-white"
                    onClick={handleSignOut}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ease-in-out duration-200 bg-white border-r shadow-xl border-gray-200  dark:bg-darkNav dark:border-gray-700 ${
            asidehidden ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-transparent">
            <ul className="space-y-2">
              <li>
                <Link
                  className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition-all duration-200 ease-in group hover:bg-gray-100 dark:text-white dark:hover:bg-darkElevate "
                  to={"/dashboard"}
                >
                  <PanelsTopLeft />
                  <span className="ml-3 dark:text-white font-medium">
                    Overview
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition-all duration-200 ease-in group hover:bg-gray-100 dark:text-white dark:hover:bg-darkElevate "
                  to={"/dashboard/calculator"}
                >
                  <GraduationCap />
                  <span className="ml-3 dark:text-white font-medium">
                    Calculators
                  </span>
                </Link>
              </li>
            </ul>
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
              {/* Power off button */}
              <li>
                <Link
                  className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition-all duration-200 ease-in hover:bg-gray-100 dark:hover:bg-darkElevate dark:text-white group "
                  onClick={handleSignOut}
                >
                  <PowerOff />
                  <span className="ml-3">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
        <main className="w-screen h-max p-5 pt-20">
          <div className="flex flex-col items-center justify-center w-full gap-4 mb-4 h-full">
            <div className="dark:bg-darkNav bg-Light20 rounded-lg shadow-lg w-full lg:w-8/12 h-max md:h-max">
              <div className="flex-col justify-center items-start h-full p-3 w-full">
                <div className="flex flex-wrap flex-row items-center justify-between ">
                  <div className="flex-grow md:mr-2">
                    <h1 className="md:text-xl font-semibold text-gray-900 dark:text-white">
                      SGPA Calculator
                    </h1>
                  </div>
                  <div hidden={!sgpaaccordian}>
                    <AddSubject
                      handleAddSubject={handleAddSubject}
                      setNewSubject={setNewSubject}
                      newSubject={newSubject}
                      subjects={subjects}
                      setSubjects={setSubjects}
                    />
                  </div>
                  <div className="flex">
                    <div className="flex-grow"></div>
                    <button
                      className={`font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center transition-all ease-in duration-200 mr-2 mb-2 ${
                        sgpaaccordian ? "hidden" : "rotate-0"
                      }`}
                      type="button"
                      onClick={() => setSgpaaccordian(!sgpaaccordian)}
                    >
                      <ChevronDown className="dark:text-white text-zinc-900" />
                    </button>
                  </div>
                </div>
                {subjects.length > 0 && sgpaaccordian ? (
                  <div className="flex outline-dashed outline-2 outline-slate-400 flex-row items-center justify-between rounded-lg overflow-x-scroll w-full mt-2 ">
                    <table className=" w-full text-sm text-left text-zinc-900 dark:text-slate-200 ">
                      <thead className="text-sm text-zinc-900 uppercase bg-gray-300 dark:bg-darkElevate dark:text-slate-200 font-mono">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3 sticky left-0 z-10 bg-gray-300 dark:bg-darkElevate dark:text-slate-200 "
                          >
                            Subject name
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            CCA/MID-SEM <br /> (OUT OF 50)
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            END-SEM <br /> (OUT OF 50)
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            TOTAL <br />
                            (OUT OF 100)
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            CREDITS
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            GRADE POINTS
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            CREDITS X GRADE POINTS
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-darkElevate dark:text-gray-400">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3 sticky left-0 z-10 dark:bg-darkElevate bg-gray-300 dark:text-slate-200"
                          >
                            A
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            B
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            C
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            D = B + C
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            E
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            F
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            G = E X F
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjects.map((subject) => (
                          <tr
                            key={subject.id}
                            className="dark:border-gray-700 dark:bg-darkElevate odd:dark:bg-darkElevate/50 even:bg-gray-300/40"
                          >
                            <td className="px-4 text-zinc-900 sticky left-0 z-10 dark:text-slate-200 font-extrabold bg-gray-300 dark:bg-darkElevate ">
                              {subject.name}
                            </td>
                            <td className="px-4 text-zinc-900 dark:text-slate-200">
                              {subject.ccaMarks}
                            </td>
                            <td className="px-4 text-zinc-900 dark:text-slate-200">
                              {subject.endSemMarks}
                            </td>
                            <td className="px-4 text-zinc-900 dark:text-slate-200">
                              {subject.totalOutOf100}
                            </td>
                            <td className="px-4 text-zinc-900 dark:text-slate-200">
                              {subject.credits}
                            </td>
                            <td className="px-4 text-zinc-900 dark:text-slate-200">
                              {subject.gradePoints}
                            </td>
                            <td className="px-4 text-zinc-900 dark:text-slate-200">
                              {subject.creditsXGradePoints}
                            </td>
                            <td className="px-4 flex items-center justify-center">
                              <EditSubject
                                index={subject.id}
                                subjects={subjects}
                                setSubjects={setSubjects}
                              />
                              <button
                                onClick={() => handleDeleteSubject(subject.id)}
                                className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs md:text-sm md:px-5 md:py-2.5 px-3 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                        <tr className="dark:bg-dark/50 bg-gray-300">
                          <td className="px-4 py-3 sticky left-0 z-10">
                            Total Credits
                          </td>
                          <td colSpan="2"></td> {/* Span the other columns */}
                          <td className="px-4 py-3">
                            {subjects.length > 0 ? subjects[0].totalCredits : 0}
                          </td>
                          <td colSpan="3"></td>
                          <th scope="col" className="px-4 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                        <tr className="dark:bg-dark/50 bg-gray-300">
                          <td className="px-4 py-3 sticky left-0 z-10 ">
                            Total <br /> Credits X Grade Points
                          </td>
                          <td colSpan="2"></td> {/* Span the other columns */}
                          <td className="px-4 py-3">
                            {subjects.length > 0
                              ? subjects[0].totalCreditsXGradePoints
                              : 0}
                          </td>
                          <td colSpan="3"></td>
                          <th scope="col" className="px-4 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                        <tr className="border-b dark:border-gray-700 bg-green-600 text-white">
                          <td className="px-4 py-3 font-extrabold sticky left-0 z-10 dark:bg-green-600">
                            SGPA
                          </td>
                          <td colSpan="2"></td> {/* Span the other columns */}
                          <td className="px-4 py-3">
                            {subjects.length > 0
                              ? parseFloat(
                                  subjects[0].totalCreditsXGradePoints /
                                    subjects[0].totalCredits,
                                ).toFixed(2)
                              : 0}
                          </td>
                          <td colSpan="3"></td>
                          <th scope="col" className="px-4 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex">
                <div className="flex-grow"></div>
                <button
                  className={`font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center mr-5 mb-2 ${
                    sgpaaccordian ? "rotate-180" : "hidden"
                  }`}
                  type="button"
                  onClick={() => setSgpaaccordian(!sgpaaccordian)}
                >
                  <ChevronDown className="text-zinc-900 dark:text-white" />
                </button>
              </div>
            </div>
            <div className="dark:bg-darkNav bg-Light20 rounded-lg shadow-lg w-full lg:w-8/12 h-max md:h-max">
              <div className="flex-col justify-center items-start h-full p-3 w-full">
                <div className="flex flex-wrap flex-row items-center justify-between ">
                  <div className="flex-grow md:mr-2">
                    <h1 className="md:text-xl font-semibold text-gray-900 dark:text-white">
                      CGPA Calculator
                    </h1>
                  </div>
                  <div hidden={!cgpaaccordian}>
                    <AddSem handleSemData={handleSemData} />
                  </div>
                  <div className="flex">
                    <div className="flex-grow"></div>
                    <button
                      className={`text-white font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center transition-all ease-in duration-200 mr-2 mb-2 ${
                        cgpaaccordian ? "hidden" : "rotate-0"
                      }`}
                      type="button"
                      onClick={() => setcgpaaccordian(!cgpaaccordian)}
                    >
                      <ChevronDown className="text-zinc-900 dark:text-white" />
                    </button>
                  </div>
                </div>
                {semsData.length > 0 && cgpaaccordian ? (
                  <div className="flex outline-dashed outline-2 outline-slate-400 flex-row items-center justify-between rounded-lg overflow-x-scroll w-full mt-2 ">
                    <table className=" w-full text-sm text-left text-zinc-900 dark:text-slate-200 ">
                      <thead className="text-sm  uppercase bg-gray-300 dark:bg-darkElevate  font-mono">
                        <tr>
                          <th
                            scope="col"
                            colSpan="4"
                            className="px-4 py-3 sticky left-0 z-10 bg-gray-300 font-extrabold text-zinc-900 dark:bg-darkElevate dark:text-slate-200 "
                          >
                            Semester
                          </th>
                          <td colSpan="5"></td>
                          <th scope="col" className="px-4 py-3 font-extrabold">
                            SGPA
                          </th>
                          <th scope="col" className="px-4 py-3 ">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {semsData.map((sem) => (
                          <tr
                            key={sem.id}
                            className="dark:border-gray-700 dark:odd:bg-darkNav dark:even:bg-dark/70 even:bg-gray-300/50"
                          >
                            <td
                              scope="col"
                              colSpan="4"
                              className="px-4 text-zinc-900 sticky left-0 z-10 dark:text-slate-200 font-extrabold bg-gray-300 dark:bg-darkElevate "
                            >
                              {sem.sem}
                            </td>
                            <td colSpan="5"></td>
                            <td
                              scope="col"
                              className="px-4 text-zinc-900 dark:text-slate-200"
                            >
                              {sem.sgpa}
                            </td>

                            <td className="px-4 flex items-center justify-center">
                              <EditSem
                                index={sem.id}
                                semsData={semsData}
                                setSemsData={setSemsData}
                              />
                              <button
                                onClick={() => handleDeleteSem(sem.id)}
                                className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs md:text-sm md:px-5 md:py-2.5 px-3 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}

                        <tr className="border-b dark:border-gray-700 bg-green-600 text-white">
                          <td
                            scope="col"
                            colSpan="4"
                            className="px-4 py-3 font-extrabold sticky left-0 z-10 bg-green-600"
                          >
                            CGPA
                          </td>
                          <td colSpan="5"></td> {/* Span the other columns */}
                          <td scope="col" className="px-4 py-3">
                            {cgpa}
                          </td>
                          <th scope="col" className="px-4 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex">
                <div className="flex-grow"></div>
                <button
                  className={`text-white font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center transition-all ease-in duration-200 mr-5 mb-2 ${
                    cgpaaccordian ? "rotate-180" : "hidden"
                  }`}
                  type="button"
                  onClick={() => setcgpaaccordian(!cgpaaccordian)}
                >
                  <ChevronDown className="text-zinc-900 dark:text-white" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Calculator;
