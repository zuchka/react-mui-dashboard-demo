import { useTheme } from "@mui/material/styles";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface DonutChartDataPoint {
  name: string;
  value: number;
}

interface DonutChartProps {
  data: DonutChartDataPoint[];
  title?: string;
  height?: number;
  colors?: string[];
  innerRadius?: string;
  outerRadius?: string;
  showLabels?: boolean;
  centerText?: {
    title: string;
    subtitle?: string;
  };
}

export const DonutChart = ({
  data,
  title,
  height = 300,
  colors,
  innerRadius = "40%",
  outerRadius = "70%",
  showLabels = true,
  centerText,
}: DonutChartProps) => {
  const theme = useTheme();

  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

  const chartColors = colors || defaultColors;

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
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      top: "middle",
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 12,
      },
      itemGap: 10,
      icon: "circle",
    },
    color: chartColors,
    series: [
      {
        name: title || "Data",
        type: "pie",
        radius: [innerRadius, outerRadius],
        center: ["60%", "50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: theme.palette.background.default,
          borderWidth: 2,
        },
        label: {
          show: showLabels,
          position: "outside",
          color: theme.palette.text.secondary,
          fontSize: 12,
          formatter: "{b}: {d}%",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: "bold",
            color: theme.palette.text.primary,
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        labelLine: {
          show: showLabels,
          lineStyle: {
            color: theme.palette.text.secondary,
          },
        },
        data: data.map((item, index) => ({
          value: item.value,
          name: item.name,
          itemStyle: {
            color: chartColors[index % chartColors.length],
          },
        })),
      },
    ],
    graphic: centerText
      ? [
          {
            type: "text",
            left: "center",
            top: "center",
            style: {
              text: centerText.title,
              fontSize: 24,
              fontWeight: "bold",
              fill: theme.palette.text.primary,
              textAlign: "center",
            },
          },
          {
            type: "text",
            left: "center",
            top: "center",
            style: {
              text: centerText.subtitle || "",
              fontSize: 14,
              fill: theme.palette.text.secondary,
              textAlign: "center",
              y: 30,
            },
          },
        ]
      : undefined,
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, width: "100%" }}
      opts={{ renderer: "canvas" }}
    />
  );
};
