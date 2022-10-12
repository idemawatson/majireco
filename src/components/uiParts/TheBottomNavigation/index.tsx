import Presenter from "@/components/uiParts/TheBottomNavigation/presenter";
import { useRouter } from "next/router";

export const TheBottomNavigation: React.FC = () => {
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    event.preventDefault();
    router.push(`/${newValue}`);
  };

  return <Presenter value={router.route} handleChange={handleChange} />;
};
