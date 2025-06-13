import { useTheme } from "@mui/material/styles";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface PieChartDataPoint {
  name: string;
  value: number;
}

interface PieChartProps {
  data: PieChartDataPoint[];
  title?: string;
  height?: number;
  colors?: string[];
  radius?: string;
  showLabels?: boolean;
  showLegend?: boolean;
  roseType?: boolean;
}

export const PieChart = ({
  data,
  title,
  height = 300,
  colors,
  radius = "70%",
  showLabels = true,
  showLegend = true,
  roseType = false,
}: PieChartProps) => {
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
    legend: showLegend
      ? {
          orient: "vertical",
          left: "left",
          top: "middle",
          textStyle: {
            color: theme.palette.text.secondary,
            fontSize: 12,
          },
          itemGap: 10,
          icon: "circle",
        }
      : undefined,
    color: chartColors,
    series: [
      {
        name: title || "Data",
        type: "pie",
        radius: roseType ? ["20%", radius] : radius,
        center: showLegend ? ["60%", "50%"] : ["50%", "50%"],
        roseType: roseType ? "area" : false,
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
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, width: "100%" }}
      opts={{ renderer: "canvas" }}
    />
  );
};
