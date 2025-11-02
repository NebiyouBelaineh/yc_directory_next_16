import StartupCardSkeleton from "./StartupCardSkeleton";

const StartupGridSkeleton = () => {
  return (
    <section>
      {/* Skeleton grid mimicking your startup cards */}
      <ul className="mt-7 card_grid">
        {[...Array(12)].map((_, i) => (
          <StartupCardSkeleton key={i} />
        ))}
      </ul>
    </section>
  );
};

export default StartupGridSkeleton;
