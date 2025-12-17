import { useState, useEffect, createContext } from "react";

export const AppContext = createContext();
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const ContextProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("");
  const getWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("City not found!!!");
      }
      const data = await res.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if(city){
        getWeather(city);
    }
    
  }, []);
  return <AppContext.Provider value ={{weather,loading,error,city,setCity,getWeather}}>{children}</AppContext.Provider>;
};
export default ContextProvider;
