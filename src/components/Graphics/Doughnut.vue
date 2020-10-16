<script>
import { Doughnut } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default {
  extends: Doughnut,
  data() {
    return {
      a:[],
      options: {
        showScale: true,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "bottom",
          align: "center",
          fontSize: 14,
        },
        title: {
          display: true,
          text: "Reporte",
        },
        plugins: {
          datalabels: {
            formatter: (value, ctx) => {
              let sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
              let percentage = ((value * 100) / sum).toFixed(2) + "%";
              return percentage;
            },
            color: "black",
            textAlign: "center",
            font: {
              weight: "bold",
              size: 16,
            },
          },
        },
      },
    };
  },
  watch: {
      values() {
          this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: "GitHub Commits",
            backgroundColor: ["#96A6FF", "#E8B56B", "#FF8795", "#ACFFE3"],
            data: this.values,
          },
        ],
      },
      this.options
    );
      },
  },
  props: ["values","labels"],
  mounted() {
    console.log(this.values);

    this.renderChart(
      {
        labels: this.labels,
        datasets: [
          {
            label: "GitHub Commits",
            backgroundColor: ["#96A6FF", "#E8B56B", "#FF8795", "#ACFFE3"],
            data: this.values,
          },
        ],
      },
      this.options
    );
  },
};
</script>