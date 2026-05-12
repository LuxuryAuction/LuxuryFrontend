import { SearchIcon } from "@/public/assets/icons";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black px-40">
      <div>
        <p className="text-brand-primary">{t("hello")}</p>
      </div>
      <div className="space-y-4 mt-4">
        <Input label={t("pricingTiming")} inputSize="lg" />
        <Input label={t("pricingTiming")} inputSize="md" />
        <Input label={t("password")} type="search" inputSize="sm" variant="secondary" />
        <Input label={t("password")} type="password" inputSize="xs" variant="secondary" required />
      </div>
      <div className="space-x-5 mt-4">
        <Button variant="primary" size="xs" leftIcon rightIcon isLoading={false} disabled={false}>
          {t("createAccount")}
        </Button>
        <Button
          className="mt-4"
          variant="secondary"
          size="sm"
          leftIcon
          rightIcon
          isLoading={false}
          disabled={false}
        >
          {t("createAccount")}
        </Button>
        <Button
          className="mt-4"
          variant="danger"
          size="md"
          leftIcon
          rightIcon
          isLoading={false}
          disabled={false}
        >
          {t("createAccount")}
        </Button>
        <Button
          className="mt-4"
          variant="ghost"
          size="lg"
          leftIcon
          rightIcon
          isLoading={false}
          disabled={false}
        >
          {t("createAccount")}
        </Button>
        <Button leftIcon={<SearchIcon />} size="md" />
      </div>
    </div>
  );
}
