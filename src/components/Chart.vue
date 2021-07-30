<template>
  <div>
    <highcharts
      :constructorType="'stockChart'"
      class="hc"
      :options="chartOptions"
      ref="chart"
    ></highcharts>
  </div>
</template>

<script>
export default {
  created() {
    this.loadData();
    console.log("fucasdddddd");

    console.log(this.$moment("1399/05/07 23:31:33", "jYYYY/jMM/jDD HH:mm:ss"));
    let date = this.$moment("1989/1/24", "YYYY/MM/DD")
      .locale("fa")
      .format("YYYY/MM/DD");
    console.log(date);
    const that = this;
    this.chartOptions = {
      title: {
        text: "AAPL Historical",
      },
      rangeSelector: {
        inputEnabled: false,
        // selected: 1
      },
      // plotOptions: {
      //   candlestick: {
      //     color: "red",
      //     upColor: "green",
      //   },
      // },
      // colors: [

      //   "#27ff00",
      //   "#0d233a",
      //   "#8bbc21",
      //   "#910000",
      //   "#1aadce",
      //   "#492970",
      //   "#f28f43",
      //   "#77a1e5",
      //   "#c42525",
      //   "#a6c96a",
      // ],
      navigator: {
        maskFill: "rgba(115, 113, 115, 0.2)",
        outlineColor: "rgba(190, 179, 9, 0.2)",
        outlineWidth: 2,
        // maskInside:false,
        series: {
          type: "areaspline",
          color: "#ff00af",
          fillOpacity: 0.4,
          dataGrouping: {
            smoothed: false,
          },
          lineWidth: 2,
          lineColor: "#072b44",
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1,
            },
            stops: [
              [0, "#0974be"],
              [1, "#89e0db"],
            ],
          },
          marker: {
            enabled: false,
          },
          shadow: true,
        },
        yAxis: {
          reversed: false,
        },
      },
      tooltip: {
        split: true,
        useHTML: true,

        formatter: function () {
          // console.log(this.points[0].series );
          // console.log(this.points[1].point );
          let high = this.points[0].point.high;
          let low = this.points[0].point.low;
          let open = this.points[0].point.open;
          let close = this.points[0].point.close;
          let toolTip1 = `<div><span>Open:</span><span>${open}</span></div>
          <div><span>Close:</span><span>${close}</span></div>
          <div><span>High:</span><span>${high}</span></div>
          <div><span>Low:</span><span>${low}</span></div>`;

          let toolTip2 = `<span style=font-size:0.9em>Volume:</span> <span style=font-size:0.9em>${this.points[1].point.y}</span>`;
          // let toolTip1 = `"Open:${open}\nClose:${close}\nHigh:${high}\nLow:${low}"`

          let unix = this.x;
          let dateEX = new Date(unix);
          let year = dateEX.getFullYear().toString();
          let month = (dateEX.getMonth() + 1).toString();
          let day = dateEX.getDate().toString();
          // console.log(year + "/" + month + "/" + day);

          let xAxisTooltip = that
            .$moment(year + "/" + month + "/" + day, "YYYY/MM/DD")
            .locale("fa")
            .format("YYYY/MM/DD");
          xAxisTooltip = `<span style=font-size:0.9em>${xAxisTooltip}</span>`;
          return [xAxisTooltip].concat(toolTip1, toolTip2);
        },
      },
      series: [
        {
          type: "candlestick",
          name: "AAPL",
          data: [],
          color: "red",
          upColor: "green",

          dataGrouping: {
            units: that.groupingUnits,
          },
        },
        {
          type: "column",
          name: "Volume",
          data: [],
          color: "#00a8ff",
          yAxis: 1,
          dataGrouping: {
            units: that.groupingUnits,
          },
        },
      ],
      yAxis: [
        {
          labels: {
            align: "right",
            x: -3,
          },
          title: {
            text: "OHLC",
          },
          height: "60%",
          lineWidth: 2,
          resize: {
            enabled: true,
          },
        },
        {
          labels: {
            align: "right",
            x: -3,
          },
          title: {
            text: "Volume",
          },
          top: "65%",
          height: "25%",
          offset: 0,
          lineWidth: 2,
        },
      ],
      xAxis: {
        // type: 'datetime',
        labels: {
          formatter: function () {
            // console.log(this.value);
            let unix = this.value;
            let dateEX = new Date(unix);
            let year = dateEX.getFullYear().toString();
            let month = (dateEX.getMonth() + 1).toString();
            let day = dateEX.getDate().toString();
            console.log(year + "/" + month + "/" + day);

            return that
              .$moment(year + "/" + month + "/" + day, "YYYY/MM/DD")
              .locale("fa")
              .format("YYYY/MM/DD");
            // return this.value
            // return this.$Highcharts.dateFormat('%YYYY %MM %dd', this.date);
          },
        },
      },
    };
  },
  data() {
    return {
      groupingUnits: [
        [
          "week", // unit name
          [1], // allowed multiples
        ],
        ["month", [1, 2, 3, 4, 6]],
      ],
      fullData: [],
      chartOptions: {},
    };
  },

  methods: {
    loadData2() {
      this.axios
        .get("https://finwise.ir/api/AdjustedPricesCodal/2")
        .then((reso) => {
          var data = reso.data;
          let ohlc = [];
          let volume = [];
          for (let i = 0; i < data.length; i += 1) {
            ohlc.push([
              data[i][0], // the date
              data[i][1], // open
              data[i][2], // high
              data[i][3], // low
              data[i][4], // close
            ]);
            volume.push([data[i][0], data[i][5]]);
          }
          this.chartOptions.series[0].data = ohlc;
          this.chartOptions.series[1].data = volume;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    loadData() {
      this.axios
        .get("https://demo-live-data.highcharts.com/aapl-ohlcv.json")
        .then((response) => {
          var data = response.data;
          // console.log(data);

          this.fullData = data;
          let chartData = [];
          let ohlc = [];
          let volume = [];
          for (let i = 0; i < data.length; i += 1) {
            ohlc.push([
              data[i][0], // the date
              data[i][1], // open
              data[i][2], // high
              data[i][3], // low
              data[i][4], // close
            ]);
            volume.push([data[i][0], data[i][5]]);
          }
          this.chartOptions.series[0].data = ohlc;
          this.chartOptions.series[1].data = volume;

          // for (let index = 0; index < data.length; index++) {
          //   chartData.push([data[index][0], data[index][5]]);
          // }
          // this.chartOptions.series[1].data = chartData;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
