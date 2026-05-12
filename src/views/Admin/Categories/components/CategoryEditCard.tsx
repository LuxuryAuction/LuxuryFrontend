"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GridIcon } from "@/public/assets/icons";
import Button from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { useToast } from "@/src/components/ui/Toast";
import { CategoryEditSchema, categoryEditSchema } from "@/src/schemas/category.schema";
import { categoryService } from "@/src/services/CategoriesService";
import type { ICategory, ICategoryUpdatePayload } from "@/src/services/CategoriesService/types";
import { getCategoryEditDefaultValues } from "../types";

type CategoryEditCardProps = {
  category: ICategory;
  onUpdated: () => void;
};

export const CategoryEditCard = ({ category, onUpdated }: CategoryEditCardProps) => {
  const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryEditSchema>({
    resolver: zodResolver(categoryEditSchema),
    defaultValues: getCategoryEditDefaultValues(category),
  });

  useEffect(() => {
    reset(getCategoryEditDefaultValues(category));
  }, [category, reset]);

  const handleSave = async (data: CategoryEditSchema) => {
    const payload: ICategoryUpdatePayload = {
      name: data.name,
      shortDescription: data.shortDescription,
      image: data.image,
      postingPrice: Number(data.postingPrice),
    };

    try {
      await categoryService.updateCategory(category.id, payload);
      onUpdated();
      showToast("success", "Категорію збережено");
    } catch {
      showToast("error", "Не вдалося зберегти");
    }
  };

  return (
    <form
      className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/3 p-5 md:flex-row md:gap-6 md:p-6"
      onSubmit={handleSubmit(handleSave)}
      noValidate
    >
      <div className="relative mx-auto h-36 w-full shrink-0 overflow-hidden rounded-xl border border-white/10 bg-surface-secondary md:mx-0 md:h-40 md:w-40">
        {category.image ? (
          <Image src={category.image} alt={category.name} fill className="object-cover" sizes="160px" unoptimized />
        ) : (
          <div className="flex h-full items-center justify-center text-white/25">
            <GridIcon className="h-10 w-10" />
          </div>
        )}
        <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] text-white/80">
          ID {category.id}
        </span>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                label="Назва"
                value={field.value}
                onChange={field.onChange}
                inputSize="sm"
                variant="admin"
                error={errors.name?.message}
                required
              />
            )}
          />
          <Controller
            control={control}
            name="postingPrice"
            render={({ field }) => (
              <Input
                label="Ціна публікації (₴)"
                value={field.value}
                onChange={field.onChange}
                inputSize="sm"
                variant="admin"
                type="currency"
                error={errors.postingPrice?.message}
                required
              />
            )}
          />
        </div>
        <Controller
          control={control}
          name="shortDescription"
          render={({ field }) => (
            <Input
              label="Короткий опис"
              value={field.value}
              onChange={field.onChange}
              inputSize="sm"
              variant="admin"
              error={errors.shortDescription?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <Input
              label="URL зображення"
              value={field.value}
              onChange={field.onChange}
              inputSize="sm"
              variant="admin"
              type="text"
              error={errors.image?.message}
            />
          )}
        />

        <div className="mt-auto flex justify-end pt-1">
          <Button type="submit" variant="admin-accent" size="sm" isLoading={isSubmitting}>
            Зберегти
          </Button>
        </div>
      </div>
    </form>
  );
};
