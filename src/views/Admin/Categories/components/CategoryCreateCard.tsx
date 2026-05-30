"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GridIcon } from "@/public/assets/icons";
import Button from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { useToast } from "@/src/components/ui/Toast";
import { CategoryCreateSchema, categoryCreateSchema } from "@/src/schemas/category.schema";
import { categoryService } from "@/src/services/CategoriesService";
import type { ICategoryCreatePayload } from "@/src/services/CategoriesService/types";
import { CATEGORY_CREATE_DEFAULT_VALUES } from "../types";

type CategoryCreateCardProps = {
  onCreated: () => void;
};

export const CategoryCreateCard = ({ onCreated }: CategoryCreateCardProps) => {
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
  } = useForm<CategoryCreateSchema>({
    resolver: zodResolver(categoryCreateSchema),
    defaultValues: CATEGORY_CREATE_DEFAULT_VALUES,
  });

  const selectedImage = watch("image");

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const handleCreate = async (data: CategoryCreateSchema) => {
    const payload: ICategoryCreatePayload = {
      id: 0,
      slug: data.slug.trim(),
      name: data.name.trim(),
      shortDescription: data.shortDescription.trim(),
      image: data.image,
      postingPrice: Number(data.postingPrice),
    };

    try {
      await categoryService.createCategory(payload);
      reset(CATEGORY_CREATE_DEFAULT_VALUES);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onCreated();
      showToast("success", "Категорію створено");
    } catch {
      showToast("error", "Не вдалося створити категорію");
    }
  };

  return (
    <form
      className="mb-8 rounded-2xl border border-admin-accent/20 bg-admin-accent/5 p-5 shadow-black/20 md:p-6"
      onSubmit={handleSubmit(handleCreate)}
      noValidate
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-admin-accent/80">
            New category
          </p>
          <h2 className="mt-1 text-lg font-bold text-white">Створити категорію</h2>
          <p className="mt-1 text-sm text-white/50">
            Додайте slug, опис, фото та ціну публікації. Нові категорії створюються активними.
          </p>
        </div>
        <Button type="submit" variant="admin-accent" size="sm" isLoading={isSubmitting}>
          Створити
        </Button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
        <div className="flex flex-col gap-3">
          <div className="relative h-36 overflow-hidden rounded-xl border border-white/10 bg-surface-secondary md:h-40">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="Превʼю категорії" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-white/25">
                <GridIcon className="h-10 w-10" />
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setValue("image", file as File, { shouldValidate: true });
            }}
          />

          <Button
            type="button"
            variant="admin"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedImage ? "Інше зображення" : "Обрати зображення"}
          </Button>

          {selectedImage && (
            <Button
              type="button"
              variant="admin-danger"
              onClick={() => {
                setValue("image", undefined as unknown as File, { shouldValidate: true });
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }
              }}
            >
              Скасувати вибір
            </Button>
          )}

          {errors.image?.message && (
            <p className="text-xs text-rose-400">{errors.image.message}</p>
          )}
        </div>

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
            name="slug"
            render={({ field }) => (
              <Input
                label="Slug"
                value={field.value}
                onChange={field.onChange}
                inputSize="sm"
                variant="admin"
                placeholder="luxury-watches"
                error={errors.slug?.message}
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
          <div className="sm:col-span-2">
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
                  type="textarea"
                  rows={3}
                  error={errors.shortDescription?.message}
                />
              )}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
