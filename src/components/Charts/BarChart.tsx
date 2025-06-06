import { useTheme } from "@mui/material/styles";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface BarChartDataPoint {
  name: string;
  value: number;
}

interface BarChartProps {
  data: BarChartDataPoint[];
  title?: string;
  height?: number;
  colors?: string[];
  horizontal?: boolean;
  yAxisLabel?: string;
  xAxisLabel?: string;
}

export const BarChart = ({
  data,
  title,
  height = 300,
  colors,
  horizontal = false,
  yAxisLabel,
  xAxisLabel,
}: BarChartProps) => {
  const theme = useTheme();

  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
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
        type: "shadow",
      },
    },
    grid: {
      left: horizontal ? "8%" : "5%",
      right: "5%",
      bottom: horizontal ? "10%" : data.length > 4 ? "20%" : "15%",
      top: "15%",
      containLabel: true,
      backgroundColor: "transparent",
    },
    xAxis: {
      type: horizontal ? "value" : "category",
      data: horizontal ? undefined : data.map((item) => item.name),
      name: horizontal ? xAxisLabel : undefined,
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
        fontSize: 11,
        interval: horizontal ? 0 : data.length > 6 ? 1 : 0,
        rotate: horizontal ? 0 : data.length > 4 ? 45 : 0,
        margin: 8,
        overflow: "truncate",
        width: horizontal ? undefined : 80,
      },
      splitLine: {
        show: horizontal,
        lineStyle: {
          color: theme.palette.divider,
          opacity: 0.3,
        },
      },
    },
    yAxis: {
      type: horizontal ? "category" : "value",
      data: horizontal ? data.map((item) => item.name) : undefined,
      name: horizontal ? undefined : yAxisLabel,
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
        fontSize: 11,
        margin: 8,
        overflow: "truncate",
        width: horizontal ? 100 : undefined,
      },
      splitLine: {
        show: !horizontal,
        lineStyle: {
          color: theme.palette.divider,
          opacity: 0.3,
        },
      },
    },
    series: [
      {
        name: title || "Value",
        type: "bar",
        data: data.map((item, index) => ({
          value: item.value,
          itemStyle: {
            color: chartColors[index % chartColors.length],
          },
        })),
        barWidth: "60%",
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
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
