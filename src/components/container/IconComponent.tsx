import { Icon, IconProps } from "@iconify/react";

const IconComponent = (props: IconProps | any) => {
  const { color } = props; // Extracting color from props

  return <Icon style={{ color }} {...props} />;
};

export default IconComponent;
