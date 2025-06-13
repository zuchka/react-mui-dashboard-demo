import { useTheme } from "@mui/material/styles";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface GaugeChartProps {
  value: number;
  title?: string;
  height?: number;
  min?: number;
  max?: number;
  unit?: string;
  color?: string;
  sectors?: Array<{
    min: number;
    max: number;
    color: string;
    label?: string;
  }>;
}

export const GaugeChart = ({
  value,
  title,
  height = 300,
  min = 0,
  max = 100,
  unit = "",
  color,
  sectors,
}: GaugeChartProps) => {
  const theme = useTheme();

  const gaugeColor = color || theme.palette.primary.main;

  // Create default sectors if none provided
  const defaultSectors = [
    { min: 0, max: 30, color: theme.palette.success.main },
    { min: 30, max: 70, color: theme.palette.warning.main },
    { min: 70, max: 100, color: theme.palette.error.main },
  ];

  const gaugeSectors = sectors || defaultSectors;

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
    series: [
      {
        name: title || "Gauge",
        type: "gauge",
        center: ["50%", "60%"],
        radius: "80%",
        min,
        max,
        splitNumber: 10,
        axisLine: {
          lineStyle: {
            color: gaugeSectors.map((sector) => [
              (sector.max - min) / (max - min),
              sector.color,
            ]),
            width: 20,
            shadowColor: "rgba(0, 0, 0, 0.2)",
            shadowBlur: 10,
          },
        },
        pointer: {
          itemStyle: {
            color: theme.palette.text.primary,
            shadowColor: "rgba(0, 0, 0, 0.3)",
            shadowBlur: 5,
          },
          length: "70%",
          width: 6,
        },
        axisTick: {
          distance: -20,
          length: 8,
          lineStyle: {
            color: theme.palette.text.secondary,
            width: 2,
          },
        },
        splitLine: {
          distance: -20,
          length: 15,
          lineStyle: {
            color: theme.palette.text.secondary,
            width: 3,
          },
        },
        axisLabel: {
          color: theme.palette.text.secondary,
          fontSize: 12,
          distance: -40,
          formatter: (value: number) => {
            return Math.round(value).toString();
          },
        },
        detail: {
          valueAnimation: true,
          formatter: `{value}${unit}`,
          color: theme.palette.text.primary,
          fontSize: 20,
          fontWeight: "bold",
          offsetCenter: [0, "40%"],
        },
        data: [
          {
            value: value,
            name: title || "Value",
          },
        ],
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
