import sidebarone from "../../Images/sidebarone.png";
import sidebartwo from "../../Images/sidebartwo.png";
import sidebarthree from "../../Images/sidebarthree.png";
import sidebarfour from "../../Images/sidebarfour.png";
import sidebarfive from "../../Images/sidebarfive.png";
import sidebarsix from "../../Images/sidebarsix.png";
import sidebarseven from "../../Images/sidebarseven.png";
import sidebareight from "../../Images/sidebareight.png";
import sidebarnine from "../../Images/sidebarnine.png";

const SideBar = () => {
  const sidebarImages = [
    sidebarone,
    sidebartwo,
    sidebarthree,
    sidebarfour,
    sidebarfive,
    sidebarsix,
    sidebarseven,
    sidebareight,
    sidebarnine,
  ];

  return (
    <div
      className="bg-white flex flex-col items-center gap-10 py-8  shadow-2xl"
      style={{
        borderTopRightRadius: "35px",
        width: "6%",
      }}
    >
      {sidebarImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`sidebar ${index + 1}`}
          className="h-7 bg-transparent"
        />
      ))}
    </div>
  );
};

export default SideBar;
