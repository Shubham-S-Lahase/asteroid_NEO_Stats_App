export const parseAsteroidStats = (data) => {
    if (!data) return { fastestAsteroid: null, closestAsteroid: null, averageSize: 0 };
  
    let fastestAsteroid = null;
    let closestAsteroid = null;
    let totalSize = 0;
    let count = 0;
  
    // Iterate over each asteroid and calculate stats
    Object.values(data).flat().forEach(asteroid => {
      // Calculate the velocity of the asteroid
      const velocity = parseFloat(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour);
      if (!fastestAsteroid || velocity > fastestAsteroid.velocity) {
        fastestAsteroid = {
          name: asteroid.name,
          velocity,
          url: asteroid.nasa_jpl_url
        };
      }
  
      // Calculate the closest asteroid
      const distance = parseFloat(asteroid.close_approach_data[0].miss_distance.kilometers);
      if (!closestAsteroid || distance < closestAsteroid.distance) {
        closestAsteroid = {
          name: asteroid.name,
          distance,
          url: asteroid.nasa_jpl_url
        };
      }
  
      // Calculate the average size (diameter) of the asteroids
      const minSize = parseFloat(asteroid.estimated_diameter.kilometers.estimated_diameter_min);
      const maxSize = parseFloat(asteroid.estimated_diameter.kilometers.estimated_diameter_max);
      totalSize += (minSize + maxSize) / 2;
      count++;
    });
  
    // Calculate the average size of all asteroids
    const averageSize = count > 0 ? totalSize / count : 0;
  
    return {
      fastestAsteroid,
      closestAsteroid,
      averageSize,
    };
  };
  