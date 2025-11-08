import ScheduleCalendar from "@/components/ScheduleCalender"

const StudentPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row'>
      <div className="w-full xl:w-full">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule Sessions</h1>
          <ScheduleCalendar />
        </div>
      </div>
    </div>
  )
}

export default StudentPage