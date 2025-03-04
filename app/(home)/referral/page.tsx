import LoggedIn from "@/modules/referral/ui/views/logged-in";
import NotLoggedIn from "@/modules/referral/ui/views/not-logged-in";

const Page = () => {
    const isLoggedIn = false;
    return (
        <>
            {!isLoggedIn ? <NotLoggedIn /> : <LoggedIn />}
        </>
    )
}

export default Page;