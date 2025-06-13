import { useTheme } from "@mui/material/styles";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface HeatmapDataPoint {
  x: number;
  y: number;
  value: number;
}

interface HeatmapChartProps {
  data: HeatmapDataPoint[];
  xAxisData: string[];
  yAxisData: string[];
  title?: string;
  height?: number;
  colorRange?: [string, string];
  min?: number;
  max?: number;
}

export const HeatmapChart = ({
  data,
  xAxisData,
  yAxisData,
  title,
  height = 300,
  colorRange,
  min,
  max,
}: HeatmapChartProps) => {
  const theme = useTheme();

  // Calculate min/max if not provided
  const values = data.map((item) => item.value);
  const dataMin = min !== undefined ? min : Math.min(...values);
  const dataMax = max !== undefined ? max : Math.max(...values);

  const defaultColorRange: [string, string] = [
    theme.palette.primary.light,
    theme.palette.primary.dark,
  ];

  const chartColorRange = colorRange || defaultColorRange;

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
          left: "center",
          top: 20,
        }
      : undefined,
    tooltip: {
      trigger: "item",
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      textStyle: {
        color: theme.palette.text.primary,
      },
      formatter: (params: any) => {
        const { data } = params;
        const [x, y, value] = data;
        return `${xAxisData[x]} - ${yAxisData[y]}<br/>Value: ${value}`;
      },
    },
    grid: {
      left: "15%",
      right: "10%",
      bottom: "15%",
      top: title ? "80px" : "40px",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: theme.palette.divider,
        },
      },
      axisLabel: {
        color: theme.palette.text.secondary,
        fontSize: 11,
        rotate: xAxisData.length > 8 ? 45 : 0,
        margin: 8,
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(250, 250, 250, 0.05)", "rgba(200, 200, 200, 0.05)"],
        },
      },
    },
    yAxis: {
      type: "category",
      data: yAxisData,
      axisLine: {
        lineStyle: {
          color: theme.palette.divider,
        },
      },
      axisLabel: {
        color: theme.palette.text.secondary,
        fontSize: 11,
        margin: 8,
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(250, 250, 250, 0.05)", "rgba(200, 200, 200, 0.05)"],
        },
      },
    },
    visualMap: {
      min: dataMin,
      max: dataMax,
      calculable: true,
      orient: "vertical",
      left: "right",
      top: "center",
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 11,
      },
      inRange: {
        color: chartColorRange,
      },
    },
    series: [
      {
        name: title || "Heatmap",
        type: "heatmap",
        data: data.map((item) => [item.x, item.y, item.value]),
        label: {
          show: data.length < 50, // Only show labels if not too many data points
          color: theme.palette.text.primary,
          fontSize: 10,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
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
