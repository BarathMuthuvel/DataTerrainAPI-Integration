
const ActivityCard = ({ image, name, role, description, time }: any) => {
  return (
    <div className="my-7 flex">
      <img src={image} alt="user" className="h-[60px] w-[60px] rounded-full p-1 mr-2" />
      <div>
        <p className="text-xs font-semibold">
          {name} <span className="text-blue-500 text-[10px]">[ {role} ]</span>
        </p>
        <p className="text-xs py-2">{description}</p>
        <p style={{ fontSize: "10px" }}>{time}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
