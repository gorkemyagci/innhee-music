import Head from "../components/head";

const Security = () => {
    return (
        <div className="w-full">
            <Head heading="Security Settings" subHeading="Personalize your privacy settings and enhance the security of your account." />
            <div className="w-full px-6 pt-6 flex flex-col gap-6 items-start">
                <div className="w-full flex items-center justify-between">
                    <p className="text-strong-950 font-medium text-sm">Business name</p>
                    <span className="text-sub-600 font-normal text-sm">ASDD DDSSS</span>
                </div>
                <div className="border border-dashed w-full h-[1px] border-soft-200" />
                <div className="w-full flex items-center justify-between">
                    <p className="text-strong-950 font-medium text-sm">Unified Social Credit Code</p>
                    <span className="text-sub-600 font-normal text-sm">sd****1566</span>
                </div>
                <div className="border border-dashed w-full h-[1px] border-soft-200" />
                <div className="w-full flex items-center justify-between">
                    <p className="text-strong-950 font-medium text-sm">Name of Contact Person</p>
                    <span className="text-sub-600 font-normal text-sm">ASDD DDSSS</span>
                </div>
                <div className="border border-dashed w-full h-[1px] border-soft-200" />
            </div>
        </div>
    )
}

export default Security;