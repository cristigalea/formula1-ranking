export function toRakning(data: unknown[], isTeam: boolean) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((rd: any) =>
    isTeam
      ? {
          position: rd.position,
          teamName: rd.team.name,
          logo: rd.team.logo,
          points: rd.points,
        }
      : {
          position: rd.position,
          driverName: rd.driver.name,
          image: rd.driver.image,
          number: rd.driver.number,
          points: rd.points,
        }
  );
}
