"use client"
import Head from "../components/head";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

type NotificationType = "chatMessage" | "transaction" | "confirmationOfTransaction" | "exclusiveOffers" | "confirmation";

interface NotificationSetting {
    chatMessage: boolean;
    transaction?: boolean;
    confirmationOfTransaction: boolean;
    exclusiveOffers?: boolean;
    confirmation?: boolean;
}

const Notifications = () => {
    const [mobileNotifications, setMobileNotifications] = useState<NotificationSetting>({
        chatMessage: true,
        transaction: true,
        confirmationOfTransaction: true,
        exclusiveOffers: false
    });

    const [emailNotifications, setEmailNotifications] = useState<NotificationSetting>({
        chatMessage: true,
        transaction: true,
        confirmationOfTransaction: false
    });

    const [wechatNotifications, setWechatNotifications] = useState<NotificationSetting>({
        chatMessage: true,
        confirmation: true,
        confirmationOfTransaction: false
    });

    const handleToggle = (
        section: "mobile" | "email" | "wechat",
        type: NotificationType
    ) => {
        if (section === "mobile") {
            setMobileNotifications(prev => ({
                ...prev,
                [type]: !prev[type as keyof NotificationSetting]
            }));
        } else if (section === "email") {
            setEmailNotifications(prev => ({
                ...prev,
                [type]: !prev[type as keyof NotificationSetting]
            }));
        } else if (section === "wechat") {
            setWechatNotifications(prev => ({
                ...prev,
                [type]: !prev[type as keyof NotificationSetting]
            }));
        }
    };

    return (
        <div className="w-full">
            <Head heading="Notification Settings" subHeading="Personalize your privacy settings and enhance the security of your account." />
            <div className="w-full px-6 pt-6">
                <div className="max-w-[800px] mx-auto flex flex-col gap-8">
                    <div className="w-full">
                        <div>
                            <h3 className="text-sm text-strong-950 font-medium">Mobile Phone Notification</h3>
                            <p className="text-sub-600 font-normal text-xs">Notifications about transactions, balance and exclusive offers.</p>
                        </div>

                        <div className="space-y-4 flex flex-col items-end">
                            <div className="flex items-center justify-between flex-row-reverse gap-2">
                                <span className="text-sm text-main-900 font-medium w-60">Chat Message</span>
                                <Switch
                                    checked={mobileNotifications.chatMessage}
                                    onCheckedChange={() => handleToggle("mobile", "chatMessage")}
                                />
                            </div>

                            <div className="flex items-center justify-between flex-row-reverse gap-2">
                                <span className="text-sm text-main-900 font-medium w-60">Transaction</span>
                                <Switch
                                    checked={mobileNotifications.transaction}
                                    onCheckedChange={() => handleToggle("mobile", "transaction")}
                                />
                            </div>

                            <div className="flex items-center justify-between flex-row-reverse gap-2">
                                <span className="text-sm text-main-900 font-medium w-60">Confirmation of Transaction</span>
                                <Switch
                                    checked={mobileNotifications.confirmationOfTransaction}
                                    onCheckedChange={() => handleToggle("mobile", "confirmationOfTransaction")}
                                />
                            </div>

                            <div className="flex items-center justify-between flex-row-reverse gap-2">
                                <span className="text-sm text-main-900 font-medium w-60">Exclusive Offers</span>
                                <Switch
                                    checked={mobileNotifications.exclusiveOffers}
                                    onCheckedChange={() => handleToggle("mobile", "exclusiveOffers")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border border-soft-200 h-[1px] w-full border-dashed"></div>
                    <div className="w-full">
                        <div>
                            <h3 className="text-sm text-strong-950 font-medium">Email Notification</h3>
                            <p className="text-sub-600 font-normal text-xs">Choose how you prefer to receive notifications.</p>
                        </div>

                        <div className="space-y-4 flex flex-col items-end">
                            <div className="flex items-center flex-row-reverse justify-between gap-2">
                                <span className="text-sm text-main-900 font-medium w-60">Chat Message</span>
                                <Switch
                                    checked={emailNotifications.chatMessage}
                                    onCheckedChange={() => handleToggle("email", "chatMessage")}
                                />
                            </div>

                            <div className="flex items-center flex-row-reverse justify-between gap-2">
                                <span className="text-sm text-main-900 font-medium w-60">Transaction</span>
                                <Switch
                                    checked={emailNotifications.transaction}
                                    onCheckedChange={() => handleToggle("email", "transaction")}
                                />
                            </div>

                            <div className="flex items-center flex-row-reverse justify-between gap-2">
                                <span className="text-sm text-main-900 font-medium w-60">Confirmation of Transaction</span>
                                <Switch
                                    checked={emailNotifications.confirmationOfTransaction}
                                    onCheckedChange={() => handleToggle("email", "confirmationOfTransaction")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="border border-soft-200 h-[1px] w-full border-dashed"></div>
                    <div className="w-full">
                        <div className="mb-2">
                            <h3 className="text-sm text-strong-950 font-medium">Wechat Notification</h3>
                            <p className="text-sub-600 font-normal text-xs">Choose how you prefer to receive notifications.</p>
                        </div>

                        <div className="space-y-4 flex flex-col items-end">
                            <div className="flex items-center flex-row-reverse justify-between gap-2">
                                <span className="text-sm text-main-900 font-medium w-60">Chat Message</span>
                                <Switch
                                    checked={wechatNotifications.chatMessage}
                                    onCheckedChange={() => handleToggle("wechat", "chatMessage")}
                                />
                            </div>

                            <div className="flex items-center flex-row-reverse justify-between gap-2">
                                <span className="text-sm text-main-900 font-medium w-60">Confirmation</span>
                                <Switch
                                    checked={wechatNotifications.confirmation}
                                    onCheckedChange={() => handleToggle("wechat", "confirmation")}
                                />
                            </div>

                            <div className="flex items-center flex-row-reverse justify-between gap-2">
                                <span className="text-sm text-main-900 font-medium w-60">Confirmation of Transaction</span>
                                <Switch
                                    checked={wechatNotifications.confirmationOfTransaction}
                                    onCheckedChange={() => handleToggle("wechat", "confirmationOfTransaction")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications;