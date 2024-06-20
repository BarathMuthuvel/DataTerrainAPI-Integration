const UpcomingCard = ({
  date,
  month,
  title,
  createdBy,
  time,
  bg,
  text,
}: any) => {
  return (
    <div className="flex items-center gap-1 text-sm mb-4 py-2 ml-4 w-[90%]">
      <div
        className={`w-[16%] h-[16%] py-3 rounded ${bg} ${text} flex items-center justify-center flex-col`}
      >
        <h2>{date}</h2>
        <p>{month}</p>
      </div>
      <div className="w-[55%] pl-2">
        <p className="font-semibold text-xs">{title}</p>
        <p className="py-2 text-xs">Created by {createdBy}</p>
        <p className="text-xs">{time}</p>
      </div>
      <div className="w-[15%]">
        <button className="bg-blue-500 py-2 px-4 shadow-md text-xs rounded text-white font-extralight">
          Details
        </button>
      </div>
    </div>
  );
};

export default UpcomingCard;
