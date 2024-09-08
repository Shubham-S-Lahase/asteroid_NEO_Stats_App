export const parseAsteroidStats = (data) => {
  if (!data)
    return { fastestAsteroid: null, closestAsteroid: null, averageSize: 0 };

  let fastestAsteroid = null;
  let closestAsteroid = null;
  let totalSize = 0;
  let count = 0;

  Object.values(data)
    .flat()
    .forEach((asteroid) => {
      // Calculate the velocity of the asteroid in km/h
      const velocityKmH = parseFloat(
        asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour
      );
      if (!fastestAsteroid || velocityKmH > fastestAsteroid.velocity.km_h) {
        fastestAsteroid = {
          id: asteroid.neo_reference_id,
          name: asteroid.name,
          velocity: { km_h: velocityKmH },
          url: asteroid.nasa_jpl_url,
        };
      }

      // Calculate the closest asteroid distance in kilometers
      const distanceKm = parseFloat(
        asteroid.close_approach_data[0].miss_distance.kilometers
      );
      if (!closestAsteroid || distanceKm < closestAsteroid.distance.km) {
        closestAsteroid = {
          id: asteroid.neo_reference_id,
          name: asteroid.name,
          distance: { km: distanceKm },
          url: asteroid.nasa_jpl_url,
        };
      }

      // Calculate the average size (diameter) of the asteroids in kilometers
      const minSizeKm = parseFloat(
        asteroid.estimated_diameter.kilometers.estimated_diameter_min
      );
      const maxSizeKm = parseFloat(
        asteroid.estimated_diameter.kilometers.estimated_diameter_max
      );
      totalSize += (minSizeKm + maxSizeKm) / 2;
      count++;
    });

  const averageSize = count > 0 ? totalSize / count : 0;

  return {
    fastestAsteroid,
    closestAsteroid,
    averageSize: averageSize + " km",
  };
};
