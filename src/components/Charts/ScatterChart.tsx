import { useTheme } from "@mui/material/styles";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface ScatterChartDataPoint {
  x: number;
  y: number;
  size?: number;
  name?: string;
}

interface ScatterChartSeries {
  name: string;
  data: ScatterChartDataPoint[];
  color?: string;
  symbolSize?: number | ((value: any) => number);
}

interface ScatterChartProps {
  series: ScatterChartSeries[];
  title?: string;
  height?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  showBrush?: boolean;
}

export const ScatterChart = ({
  series,
  title,
  height = 300,
  xAxisLabel,
  yAxisLabel,
  showBrush = false,
}: ScatterChartProps) => {
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
          left: 0,
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
        const { seriesName, data, marker } = params;
        const [x, y] = data;
        return `${marker} ${seriesName}<br/>X: ${x}<br/>Y: ${y}`;
      },
    },
    legend: {
      top: title ? 40 : 10,
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 12,
      },
      icon: "circle",
    },
    grid: {
      left: "10%",
      right: "5%",
      bottom: "15%",
      top: title ? "80px" : "60px",
      containLabel: true,
      backgroundColor: "transparent",
    },
    xAxis: {
      type: "value",
      name: xAxisLabel,
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
    brush: showBrush
      ? {
          toolbox: ["rect", "polygon", "clear"],
          xAxisIndex: 0,
        }
      : undefined,
    series: series.map((seriesItem, index) => {
      const seriesColor =
        seriesItem.color || defaultColors[index % defaultColors.length];

      return {
        name: seriesItem.name,
        type: "scatter",
        symbolSize:
          seriesItem.symbolSize ||
          ((value: any, params: any) => {
            // Use size from data point if available, otherwise default to 8
            const dataPoint = seriesItem.data[params.dataIndex];
            return dataPoint?.size || 8;
          }),
        itemStyle: {
          color: seriesColor,
          opacity: 0.8,
        },
        emphasis: {
          itemStyle: {
            opacity: 1,
            shadowBlur: 10,
            shadowColor: seriesColor,
          },
        },
        data: seriesItem.data.map((point) => [
          point.x,
          point.y,
          point.size || 8,
        ]),
      };
    }),
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px`, width: "100%" }}
      opts={{ renderer: "canvas" }}
    />
  );
};
