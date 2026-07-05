import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import DashboardCards from "../../components/dashboard/DashboardCards";
import AIWidget from "../../components/dashboard/AIWidget";
import CalendarWidget from "../../components/dashboard/CalendarWidget";
import RecentNotes from "../../components/dashboard/RecentNotes";
import Activity from "../../components/dashboard/Activity";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#09090B]">

      <Sidebar />

      <main className="flex-1 p-8">

        <Topbar />

        <DashboardCards />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

  <AIWidget />

  <CalendarWidget />

  <RecentNotes />

</div>

<div className="mt-8">

  <Activity />

</div>

      </main>
      

    </div>


  );

  
}