"use client"
import { useTranslations } from "next-intl";

export const useMockData = () => {
    const t = useTranslations("faq");
    const tJobPosting = useTranslations("jobPosting");
    const tOrders = useTranslations("orders.items");

    const faqsItems = [
        {
            title: t("items.payment.title"),
            description: t("items.payment.description")
        },
        {
            title: t("items.merchant.title"),
            description: t("items.merchant.description")
        },
        {
            title: t("items.international.title"),
            description: t("items.international.description")
        },
        {
            title: t("items.website.title"),
            description: t("items.website.description")
        },
        {
            title: t("items.email.title"),
            description: t("items.email.description")
        }
    ];

    const slides = [
        {
            id: 1,
            image: "/assets/images/slider-item.png",
            title: t("slider.items.rnb.title"),
            description: t("slider.items.rnb.description")
        },
        {
            id: 2,
            image: "/assets/images/slider-item.png",
            title: t("slider.items.tomorrow.title"),
            description: t("slider.items.tomorrow.description")
        },
        {
            id: 3,
            image: "/assets/images/slider-item.png",
            title: t("slider.items.hiphop.title"),
            description: t("slider.items.hiphop.description")
        }
    ];

    const jobPostingMenu = [
        { id: 1, title: tJobPosting("menu.basicInfo"), value: "basic-information" },
        { id: 2, title: tJobPosting("menu.selectCategory"), value: "select-category" },
        { id: 3, title: tJobPosting("menu.usage"), value: "usage" },
        { id: 4, title: tJobPosting("menu.preview"), value: "preview" },
    ];

    const timelineData = [
        {
            id: 1,
            title: tJobPosting("timeline.orderCreated"),
            amount: 500,
            description: tJobPosting("timeline.milestoneAmount"),
            date: "23 Jan 2025, 14:27",
            status: "completed",
        },
        {
            id: 2,
            title: tJobPosting("timeline.milestone", { number: 1 }),
            amount: 58,
            date: "23 Jan 2025, 14:27",
            status: "completed",
        },
        {
            id: 3,
            title: tJobPosting("timeline.milestone", { number: 2 }),
            amount: 120,
            date: null,
            status: "pending",
        },
        {
            id: 4,
            title: tJobPosting("timeline.milestone", { number: 3 }),
            amount: 100,
            date: null,
            status: "pending",
        },
        {
            id: 5,
            title: tJobPosting("timeline.milestone", { number: 4 }),
            amount: 100,
            date: null,
            status: "pending",
        },
        {
            id: 6,
            title: tJobPosting("timeline.milestone", { number: 5 }),
            amount: 100,
            date: null,
            status: "pending",
        },
    ];

    const featuredJobs = [
        {
            id: 1,
            clientName: "Cleve Music",
            clientAvatar: "/assets/images/avatar-3.png",
            rating: 4.9,
            reviewCount: 125,
            jobType: "Salary",
            workType: "Work",
            specialization: "Specia",
            title: "Write professional resume, cover letter",
            skills: ["Mixing", "Singing", "Jazz", "Hip pop", "K pop"],
            description: "We are seeking a talented Website Designer and Front-End Developer to join our team. In this role, you will be responsible for creating visually...",
            price: 1400,
            priceType: "Fixed Price",
            deadline: "3 days ago",
            proposalsSent: 1
        },
        {
            id: 2,
            clientName: "Melody Studios",
            clientAvatar: "/assets/images/avatar-3.png",
            rating: 4.8,
            reviewCount: 98,
            jobType: "Salary",
            workType: "Work",
            specialization: "Specia",
            title: "Music producer needed for pop album",
            skills: ["Production", "Mixing", "Mastering", "Vocals", "Arrangement"],
            description: "Looking for an experienced music producer to help finalize our upcoming pop album. The ideal candidate will have experience with vocal production and modern pop arrangements...",
            price: 45,
            priceType: "Hourly Rate",
            deadline: "1 week ago",
            proposalsSent: 5
        }
    ];

    const workers = [
        {
            id: 1,
            name: "Cleve Music",
            avatar: "/assets/images/avatar-3.png",
            rating: 4.9,
            reviewCount: 125,
            jobType: "Salary",
            workType: "Work",
            specialization: "Specia",
            description: "Passionate about delivering high-quality audio mixing and editing. Let's create something",
            skills: ["Mixing", "Singing", "Jazz", "Hip pop", "K pop"],
            isFavorite: false
        },
        {
            id: 2,
            name: "Cleve Music",
            avatar: "/assets/images/avatar-3.png",
            rating: 4.9,
            reviewCount: 125,
            jobType: "Salary",
            workType: "Work",
            specialization: "Specia",
            description: "Passionate about delivering high-quality audio mixing and editing. Let's create something..........",
            skills: ["Mixing", "Singing", "Jazz", "Hip pop", "K pop"],
            isFavorite: false
        },
        {
            id: 3,
            name: "Cleve Music",
            avatar: "/assets/images/avatar-3.png",
            rating: 4.9,
            reviewCount: 125,
            jobType: "Salary",
            workType: "Work",
            specialization: "Specia",
            description: "Passionate about delivering high-quality audio mixing and editing. Let's create something ama",
            skills: ["Mixing", "Singing", "Jazz", "Hip pop", "K pop"],
            isFavorite: false
        },
        {
            id: 4,
            name: "Cleve Music",
            avatar: "/assets/images/avatar-3.png",
            rating: 4.9,
            reviewCount: 125,
            jobType: "Salary",
            workType: "Work",
            specialization: "Specia",
            description: "Passionate about delivering high-quality audio mixing and editing. Let's create something",
            skills: ["Mixing", "Singing", "Jazz", "Hip pop", "K pop"],
            isFavorite: false
        },
        {
            id: 5,
            name: "Cleve Music",
            avatar: "/assets/images/avatar-3.png",
            rating: 4.9,
            reviewCount: 125,
            jobType: "Salary",
            workType: "Work",
            specialization: "Specia",
            description: "Passionate about delivering high-quality audio mixing and editing. Let's create something",
            skills: ["Mixing", "Singing", "Jazz", "Hip pop", "K pop"],
            isFavorite: false
        },
        {
            id: 6,
            name: "Cleve Music",
            avatar: "/assets/images/avatars-3.png",
            rating: 4.9,
            reviewCount: 125,
            jobType: "Salary",
            workType: "Work",
            specialization: "Specia",
            description: "Passionate about delivering high-quality audio mixing and editing. Let's create something",
            skills: ["Mixing", "Singing", "Jazz", "Hip pop", "K pop"],
            isFavorite: false
        }
    ];

    const buyerOrders = [
        {
            id: 1,
            title: tOrders("title1"),
            skills: [
                tOrders("skills.mixing"),
                tOrders("skills.singing"),
                tOrders("skills.jazz"),
                tOrders("skills.hiphop"),
                tOrders("skills.kpop")
            ],
            price: 1400,
            priceType: tOrders("priceType.fixed"),
            status: tOrders("status.applyNow"),
            description: tOrders("description1"),
            timeline: {
                daysAgo: 3,
                deadlineDate: true,
                sentProposal: 1,
                businessContract: true
            }
        },
        {
            id: 2,
            title: tOrders("title2"),
            skills: [
                tOrders("skills.mixing"),
                tOrders("skills.singing"),
                tOrders("skills.jazz"),
                tOrders("skills.hiphop"),
                tOrders("skills.kpop")
            ],
            price: 1400,
            priceType: tOrders("priceType.fixed"),
            status: tOrders("status.applyNow"),
            description: tOrders("description2"),
            timeline: {
                daysAgo: 3,
                deadlineDate: true,
                sentProposal: 1,
                businessContract: true
            }
        },
        {
            id: 3,
            title: tOrders("title3"),
            skills: [
                tOrders("skills.mixing"),
                tOrders("skills.singing"),
                tOrders("skills.jazz"),
                tOrders("skills.hiphop"),
                tOrders("skills.kpop")
            ],
            price: 1400,
            priceType: tOrders("priceType.fixed"),
            status: tOrders("status.inProgress"),
            description: tOrders("description3"),
            timeline: {
                daysAgo: 3,
                deadlineDate: true,
                sentProposal: 1,
                businessContract: true
            }
        },
        {
            id: 4,
            title: tOrders("title4"),
            skills: [
                tOrders("skills.mixing"),
                tOrders("skills.singing"),
                tOrders("skills.jazz"),
                tOrders("skills.hiphop"),
                tOrders("skills.kpop")
            ],
            price: 1400,
            priceType: tOrders("priceType.fixed"),
            status: tOrders("status.inProgress"),
            description: tOrders("description4"),
            timeline: {
                daysAgo: 3,
                deadlineDate: true,
                sentProposal: 1,
                businessContract: true
            }
        }
    ];

    return {
        faqsItems,
        slides,
        jobPostingMenu,
        timelineData,
        featuredJobs,
        workers,
        buyerOrders
    };
};

