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
        const token = localStorage.getItem("Token");

        const response = await axios.get(
          "http://ec2-13-38-78-41.eu-west-3.compute.amazonaws.com/api/sentiment",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error(
          "Error fetching sentiment data",
          error.response || error.message
        );
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
        <p className="sentiment-title">Sentiment Over Time</p>
        <p>This chart represents the sentiment scores detected over time.</p>
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
