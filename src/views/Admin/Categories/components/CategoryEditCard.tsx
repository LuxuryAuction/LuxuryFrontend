"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CategoryEditSchema>({
    resolver: zodResolver(categoryEditSchema),
    defaultValues: getCategoryEditDefaultValues(category),
  });

  const selectedImage = watch("image");

  useEffect(() => {
    reset(getCategoryEditDefaultValues(category));
    setPreviewUrl(null);
  }, [category, reset]);

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const handleSave = async (data: CategoryEditSchema) => {
    const payload: ICategoryUpdatePayload = {
      name: data.name,
      shortDescription: data.shortDescription,
      postingPrice: Number(data.postingPrice),
      image: data.image,
    };

    try {
      await categoryService.updateCategory(category.id, payload);
      onUpdated();
      showToast("success", "Категорію збережено");
    } catch {
      showToast("error", "Не вдалося зберегти");
    }
  };

  const displayImage = previewUrl ?? category.image;

  return (
    <form
      className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/3 p-5 md:flex-row md:gap-6 md:p-6"
      onSubmit={handleSubmit(handleSave)}
      noValidate
    >
      <div className="flex flex-col gap-3 md:w-40 md:shrink-0">
        <div className="relative mx-auto h-36 w-full overflow-hidden rounded-xl border border-white/10 bg-surface-secondary md:mx-0 md:h-40 md:w-40">
          {displayImage ? (
            previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={displayImage} alt={category.name} className="h-full w-full object-cover" />
            ) : (
              <Image src={displayImage} alt={category.name} fill className="object-cover" sizes="160px" unoptimized />
            )
          ) : (
            <div className="flex h-full items-center justify-center text-white/25">
              <GridIcon className="h-10 w-10" />
            </div>
          )}
          <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-0.5 font-mono text-[10px] text-white/80">
            ID {category.id}
          </span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setValue("image", file, { shouldValidate: true });
          }}
        />

        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="admin"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedImage ? "Інше зображення" : "Змінити зображення"}
          </Button>
          {selectedImage && (
            <Button
              type="button"
              variant="admin-danger"
              onClick={() => {
                setValue("image", undefined);
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              Скасувати вибір
            </Button>
          )}
        </div>
        {errors.image?.message && (
          <p className="text-xs text-rose-400">{errors.image.message}</p>
        )}
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

        <div className="mt-auto flex justify-end pt-1">
          <Button type="submit" variant="admin-accent" size="sm" isLoading={isSubmitting}>
            Зберегти
          </Button>
        </div>
      </div>
    </form>
  );
};
