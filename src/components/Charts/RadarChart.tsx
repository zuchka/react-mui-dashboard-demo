import { useTheme } from "@mui/material/styles";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface RadarChartIndicator {
  name: string;
  max: number;
  min?: number;
}

interface RadarChartDataPoint {
  name: string;
  value: number[];
  color?: string;
}

interface RadarChartProps {
  indicators: RadarChartIndicator[];
  data: RadarChartDataPoint[];
  title?: string;
  height?: number;
  shape?: "polygon" | "circle";
  splitNumber?: number;
}

export const RadarChart = ({
  indicators,
  data,
  title,
  height = 300,
  shape = "polygon",
  splitNumber = 5,
}: RadarChartProps) => {
  const theme = useTheme();

  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

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
    },
    legend: {
      top: title ? 60 : 20,
      left: "center",
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 12,
      },
      icon: "circle",
    },
    radar: {
      center: ["50%", "60%"],
      radius: "70%",
      shape,
      splitNumber,
      axisName: {
        color: theme.palette.text.secondary,
        fontSize: 12,
        fontWeight: "500",
      },
      splitLine: {
        lineStyle: {
          color: theme.palette.divider,
          opacity: 0.5,
        },
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(250, 250, 250, 0.1)", "rgba(200, 200, 200, 0.1)"],
        },
      },
      axisLine: {
        lineStyle: {
          color: theme.palette.divider,
        },
      },
      indicator: indicators.map((indicator) => ({
        name: indicator.name,
        max: indicator.max,
        min: indicator.min || 0,
      })),
    },
    series: [
      {
        name: title || "Radar",
        type: "radar",
        emphasis: {
          lineStyle: {
            width: 4,
          },
        },
        data: data.map((item, index) => ({
          name: item.name,
          value: item.value,
          lineStyle: {
            color: item.color || defaultColors[index % defaultColors.length],
            width: 3,
          },
          areaStyle: {
            color:
              (item.color || defaultColors[index % defaultColors.length]) +
              "30", // 30% opacity
          },
          itemStyle: {
            color: item.color || defaultColors[index % defaultColors.length],
          },
          symbol: "circle",
          symbolSize: 6,
        })),
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
