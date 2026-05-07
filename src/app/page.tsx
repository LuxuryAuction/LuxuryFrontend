import { SearchIcon } from "@/public/assets/icons";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black px-40">
      <div><p className="text-brand-primary">Hello Auction</p></div>
      <div className="space-y-4 mt-4">
        <Input label="Pricing & Timing" inputSize="lg" />
        <Input label="Pricing & Timing" inputSize="md" />
        <Input label="Password" type="search" inputSize="sm" variant="secondary" />
        <Input label="Password" type="password" inputSize="xs" variant="secondary" required />
      </div>
      <div className="space-x-5 mt-4">
        <Button
          variant="primary"
          size="xs"
          leftIcon
          rightIcon
          isLoading={false}
          disabled={false}
        > Create Account </Button>
        <Button
          className="mt-4"
          variant="secondary"
          size="sm"
          leftIcon
          rightIcon
          isLoading={false}
          disabled={false}
        > Create Account </Button>
        <Button
          className="mt-4"
          variant="danger"
          size="md"
          leftIcon
          rightIcon
          isLoading={false}
          disabled={false}
        > Create Account </Button>
        <Button
          className="mt-4"
          variant="ghost"
          size="lg"
          leftIcon
          rightIcon
          isLoading={false}
          disabled={false}
        > Create Account </Button>
        <Button leftIcon={<SearchIcon />} size="md" />
      </div>
    </div >
  );
}
