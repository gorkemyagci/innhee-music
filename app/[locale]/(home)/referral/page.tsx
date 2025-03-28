import { getTokenFromCookie } from "@/app/server/action";
import LoggedIn from "@/modules/referral/ui/views/logged-in";
import NotLoggedIn from "@/modules/referral/ui/views/not-logged-in";

export const dynamic = "force-dynamic";

const Page = async () => {
    const isLoggedIn = await getTokenFromCookie();
    return (
        <>
            {!isLoggedIn ? <NotLoggedIn /> : <LoggedIn />}
        </>
    )
}

export default Page;