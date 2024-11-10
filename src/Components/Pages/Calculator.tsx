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

interface Subject {
  id: string;
  name: string;
  ccaMarks: number;
  endSemMarks: number;
  totalOutOf100: number;
  credits: number;
  gradePoints: number;
  creditsXGradePoints: number;
  totalCredits: number;
  totalCreditsXGradePoints: number;
}

interface SemData {
  id: string;
  sem: string;
  sgpa: number;
}

interface NewSubject {
  name: string;
  ccaMarks: string;
  endSemMarks: string;
  credits: string;
}

const Calculator: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [profileHidden, setProfileHidden] = useState<boolean>(true);
  const navigate = useNavigate();
  const [asideHidden, setAsideHidden] = useState<boolean>(true);
  const { currentUser, logoutUser, mode, setMode } = useContext(UserContext)!;
  const [cgpa, setCgpa] = useState<number>(0);
  const userName = currentUser?.displayName;
  const userEmail = currentUser?.email;
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [sgpaAccordion, setSgpaAccordion] = useState<boolean>(false);
  const [cgpaAccordion, setCgpaAccordion] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [newSubject, setNewSubject] = useState<NewSubject>({
    name: "",
    ccaMarks: "",
    endSemMarks: "",
    credits: "",
  });
  const [semsData, setSemsData] = useState<SemData[]>([]);

  useEffect(() => {
    const storedSubjects = localStorage.getItem("subjects");
    if (storedSubjects) {
      setSubjects(JSON.parse(storedSubjects));
    }
  }, []);

  useEffect(() => {
    if (subjects.length === 0) {
      localStorage.removeItem("subjects");
    } else {
      localStorage.setItem("subjects", JSON.stringify(subjects));
    }
  }, [subjects]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (currentUser?.displayName) {
          const url = `https://api.dicebear.com/7.x/initials/svg?seed=${userName}`;
          setProfilePicture(url);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [userEmail, currentUser?.displayName, userName]);

  useEffect(() => {
    const storedSemsData = localStorage.getItem("semsData");
    if (storedSemsData) {
      setSemsData(JSON.parse(storedSemsData));
    }
  }, []);

  useEffect(() => {
    if (semsData.length === 0) {
      localStorage.removeItem("semsData");
    } else {
      const totalSgpa = semsData.reduce((acc, sem) => acc + sem.sgpa, 0);
      setCgpa(parseFloat((totalSgpa / semsData.length).toFixed(2)));
      localStorage.setItem("semsData", JSON.stringify(semsData));
    }
  }, [semsData]);

  const handleSignOut = async () => {
    setError("");

    const bgColor = mode === "dark" ? "#15131D" : "#F2F2F1";
    const txtColor = mode === "dark" ? "#F1F5F9" : "#18181B";

    const result = await Swal.fire({
      title: "Are you sure?",
      imageUrl: "assets/svgviewer-png-output.png",
      text: "You will be logged out of this application",
      showDenyButton: true,
      confirmButtonText: "Yes, logout",
      denyButtonText: "Cancel",
      customClass: {
        confirmButton:
          "px-3 py-2.5 border border-emerald-400 mr-2 rounded-lg text-md bg-green-500/70 hover:bg-green-500/80 focus:bg-green-500/80",
        denyButton:
          "px-3 py-2.5 border border-rose-300 rounded-lg text-md bg-rose-500/70 hover:bg-rose-500/80 focus:bg-rose-500/80",
      },
      buttonsStyling: false,
      background: bgColor,
      color: txtColor,
      backdrop: "rgba(46, 43, 59, 0.8) left top no-repeat",
    });

    if (result.isConfirmed) {
      logoutUser();
      navigate("/signin");
    }
  };

  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      if (mode === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
  }, [mode]);

  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const handleSemData = (semData: SemData) => {
    setSemsData(prev => [...prev, semData]);
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

  const handleAddSubject = (subjectData: Subject) => {
    const updatedSubjects = [...subjects, subjectData];
    
    const updatedTotalCredits = updatedSubjects.reduce((acc, subject) => 
      acc + subject.credits, 0);
      
    const updatedTotalCreditsXGradePoints = updatedSubjects.reduce((acc, subject) => 
      acc + subject.creditsXGradePoints, 0);

    const finalSubjects = updatedSubjects.map(subject => ({
      ...subject,
      totalCredits: updatedTotalCredits,
      totalCreditsXGradePoints: updatedTotalCreditsXGradePoints
    }));

    setSubjects(finalSubjects);
    setNewSubject({
      name: "",
      ccaMarks: "",
      endSemMarks: "",
      credits: "",
    });
  };

  const handleDeleteSubject = (id: string) => {
    const updatedSubjects = subjects.filter(subject => subject.id !== id);
    
    const updatedTotalCredits = updatedSubjects.reduce((acc, subject) => 
      acc + subject.credits, 0);
      
    const updatedTotalCreditsXGradePoints = updatedSubjects.reduce((acc, subject) => 
      acc + subject.creditsXGradePoints, 0);

    const finalSubjects = updatedSubjects.map(subject => ({
      ...subject,
      totalCredits: updatedTotalCredits,
      totalCreditsXGradePoints: updatedTotalCreditsXGradePoints
    }));

    setSubjects(finalSubjects);
  };

  const handleDeleteSem = (id: string) => {
    setSemsData(prev => prev.filter(sem => sem.id !== id));
  };

  return (
    <>
      <div className="antialiased h-max bg-Light20 dark:bg-dark">
        {/* Rest of the JSX remains the same, just update the type annotations and variable names for consistency */}
      </div>
    </>
  );
};

export default Calculator;
