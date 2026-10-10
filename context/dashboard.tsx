"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import StackedBarChartOutlinedIcon from "@mui/icons-material/StackedBarChartOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import dayjs, { Dayjs } from "dayjs";
import { useSnackBar } from "./snackBarContext";
import loadD from "../hooks/load/Details/details";
import loadG from "../hooks/load/Groups/group";
import loadP from "../hooks/load/TasksByPriotity/TBP";
import loadR from "../hooks/load/ResentActivities/resentActivities";
import loadS from "../hooks/load/Statistics/statistics";

interface StatisticsType {
  day: string;
  completed: number;
  total: number;
}

interface RecentActivities {
  task: string;
  status: "Completed" | "Pending" | "In_Progress";
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
  startD: Dayjs;
  setStartD: (d: Dayjs) => void;
  dueD: Dayjs | null;
  setDueD: (d: Dayjs | null) => void;
  taskPriority: "High" | "Normal" | "Easy";
  setTaskPriority: (p: "High" | "Normal" | "Easy") => void;
  AddTask: () => void;
  details: {
    groups: number;
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    pendingTasks: number;
    overDueTasks: number;
    High: number;
    Normal: number;
    Low: number;
  };
  openT: boolean;
  setOpenT: (O: boolean) => void;
  loading: boolean;
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
  const [startD, setStartD] = useState<Dayjs>(dayjs(new Date()));
  const [dueD, setDueD] = useState<Dayjs | null>(null);
  const [taskPriority, setTaskPriority] = useState<"High" | "Normal" | "Easy">(
    "Easy",
  );
  const [openT, setOpenT] = useState(false);
  const [loading, startTransition] = useTransition();
  const [details, setdetails] = useState({
    groups: 0,
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    pendingTasks: 0,
    overDueTasks: 0,
    High: 0,
    Normal: 0,
    Low: 0,
  });
  const snackBarContext = useSnackBar();
  function loadData() {
    // GET user details
    loadD(setdetails);
    // GET user Groups info
    loadG(setGroupInfo);
    // GET tasks by priority
    loadP(setTBP);
    // GET the statistics of the bar chart.
    loadS(setStatistics);
    // GET the Recent Activities
    loadR(setRecentA);
  }

  useEffect(() => {
    loadData();
  }, []);

  // Create New Task
  function AddTask() {
    if (!snackBarContext) return;
    const { setType, setMessage, setOpen } = snackBarContext;
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
    startTransition(async () => {
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
        setMessage("New task created successfully");
        setOpen(true);
        loadData();
        setOpenT(false);
        setTaskPriority("Easy");
        setTaskTitle("");
        setDesc("");
        setStartD(dayjs(new Date()));
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
    });
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
        openT,
        setOpenT,
        loading,
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
