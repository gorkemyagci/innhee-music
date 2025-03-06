const Head = ({ heading, subHeading }: { heading: string, subHeading: string }) => {
    return (
        <div className="w-full flex flex-col border-b px-6 border-soft-200 pb-4 items-start gap-1">
            <p className="text-strong-950 font-medium text-lg">{heading}</p>
            <span className="text-sub-600 font-normal text-sm">{subHeading}</span>
        </div>
    )
}

export default Head;