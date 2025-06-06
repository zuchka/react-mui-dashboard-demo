import { useTheme } from "@mui/material/styles";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface TimeSeriesDataPoint {
  date: string;
  value: number;
}

interface TimeSeriesChartProps {
  data: TimeSeriesDataPoint[];
  title?: string;
  height?: number;
  color?: string;
  showArea?: boolean;
  yAxisLabel?: string;
}

export const TimeSeriesChart = ({
  data,
  title,
  height = 300,
  color,
  showArea = true,
  yAxisLabel,
}: TimeSeriesChartProps) => {
  const theme = useTheme();

  const chartColor = color || theme.palette.primary.main;

  const option: EChartsOption = {
    title: title
      ? {
          text: title,
          textStyle: {
            color: theme.palette.text.primary,
            fontSize: 16,
            fontWeight: 600,
            fontFamily: theme.typography.h6.fontFamily,
          },
          left: 0,
        }
      : undefined,
    tooltip: {
      trigger: "axis",
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      textStyle: {
        color: theme.palette.text.primary,
      },
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: theme.palette.text.secondary,
        },
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: data.length > 8 ? "15%" : "10%",
      top: "15%",
      containLabel: true,
      backgroundColor: "transparent",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map((item) => item.date),
      axisLine: {
        lineStyle: {
          color: theme.palette.divider,
        },
      },
      axisLabel: {
        color: theme.palette.text.secondary,
        fontSize: 11,
        interval: data.length > 8 ? 1 : 0, // Skip labels if too many data points
        rotate: data.length > 8 ? 45 : 0, // Rotate labels if many data points
        margin: 8,
        overflow: "truncate",
      },
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      name: yAxisLabel,
      nameTextStyle: {
        color: theme.palette.text.secondary,
        fontSize: 12,
      },
      axisLine: {
        lineStyle: {
          color: theme.palette.divider,
        },
      },
      axisLabel: {
        color: theme.palette.text.secondary,
        fontSize: 12,
      },
      splitLine: {
        lineStyle: {
          color: theme.palette.divider,
          opacity: 0.3,
        },
      },
    },
    series: [
      {
        name: title || "Value",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: {
          color: chartColor,
          width: 3,
        },
        itemStyle: {
          color: chartColor,
        },
        areaStyle: showArea
          ? {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: chartColor + "60", // 60% opacity
                  },
                  {
                    offset: 1,
                    color: chartColor + "10", // 10% opacity
                  },
                ],
              },
            }
          : undefined,
        data: data.map((item) => item.value),
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, width: "100%" }}
      opts={{ renderer: "canvas" }}
    />
  );
};
