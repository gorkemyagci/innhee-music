import { Icons } from "@/components/icons";
import UserAvatar from "@/components/user-avatar";
import { useTranslations } from 'next-intl';

const ReviewItem = () => {
    const t = useTranslations('review');

    return (
        <div className="p-3 md:p-4 w-full flex flex-col items-start rounded-[16px] shadow-[0px_0px_12px_0px_rgba(0,0,0,0.015)]">
            <div className="flex w-full border-b border-soft-200 pb-3 md:pb-4 items-start justify-between">
                <div className="flex items-center gap-2">
                    <UserAvatar
                        imageUrl="/assets/images/avatar-3.png"
                        name="Cleve Music"
                        className="w-10 h-10 md:w-12 md:h-12"
                    />
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <p className="text-sub-600 font-medium text-xs md:text-sm">{t('clientName')}</p>
                            <div className="flex items-center gap-0.5">
                                <Icons.star className="size-3 md:size-3.5" />
                                <span className="text-sub-600 font-normal text-[10px] md:text-xs">{t('rating')}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center">
                            <div className="flex items-center gap-1 pr-2 pl-1">
                                <Icons.google className="size-3 md:size-3.5" />
                                <span className="text-sub-600 font-medium text-[10px] md:text-xs">{t('company')}</span>
                            </div>
                            <div className="flex items-center gap-1 pr-2 pl-1">
                                <Icons.google className="size-3 md:size-3.5" />
                                <span className="text-sub-600 font-medium text-[10px] md:text-xs">{t('company')}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <span className="bg-[#F2F2F2] h-5 py-1 px-2 text-main-900 font-medium text-[10px] md:text-[11px] flex items-center justify-between rounded-full">{t('role')}</span>
            </div>
            <div className="w-full pt-3 md:pt-4 flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col items-start gap-1 md:gap-2">
                    <div className="flex items-center gap-1">
                        <p className="text-strong-950 font-medium text-base md:text-xl">{t('contractTitle')}</p>
                        <div className="flex items-center gap-0.5">
                            <Icons.star className="size-3 md:size-3.5" />
                            <span className="text-sub-600 font-normal text-[10px] md:text-xs">{t('rating')}</span>
                        </div>
                    </div>
                    <p className="text-sub-600 font-normal text-xs md:text-sm">{t('reviewText')}</p>
                </div>
                <span className="text-strong-950 font-medium text-base md:text-lg mt-2 md:mt-0">{t('price')}</span>
            </div>
        </div>
    );
}

export default ReviewItem;