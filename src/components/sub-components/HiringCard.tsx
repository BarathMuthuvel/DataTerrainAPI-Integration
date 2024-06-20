
const HiringCard = ({ image, name, description, time }: any) => {
  return (
    <div className="my-7 flex items-center">
      <img src={image} alt="person" className="h-[60px] w-[60px] rounded-full p-1 mr-2" />
      <div className="w-[68%]">
        <p className="text-xs font-semibold">{name}</p>
        <p className="text-xs py-2 ">{description}</p>
        <p className="text-xs">Hired by: Stella</p>
      </div>
      <button className="border  rounded border-blue-400  text-blue-500 py-1 px-3 h-8  text-xs">
        Details
      </button>
    </div>
  );
};

export default HiringCard;
