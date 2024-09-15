import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import "./styles/SentimentChart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SentimentChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSentimentData = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/sentiment");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching sentiment data", error);
      }
    };

    fetchSentimentData();
    const intervalId = setInterval(fetchSentimentData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Header />
      <div className="SentimentChart">
        <ResponsiveContainer width="85%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="average_sentiment"
              stroke="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default SentimentChart;
