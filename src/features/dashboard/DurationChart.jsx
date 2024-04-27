import {
  Cell,
  Legend,
  Tooltip,
  Pie,
  PieChart,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/DarkModeContext";
import Spinner from "../../ui/Spinner";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "200+ shares",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "400+ shares",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "800+ shares",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "1600+ shares",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "3200+ shares",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "6400+ shares",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "80000+ shares",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "100000+ shares",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "200+ shares",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "400+ shares",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "800+ shares",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "1600+ shares",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "3200+ shares",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "6400+ shares",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "80000+ shares",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "100000+ shares",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, stays) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr, field) {
    return arr.map((obj) => {
      return obj.duration !== field ? { ...obj, value: obj.value + 1 } : obj;
    });
  }

  const data = stays
    ?.reduce((arr, cur) => {
      const num = cur.numShare;
      if (num >= 100000) return incArrayValue(arr, "100000+ shares");
      if (num >= 80000) return incArrayValue(arr, "80000+ shares");
      if (num >= 6400) return incArrayValue(arr, "6400+ shares");
      if (num >= 3200) return incArrayValue(arr, "3200+ shares");
      if (num >= 1600) return incArrayValue(arr, "1600+ shares");
      if (num >= 800) return incArrayValue(arr, "800+ shares");
      if (num >= 400) return incArrayValue(arr, "400+ shares");
      if (num >= 200) return incArrayValue(arr, "200+ shares");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart({ confirmedStays, isloading2 }) {
  const { darkMode } = useDarkMode();
  const startData = darkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Shares Sold summary</Heading>
      {isloading2 ? (
        <Spinner />
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              nameKey="duration"
              dataKey="value"
              innerRadius={85}
              outerRadius={110}
              cx="40%"
              cy="50%"
              paddingAngle={3}
            >
              {data?.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.duration}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              width="30%"
              layout="vertical"
              iconSize={15}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartBox>
  );
}

export default DurationChart;
