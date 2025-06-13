import { useTheme } from "@mui/material/styles";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface AreaChartDataPoint {
  date: string;
  value: number;
}

interface AreaChartSeries {
  name: string;
  data: AreaChartDataPoint[];
  color?: string;
}

interface AreaChartProps {
  series: AreaChartSeries[];
  title?: string;
  height?: number;
  yAxisLabel?: string;
  stacked?: boolean;
  smooth?: boolean;
}

export const AreaChart = ({
  series,
  title,
  height = 300,
  yAxisLabel,
  stacked = false,
  smooth = true,
}: AreaChartProps) => {
  const theme = useTheme();

  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    theme.palette.info.main,
  ];

  // Get all unique dates for the x-axis
  const allDates = [
    ...new Set(series.flatMap((s) => s.data.map((d) => d.date))),
  ].sort();

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
    legend: {
      top: title ? 40 : 10,
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 12,
      },
      icon: "rect",
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: allDates.length > 8 ? "15%" : "10%",
      top: title ? "80px" : "60px",
      containLabel: true,
      backgroundColor: "transparent",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: allDates,
      axisLine: {
        lineStyle: {
          color: theme.palette.divider,
        },
      },
      axisLabel: {
        color: theme.palette.text.secondary,
        fontSize: 11,
        interval: allDates.length > 8 ? 1 : 0,
        rotate: allDates.length > 8 ? 45 : 0,
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
    series: series.map((seriesItem, index) => {
      const seriesColor =
        seriesItem.color || defaultColors[index % defaultColors.length];

      // Create data array matching all dates, filling missing values with null
      const seriesData = allDates.map((date) => {
        const dataPoint = seriesItem.data.find((d) => d.date === date);
        return dataPoint ? dataPoint.value : null;
      });

      return {
        name: seriesItem.name,
        type: "line",
        stack: stacked ? "Total" : undefined,
        smooth,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: {
          color: seriesColor,
          width: 3,
        },
        itemStyle: {
          color: seriesColor,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: seriesColor + "60", // 60% opacity
              },
              {
                offset: 1,
                color: seriesColor + "10", // 10% opacity
              },
            ],
          },
        },
        data: seriesData,
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
