"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import StackedBarChartOutlinedIcon from "@mui/icons-material/StackedBarChartOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Dayjs } from "dayjs";
import { useSnackBar } from "./snackBarContext";

interface StatisticsType {
  day: string;
  completed: number;
  total: number;
}

export enum Status {
  Pending = "Pending",
  In_Progress = "In_Progress",
  Completed = "Completed",
}

interface RecentActivities {
  task: string;
  status: Status;
  description: string;
  updatedAt: string;
  startsAt: string;
  expiresAt: string;
  author: { username: string; image: string | null };
  group: { name: string } | null;
}

interface TasksByPrioriy {
  name: "High" | "Medium" | "Low";
  value: number;
  color: string;
}

interface GroupSummary {
  id: string;
  name: string;
  adminId: string;
  admin: {
    username: string;
    image: string | null;
  };
  _count: {
    members: number;
    todos: number;
  };
}

interface dashboardProps {
  searchV: string;
  setSearchV: (S: string) => void;
  statistics: StatisticsType[] | null;
  recentA: RecentActivities[] | null;
  TBP: TasksByPrioriy[] | null;
  GroupInfo: GroupSummary[] | null;

  taskTitle: string;
  setTaskTitle: (t: string) => void;
  desc: string;
  setDesc: (d: string) => void;
  startD: Dayjs | null;
  setStartD: (d: Dayjs | null) => void;
  dueD: Dayjs | null;
  setDueD: (d: Dayjs | null) => void;
  taskPriority: "High" | "Medium" | "Easy";
  setTaskPriority: (p: "High" | "Medium" | "Easy") => void;
  AddTask: (setOpenT: (o: boolean) => void) => void;
  details: {
    groups: number;
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    pendingTasks: number;
    overDueTasks: number;
    High: number;
    Medium: number;
    Low: number;
  };
}

const dashboardContext = createContext<dashboardProps | null>(null);

export default function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [searchV, setSearchV] = useState("");
  const [statistics, setStatistics] = useState<StatisticsType[] | null>(null);
  const [recentA, setRecentA] = useState<RecentActivities[] | null>(null);
  const [TBP, setTBP] = useState<TasksByPrioriy[] | null>(null);
  const [GroupInfo, setGroupInfo] = useState<GroupSummary[] | null>(null);

  const [taskTitle, setTaskTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [startD, setStartD] = useState<Dayjs | null>(null);
  const [dueD, setDueD] = useState<Dayjs | null>(null);
  const [taskPriority, setTaskPriority] = useState<"High" | "Medium" | "Easy">(
    "Easy",
  );
  const [details, setdetails] = useState({
    groups: 0,
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
    overDueTasks: 0,
    High: 0,
    Medium: 0,
    Low: 0,
  });

  useEffect(() => {
    // GET the statistics of the bar chart.
    async function loadS() {
      const res = await fetch("/api/dashboard/bar_chart");
      const data = await res.json();
      setStatistics(data.data);
    }
    // GET the Recent Activities
    async function loadR() {
      const res = await fetch("/api/dashboard/recent_activities");
      const data = await res.json();
      setRecentA(data.data);
    }

    // GET tasks by priority
    async function loadP() {
      const res = await fetch("/api/dashboard/priority");
      const data = await res.json();
      setTBP(data);
    }

    // GET user Groups info
    async function loadG() {
      const res = await fetch("/api/dashboard/Groups");
      console.log(res);
      const data = await res.json();
      setGroupInfo(data.Groups);
    }

    // GET user details
    async function loadD() {
      const res = await fetch("/api/dashboard/statistics");
      const data = await res.json();
      setdetails(data.statistics);
    }

    loadD();
    loadG();
    loadP();
    loadS();
    loadR();
  }, []);

  // Create New Task

  const snackBarContext = useSnackBar();

  if (!snackBarContext) return;

  const { setType, setMessage, setOpen } = snackBarContext;

  async function AddTask(setOpenT: (o: boolean) => void) {
    if (taskTitle === "") {
      setType("info");
      setMessage("Please fill the title field.");
      setOpen(true);
      return;
    }

    const start = startD?.toDate();
    const due = dueD?.toDate();

    if (!start || !due || start >= due) {
      setType("info");
      setMessage("The due date must be later than the start date.");
      setOpen(true);
      return;
    }

    try {
      const res = await fetch("/api/todo/add_new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: taskTitle,
          desc,
          startD: start,
          dueD: due,
          priority: taskPriority,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unexpected error");
      }
      setType("success");
      setMessage("New task created successfylly");
      setOpen(true);
      setOpenT(false);
      setTaskPriority("Easy");
      setTaskTitle("");
      setDesc("");
      setStartD(null);
      setDueD(null);
      return;
    } catch (err) {
      const error =
        err instanceof Error
          ? err.message
          : typeof err === "string"
            ? err
            : "Unexpected error";

      setType("error");
      setMessage(error);
      setOpen(true);
      return;
    }
  }

  return (
    <dashboardContext.Provider
      value={{
        searchV,
        setSearchV,
        statistics,
        recentA,
        TBP,
        GroupInfo,
        taskTitle,
        setTaskTitle,
        desc,
        setDesc,
        startD,
        setStartD,
        dueD,
        setDueD,
        taskPriority,
        setTaskPriority,
        AddTask,
        details,
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
}

export const useDashboardContext = () => useContext(dashboardContext);

export const sidebarItems = [
  {
    name: "Dashboard",
    description: "Overview of your tasks and productivity",
    icon: <DashboardOutlinedIcon />,
    href: "/Dashboard",
  },
  {
    name: "My Tasks",
    description: "Manage your personal tasks and stay productive",
    icon: <AssignmentTurnedInOutlinedIcon />,
    href: "/Dashboard/tasks",
  },
  {
    name: "Calendar",
    description: "View and schedule your upcoming tasks",
    icon: <CalendarMonthOutlinedIcon />,
    href: "/Dashboard/calendar",
  },
  {
    name: "Users",
    description: "Manage team members and their access",
    icon: <GroupOutlinedIcon />,
    href: "/Dashboard/users",
  },
  {
    name: "Analytics",
    description: "Track performance and task insights",
    icon: <StackedBarChartOutlinedIcon />,
    href: "/Dashboard/analytics",
  },
  {
    name: "Settings",
    description: "Configure your account and preferences",
    icon: <SettingsOutlinedIcon />,
    href: "/Dashboard/settings",
  },
];
