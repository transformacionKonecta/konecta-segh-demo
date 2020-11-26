<template>
  <div >
    <canvas ref="myChart" :width="size[0]" :height="size[1]"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  props: ['value', 'title', 'labels', 'size', 'value2', 'title2', 'value3', 'title3'],
  data() {
    return {
      data: [],
    };
  },
  watch: {
    value() {
      if (this.value.length > 0) {
      // eslint-disable-next-line no-new
        new Chart(this.$refs.myChart, {
          type: 'line',
          data: {
            labels: this.labels,
            datasets: [
              {
                label: this.title,
                data: this.value,
                borderColor: 'green',
              },
              // {
              //   label: `Promedio: ${this.value.reduce((a, c) => a + c) / 6}`,
              //   borderColor: 'blue',
              //   data: (this.value).map(() => this.value.reduce((a, c) => a + c) / 6),
              //   type: 'line',
              //   // this dataset is drawn on top
              //   order: 3,
              // },
               {
              label: this.title2,
              borderColor: 'red',
              data: this.value2,
              type: 'line',
              // this dataset is drawn on top
              order: 2,
            },
            {
              label: this.title3,
              borderColor: 'black',
              data: this.value3,
              type: 'line',
              // this dataset is drawn on top
              order: 3,
            },
            ],
          },
        });
      }
    },
  },
  mounted() {
    // eslint-disable-next-line no-new
    if (this.value.length > 0) {
      // eslint-disable-next-line no-new
      new Chart(this.$refs.myChart, {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.title,
              data: this.value,
              borderColor: 'green',
            },
            // {
            //   label: `Promedio: ${this.value.reduce((a, c) => a + c) / 6}`,
            //   borderColor: 'blue',
            //   data: (this.value).map(() => this.value.reduce((a, c) => a + c) / 6),
            //   type: 'line',
            //   // this dataset is drawn on top
            //   order: 3,
            // },
            {
              label: this.title2,
              borderColor: 'red',
              data: this.value2,
              type: 'line',
              // this dataset is drawn on top
              order: 2,
            },
            {
              label: this.title3,
              borderColor: 'black',
              data: this.value3,
              type: 'line',
              // this dataset is drawn on top
              order: 3,
            },
          ],
        },
      });
    }
  },
};
</script>
