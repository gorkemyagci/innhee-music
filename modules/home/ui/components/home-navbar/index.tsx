import { getTokenFromCookie } from "@/app/server/action";
import HomeNavbarModule from "./home-navbar"

const HomeNavbar = async () => {
    const token = await getTokenFromCookie();
    const isAuthenticated = !!token;
    return <HomeNavbarModule isAuthenticated={isAuthenticated} />
}

export default HomeNavbar;