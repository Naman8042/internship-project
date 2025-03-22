import { useState, useEffect } from "react";

interface Plant {
  name: string;
  wateringInterval: number; 
  sunlightHours: number; 
}

const plants: Plant[] = [
  { name: "Aloe Vera", wateringInterval: 10, sunlightHours: 20 },
  { name: "Snake Plant", wateringInterval: 15, sunlightHours: 25 },
  { name: "Peace Lily", wateringInterval: 8, sunlightHours: 12 },
];

const PlantReminder = () => {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  useEffect(() => {
    if (selectedPlant) {
      sendNotification(selectedPlant);
    }
  }, [selectedPlant]);

  const sendNotification = (plant: Plant) => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setTimeout(() => {
          new Notification(`Water your ${plant.name}! 💦`);
        }, plant.wateringInterval * 1000);

        setTimeout(() => {
          new Notification(`Move ${plant.name} to sunlight! ☀️`);
        }, plant.sunlightHours * 1000);
      }
    });
  };

  return (
   <div className="flex items-center justify-center h-screen">
     <div className="p-6 border rounded-lg shadow-md max-w-md ">
      <h2 className="text-xl font-bold mb-4">🌱 Plant Care Reminder</h2>*
      <select
        className="p-2 border rounded-md w-full"
        onChange={(e) =>
          setSelectedPlant(plants.find((p) => p.name === e.target.value) || null)
        }
      >
        <option value="">Select a Plant</option>
        {plants.map((plant) => (
          <option key={plant.name} value={plant.name}>
            {plant.name}
          </option>
        ))}
      </select>
      {selectedPlant && (
        <p className="mt-4 text-gray-700">
          Notifications set for {selectedPlant.name}!
        </p>
      )}
    </div>
   </div>
  );
};

export default PlantReminder;
