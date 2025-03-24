"use client";

import { Offer } from "../../types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import InputElement from "@/components/custom/form-elements/input";
import { useTranslations } from "next-intl";

interface OfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (offer: Offer) => void;
}

const OfferModal = ({ isOpen, onClose, onSubmit }: OfferModalProps) => {
  const t = useTranslations("chat.offerModal");
  
  const formSchema = z.object({
    title: z.string().min(1, t("form.errors.titleRequired")),
    description: z.string().min(1, t("form.errors.descriptionRequired")),
    amount: z.string()
      .min(1, t("form.errors.amountRequired"))
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: t("form.errors.amountGreaterThanZero"),
      }),
    deliveryDays: z.string()
      .min(1, t("form.errors.deliveryDaysRequired"))
      .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: t("form.errors.deliveryDaysGreaterThanZero"),
      }),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      deliveryDays: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    const offer: Offer = {
      id: `offer-${Date.now()}`,
      title: values.title,
      description: values.description,
      amount: parseFloat(values.amount),
      currency: "US$",
      deliveryDays: parseInt(values.deliveryDays),
    };

    onSubmit(offer);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 bg-white border-soft-200 rounded-3xl overflow-hidden">
        <DialogHeader className="p-6 border-b border-soft-200">
          <div className="flex items-center justify-between w-full">
            <DialogTitle className="text-main-900 font-medium">{t("title")}</DialogTitle>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="w-full p-6 pt-2 flex flex-col gap-6">
              <div className="flex flex-col space-y-2">
                <InputElement
                  form={form}
                  name="title"
                  label={t("form.title.label")}
                  placeholder={t("form.title.placeholder")}
                  className="h-11 hover:bg-weak-50 border-soft-200 transition-colors"
                />
                <p className="text-xs text-sub-600 px-0.5">
                  {t("form.title.helper")}
                </p>
              </div>

              <div className="flex flex-col space-y-2">
                <InputElement
                  form={form}
                  name="description"
                  label={t("form.description.label")}
                  type="textarea"
                  placeholder={t("form.description.placeholder")}
                  className="min-h-[120px] hover:bg-weak-50 border-soft-200 transition-colors"
                />
                <p className="text-xs text-sub-600 px-0.5">
                  {t("form.description.helper")}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <InputElement
                    form={form}
                    name="amount"
                    label={t("form.price.label")}
                    type="price"
                    placeholder={t("form.price.placeholder")}
                    prefix={t("form.price.prefix")}
                    className="h-11 hover:bg-weak-50 border-soft-200 transition-colors"
                  />
                  <p className="text-xs text-sub-600 px-0.5">
                    {t("form.price.helper")}
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <InputElement
                    form={form}
                    name="deliveryDays"
                    label={t("form.deliveryTime.label")}
                    type="number"
                    placeholder={t("form.deliveryTime.placeholder")}
                    className="h-11 hover:bg-weak-50 border-soft-200 transition-colors"
                  />
                  <p className="text-xs text-sub-600 px-0.5">
                    {t("form.deliveryTime.helper")}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-4 border-t border-soft-200">
              <Button type="button"
                onClick={onClose}
                variant="outline" className="h-9 flex-1 border-soft-200 rounded-lg bg-white flex items-center gap-1.5 text-sub-600 font-medium text-sm">
                {t("form.buttons.cancel")}
              </Button>
              <Button
                type="submit"
                className="h-10 flex-1 disabled:cursor-auto group rounded-lg text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]">
                <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
                {t("form.buttons.submit")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OfferModal; 