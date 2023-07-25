import DataGrid from "./DataGrid";
import Header from "./Header";
import { useState } from "react";
import Toggle from "./Toggle";
import SeasonButton from "./SeasonButton";
import useSWR from "swr";
import { fetchRanking, fetchSeasons } from "./data/fetchers";
import { toRakning } from "./data/mapper";

function App() {
  const [season, setSeason] = useState<number>(new Date().getFullYear());
  const [isTeamsActive, setIsTeamsActive] = useState<boolean>(false);

  const columns = isTeamsActive
    ? ["Position", "Team Name", "image:Logo", "Points"]
    : ["Position", "Driver Name", "image:Image", "Number", "Points"];

  const {
    data: seasonsData,
    error: seasonsError,
    isLoading: seasonsIsLoading,
  } = useSWR("seasons", fetchSeasons);
  const seasons: number[] = seasonsData?.response || [];

  const {
    data: rankingData,
    error: rankingError,
    isLoading: rankingIsLoading,
  } = useSWR(["ranking", season, isTeamsActive], () =>
    fetchRanking(isTeamsActive, season)
  );
  const ranking = toRakning(rankingData?.response || [], isTeamsActive).sort(
    (a, b) => a.position - b.position
  );

  const globalLoading = seasonsIsLoading || rankingIsLoading;
  const globalError = seasonsError || rankingError;

  console.log(ranking);
  return (
    <div className="min-h-screen bg-zinc-200">
      <Header />
      <div className="container mx-auto mt-10 pb-10">
        <h3 className="text-3xl mb-5">Seasons</h3>
        <div className="flex w-full gap-5">
          {seasons.length > 0 ? (
            seasons.map((item) => (
              <SeasonButton
                key={item}
                isActive={item === season}
                onClick={() => setSeason(item)}
              >
                {item}
              </SeasonButton>
            ))
          ) : (
            <p>No Data</p>
          )}
        </div>
        <div className="flex justify-between mt-10 mb-5">
          <h2 className="text-4xl">Rankings</h2>
          <div className="flex items-center gap-2">
            <span>Teams</span>
            <Toggle
              isActive={isTeamsActive}
              onClick={() => setIsTeamsActive((current) => !current)}
            />
          </div>
        </div>
        {ranking.length > 0 ? (
          <DataGrid columns={columns} data={ranking} />
        ) : (
          <p>No Data</p>
        )}

        {globalLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center backdrop-brightness-50">
            <span className="text-white text-4xl w-1/2 text-center">
              Loading...
            </span>
          </div>
        )}
        {globalError && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-rose-300/50">
            <span className="text-rose-500 text-4xl w-1/2 text-center">
              Error
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
