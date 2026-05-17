// import youtubeLogo from "../assets/logo.png"
import {
  Home,
  Explore,
  Subscriptions,
  VideoLibraryOutlined,
  HistoryOutlined,
  LibraryMusicOutlined,
  SportsBasketballOutlined,
  SportsEsportsOutlined,
  MovieOutlined,
  ArticleOutlined,
  FlagOutlined,
  LiveTvOutlined,
  SettingsOutlined,
  HelpOutlineOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="text-white flex flex-col mt-4 h-screen w-[17vw]">
      <div className="flex items-center justify-start gap-5  w-[15vw] mx-auto px-3 py-2 rounded-xl hover:bg-gray-600 cursor-pointer">
        <span>
          <Home />
        </span>
        <span>Home</span>
      </div>
      <NavLink to="/trends" style={{ textDecoration: "none" }}>
        <div className="flex items-center justify-start gap-5  w-[15vw] mx-auto px-3 py-2 rounded-xl hover:bg-gray-600 cursor-pointer">
          <span>
            <Explore />
          </span>
          <span>Explore</span>
        </div>
      </NavLink>
      <NavLink to="/subscriptions" style={{ textDecoration: "none" }}>
        <div className="flex items-center justify-start gap-5  w-[15vw] mx-auto px-3 py-2 rounded-xl hover:bg-gray-600 cursor-pointer">
          <span>
            <Subscriptions />
          </span>
          <span>Subscriptions</span>
        </div>
      </NavLink>
      <div className="w-full border-t-1 border-gray-500 mt-3 mb-3"></div>
      <div className="flex items-center justify-start gap-5  w-[15vw] mx-auto px-3 py-2 rounded-xl hover:bg-gray-600 cursor-pointer">
        <span>
          <VideoLibraryOutlined />
        </span>
        <span>Library</span>
      </div>
      <NavLink to={"/history"}>
        <div className="flex items-center justify-start gap-5  w-[15vw] mx-auto px-3 py-2 rounded-xl hover:bg-gray-600 cursor-pointer">
          <span>
            <HistoryOutlined />
          </span>
          <span>History</span>
        </div>
      </NavLink>
      {!currentUser && (
        <>
          <div className="w-full border-t-1  border-gray-500 mt-3 mb-3"></div>
          <div className="flex flex-col gap-3  w-[15vw] mx-auto px-3 py-2 rounded-xl">
            <p className="text-[15px]">
              Sign in to like videos,
              <br />
              comment, and subscribe
            </p>
            <NavLink to="/signin" style={{ textDecoration: "none" }}>
              <button className="border w-[8vw] border-gray-600 text-blue-500 rounded-3xl px-3 py-1 flex items-center gap-2 hover:bg-gray-600 hover:text-white cursor-pointer">
                <span>
                  <AccountCircleOutlined />
                </span>
                <span>Sign in</span>
              </button>
            </NavLink>
          </div>
        </>
      )}
      {/* <div className="w-full border-t-1  border-gray-500 mt-3 mb-3"></div>
      <p className="w-[15vw] mx-auto px-3 py-2 mb-2">BEST OF VIDEOTUBE</p>
      <div className="flex items-center justify-start gap-5  w-[15vw] mx-auto px-3 py-2 rounded-xl hover:bg-gray-600 cursor-pointer">
        <span>
          <LibraryMusicOutlined />
        </span>
        <span>Music</span>
      </div>
      <div className="flex items-center justify-start gap-5  w-[15vw] mx-auto px-3 py-2 rounded-xl hover:bg-gray-600 cursor-pointer">
        <span>
          <SportsBasketballOutlined />
        </span>
        <span>Sports</span>
      </div>
      <div className="flex items-center justify-start gap-5  w-[15vw] mx-auto px-3 py-2 rounded-xl hover:bg-gray-600 cursor-pointer">
        <span>
          <SportsEsportsOutlined />
        </span>
        <span>Gaming</span>
      </div>
      <div className="flex items-center justify-start gap-5  w-[15vw] mx-auto px-3 py-2 rounded-xl hover:bg-gray-600 cursor-pointer">
        <span>
          <MovieOutlined />
        </span>
        <span>Movies</span>
      </div>
      <div className="flex items-center justify-start gap-5  w-[15vw] mx-auto px-3 py-2 rounded-xl hover:bg-gray-600 cursor-pointer">
        <span>
          <ArticleOutlined />
        </span>
        <span>News</span>
      </div>
      <div className="flex items-center justify-start gap-5  w-[15vw] mx-auto px-3 py-2 rounded-xl hover:bg-gray-600 cursor-pointer">
        <span>
          <LiveTvOutlined />
        </span>
        <span>Live</span>
      </div> */}
      <div className="w-full border-t-1  border-gray-500 mt-3 mb-3"></div>
      <div className="flex items-center justify-start gap-5  w-[15vw] mx-auto px-3 py-2 rounded-xl hover:bg-gray-600 cursor-pointer">
        <span>
          <SettingsOutlined />
        </span>
        <span>Settings</span>
      </div>
      <div className="flex items-center justify-start gap-5  w-[15vw] mx-auto px-3 py-2 rounded-xl hover:bg-gray-600 cursor-pointer">
        <span>
          <FlagOutlined />
        </span>
        <span>Report</span>
      </div>
      <div className="flex items-center justify-start gap-5  w-[15vw] mx-auto px-3 py-2 rounded-xl hover:bg-gray-600 cursor-pointer">
        <span>
          <HelpOutlineOutlined />
        </span>
        <span>Help</span>
      </div>
    </div>
    // <Container>
    //   <Wrapper>
    //     {/* <NavLink to={"/"} style={{"text-decoration":"none","color":"inherit"}}>
    //     <Logo>
    //       <Img src={youtubeLogo} />
    //       videoTube
    //     </Logo>
    //     </NavLink> */}

    //     <Item onClick={() => setDarkMode(!darkMode)}>
    //       <SettingsBrightnessOutlined />{darkMode ? "Light" : "Dark"} Mode
    //     </Item>
    //   </Wrapper>
    // </Container>
  );
};

export default Sidebar;
