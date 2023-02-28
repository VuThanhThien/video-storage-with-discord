import { SearchBar } from "./SearchBar";
import UploadIcon from "../assets/upload.png";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { Button } from "./Button";

interface IProps {
  onClick: () => void;
}
export const Header = ({ onClick }: IProps) => {
  const { user, loading } = useContext(UserContext);
  const avatarUrl = `https://cdn.discordapp.com/avatars/${user.userId}/${user.avatar}.png`;

  return (
    <header className="flex items-center justify-between px-8 py-8">
      <h1 className="text-lg font-medium text-white">xBrain</h1>

      <section className="flex items-center gap-5 w-1/2">
        <SearchBar />
        <Button
        onClick={onClick}
        className="flex justify-center items-center text-sm rounded-md  bg-discord-100 w-52 h-10 hover:bg-discord-200 transition-all"
        >
        <img className="w-4 mr-2" src={UploadIcon} alt="upload button" />
          Upload
        </Button>
        <img
          className="rounded-lg object-cover w-16 aspect-square overflow-hidden"
          src={avatarUrl}
          alt=""
        />
      </section>
    </header>
  );
};
