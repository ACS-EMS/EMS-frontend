import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AdminContext = createContext();

const defaultUsers = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    role: "Employee",
    department: "Engineering",
    status: "Active",
  },
  {
    id: 2,
    name: "Anjali Reddy",
    email: "anjali@example.com",
    role: "Recruiter",
    department: "Human Resources",
    status: "Active",
  },
  {
    id: 3,
    name: "Kiran Kumar",
    email: "kiran@example.com",
    role: "Hiring Manager",
    department: "Engineering",
    status: "Active",
  },
  {
    id: 4,
    name: "Priya Singh",
    email: "priya@example.com",
    role: "Interviewer",
    department: "Engineering",
    status: "Inactive",
  },
];

const defaultActivities = [
  {
    id: 1,
    message: "New recruiter account created",
    time: "1 hour ago",
  },
  {
    id: 2,
    message: "Engineering department updated",
    time: "2 hours ago",
  },
  {
    id: 3,
    message: "New HR Manager added",
    time: "3 hours ago",
  },
];

export function AdminProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("adminUsers");

    return savedUsers
      ? JSON.parse(savedUsers)
      : defaultUsers;
  });

  const [activities, setActivities] = useState(() => {
    const savedActivities =
      localStorage.getItem("adminActivities");

    return savedActivities
      ? JSON.parse(savedActivities)
      : defaultActivities;
  });

  useEffect(() => {
    localStorage.setItem(
      "adminUsers",
      JSON.stringify(users)
    );
  }, [users]);

  useEffect(() => {
    localStorage.setItem(
      "adminActivities",
      JSON.stringify(activities)
    );
  }, [activities]);

  const addActivity = (message) => {
    const activity = {
      id: Date.now(),
      message,
      time: "Just now",
    };

    setActivities((prev) => [
      activity,
      ...prev,
    ]);
  };

  const addUser = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
    };

    setUsers((prev) => [
      newUser,
      ...prev,
    ]);

    addActivity(
      `New ${userData.role} account created`
    );
  };

  const updateUser = (id, updatedData) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              ...updatedData,
            }
          : user
      )
    );

    addActivity(
      `${updatedData.name} account updated`
    );
  };

  const toggleUserStatus = (id) => {
    const selectedUser = users.find(
      (user) => user.id === id
    );

    if (!selectedUser) return;

    const newStatus =
      selectedUser.status === "Active"
        ? "Inactive"
        : "Active";

    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? {
              ...user,
              status: newStatus,
            }
          : user
      )
    );

    addActivity(
      `${selectedUser.name} account ${newStatus.toLowerCase()}`
    );
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        activities,
        addUser,
        updateUser,
        toggleUserStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}