import StartUpCard, { StartupTypeCard } from "./StartUpCard";

const EditorsPick = async ({ post: editorsPick }: { post: StartupTypeCard[] }) => {
  return (
    <>
      {editorsPick && editorsPick.length > 0 && (
        <div className="max-2-4xl mx-auto">
          <p className="text-30-semibold">Editor Picks</p>
          <ul className="mt-7 card_grid-sm">
            {editorsPick.map((e, index) => (
              <StartUpCard key={index} post={e as unknown as StartupTypeCard} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default EditorsPick;
