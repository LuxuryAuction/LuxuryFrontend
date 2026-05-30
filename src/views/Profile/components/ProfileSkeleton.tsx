import { PROFILE_HOME_MAX_FAVOURITES } from "../profileHome/profileHome.types";

const Bone = ({ className = "" }: { className?: string }) => (
  <div className={`rounded bg-surface-tertiary/50 ${className}`} />
);

const AccentBar = () => (
  <div
    className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-brand-primary/40 via-[#e87c00]/30 to-transparent"
    aria-hidden
  />
);

function ProfileHeaderSkeleton() {
  return (
    <div className="relative bg-auth-app border border-border-primary rounded-lg px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 flex flex-col lg:flex-row items-stretch lg:items-center gap-4 sm:gap-6 lg:gap-8 mb-6 overflow-hidden">
      <AccentBar />

      <div className="flex flex-row items-start gap-3 sm:gap-4 md:gap-6 flex-1 min-w-0 w-full">
        <Bone className="w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] rounded-full shrink-0" />
        <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
          <Bone className="h-5 sm:h-6 md:h-7 w-[55%] max-w-[220px]" />
          <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-2">
            <Bone className="h-3 w-24" />
            <Bone className="h-3 w-36 hidden sm:block" />
          </div>
          <Bone className="h-7 w-full max-w-[280px] rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full lg:w-auto lg:flex lg:items-center lg:justify-end lg:gap-10 xl:gap-12 pt-4 sm:pt-5 lg:pt-0 border-t lg:border-t-0 border-border-primary/50 lg:ml-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 px-1">
            <Bone className="h-6 md:h-7 w-10" />
            <Bone className="h-2.5 w-14 sm:w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MainTabsSkeleton() {
  return (
    <div className="flex border-b border-border-primary overflow-x-auto mb-5" aria-hidden>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="px-5 py-[0.7rem] shrink-0">
          <Bone className={`h-4 ${i === 0 ? "w-28" : "w-20"}`} />
        </div>
      ))}
    </div>
  );
}

function ProfileHomeIntroSkeleton() {
  return (
    <div className="border-b border-border-primary px-5 py-5 md:px-6 md:py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Bone className="h-px w-6 rounded-none" />
            <Bone className="h-2.5 w-24" />
          </div>
          <Bone className="h-7 sm:h-8 w-[85%] max-w-md" />
          <Bone className="h-3.5 w-full max-w-xl" />
          <Bone className="h-3.5 w-[70%] max-w-sm" />
        </div>
        <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end sm:pt-1">
          <Bone className="h-2.5 w-20" />
          <Bone className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
}

function CollectionProgressSkeleton() {
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-5 md:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shrink-0">
          <Bone className="h-[120px] w-[120px] rounded-full shrink-0" />
          <Bone className="h-12 w-[180px] max-w-full hidden sm:block" />
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-5">
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-border-primary/60 p-3">
            <Bone className="h-12 w-12 rounded-2xl shrink-0" />
            <div className="flex-1 space-y-2">
              <Bone className="h-2 w-20" />
              <Bone className="h-3.5 w-3/4 max-w-[200px]" />
              <Bone className="h-3 w-full max-w-[260px]" />
            </div>
          </div>

          <div>
            <Bone className="h-2.5 w-28 mb-3" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border-primary/60 bg-surface-secondary/30 px-3 py-2.5 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Bone className="h-2.5 w-14" />
                    <Bone className="h-2.5 w-8" />
                  </div>
                  <Bone className="h-1 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BadgeShowcaseSkeleton() {
  return (
    <div className="bg-surface-secondary/20 px-5 py-5 md:px-6 md:py-6 sm:border-t sm:border-border-primary">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
        <div className="space-y-2">
          <Bone className="h-4 w-32" />
          <Bone className="h-3 w-48 max-w-full" />
        </div>
        <Bone className="h-3 w-24 hidden sm:block" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: PROFILE_HOME_MAX_FAVOURITES }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center rounded-xl border border-border-primary/60 bg-auth-app/50 pt-5 pb-4 px-3"
          >
            <Bone className="h-14 w-14 rounded-2xl mb-3" />
            <Bone className="h-3 w-[80%] mb-2" />
            <Bone className="h-2 w-12" />
            <Bone className="h-px w-8 mt-3" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileHomePanelsSkeleton() {
  return (
    <>
      <div className="flex overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:block sm:overflow-visible">
        <div className="w-full shrink-0 snap-center sm:w-auto">
          <CollectionProgressSkeleton />
        </div>
        <div className="w-full shrink-0 snap-center sm:w-auto">
          <BadgeShowcaseSkeleton />
        </div>
      </div>

      <div className="flex justify-center gap-1.5 pb-4 sm:hidden" aria-hidden>
        <Bone className="h-1.5 w-4 rounded-full" />
        <Bone className="h-1.5 w-1.5 rounded-full" />
      </div>
    </>
  );
}

function BadgeFilterTabsSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-2" aria-hidden>
      {Array.from({ length: 3 }).map((_, i) => (
        <Bone key={i} className={`h-8 rounded-full ${i === 0 ? "w-24" : "w-28"}`} />
      ))}
    </div>
  );
}

function BadgeTileSkeleton() {
  return (
    <div className="flex flex-col rounded-xl border border-border-primary/60 bg-auth-app/50 p-4">
      <Bone className="h-14 w-14 rounded-2xl mb-3" />
      <Bone className="h-2.5 w-16 mb-2" />
      <Bone className="h-4 w-[90%] mb-2" />
      <Bone className="h-3 w-full" />
      <Bone className="h-3 w-4/5 mt-1" />
    </div>
  );
}

function ProfileHomeSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <section className="relative overflow-hidden rounded-lg border border-border-primary bg-auth-app">
        <AccentBar />
        <ProfileHomeIntroSkeleton />
        <ProfileHomePanelsSkeleton />
      </section>

      <BadgeFilterTabsSkeleton />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <BadgeTileSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export const ProfileSkeleton = () => (
  <div
    className="p-5 md:p-7 max-w-7xl mx-auto animate-pulse"
    aria-busy="true"
    aria-label="Loading profile"
  >
    <ProfileHeaderSkeleton />
    <MainTabsSkeleton />
    <ProfileHomeSkeleton />
  </div>
);
