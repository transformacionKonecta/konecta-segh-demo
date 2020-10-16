<script>
import { Line, mixins } from "vue-chartjs";

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
      type: Array | Object,
      required: false,
    },
    chartLabels: {
      type: Array,
      required: true,
    },
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.render();
      },
    },
      chartLabels: {
      deep: true,
      handler() {
      this.render();
      },
    },
  },
  data(){
    return {
      options: {
        showScale: true,
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'FILTRA POR:',
        },
        tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
      }
    }
  },
  created() {
    this.render();
  },
  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
     
    this.render();
/*     this.gradient.addColorStop(0, "rgba(52, 217, 221, 0.6)");
    this.gradient.addColorStop(0.5, "rgba(52, 217, 221, 0.25)");
    this.gradient.addColorStop(1, "rgba(52, 217, 221, 0)"); */
  },
  methods : {
    render() {
      this.renderChart(
      {
        labels: this.chartLabels,
        datasets: [
            {
            label: "PROGRAMADOS",
            borderColor: "#01b1ca",
            backgroundColor: "#01b1ca",
            pointBorderColor: "#01b1ca",
            pointHoverBorderColor: "#249EBF",
            pointHoverBackgroundColor: "#01b1ca",
            pointHoverRadius: 4,
            pointHitRadius: 10,
            pointRadius: 2,
            pointHoverBorderWidth: 1,
            borderDash: [1, 1],
            fill: true,
            borderWidth: 1,
 /*            backgroundColor: this.gradient, */
            data: this.chartData.totals,
          },
          {
            label: "APTOS",
            borderColor: "#6DD400",
            backgroundColor: "#6DD400",
            pointBorderColor: "#6DD400",
            pointHoverBorderColor: "#249EBF",
            pointHoverBackgroundColor: "#6DD400",
            pointHoverRadius: 4,
            pointHitRadius: 10,
            pointRadius: 2,
            pointHoverBorderWidth: 1,
            fill: true,
            borderWidth: 1,
 /*            backgroundColor: this.gradient, */
            data: this.chartData.aptos,
          },
          {
            label: "NO APTOS",
            borderColor: "#ff0037",
            backgroundColor: "#ff0037",
            pointBorderColor: "#ff0037",
            pointHoverBorderColor: "#249EBF",
            pointHoverBackgroundColor: "#ff0037",
            pointHoverRadius: 4,
            pointHitRadius: 10,
            pointRadius: 2,
            pointHoverBorderWidth: 1,
            fill: false,
            borderWidth: 1,
  /*           backgroundColor: this.gradient, */
            data: this.chartData.noAptos,
          },
          {
            label: "REC.PROPUESTA",
            borderColor: "#FFD100",
            backgroundColor: "#FFD100",
            pointBorderColor: "#FFD100",
            pointHoverBorderColor: "#249EBF",
            pointHoverBackgroundColor: "#FFD100",
            pointHoverRadius: 4,
            pointHitRadius: 10,
            pointRadius: 2,
            pointHoverBorderWidth: 1,
            fill: false,
            borderWidth: 1,
 /*            backgroundColor: this.gradient, */
            data: this.chartData.recPropuesta,
          },
          {
            label: "AUSENTE",
            borderColor: "#909190",
            backgroundColor: "#909190",
            pointBorderColor: "#909190",
            pointHoverBorderColor: "#249EBF",
            pointHoverBackgroundColor: "#909190",
            pointHoverRadius: 4,
            pointHitRadius: 10,
            pointRadius: 2,
            pointHoverBorderWidth: 1,
            fill: false,
            borderWidth: 1,
 /*            backgroundColor: this.gradient, */
            data: this.chartData.ausente,
          },
        ],
      },
      this.options
    );
    }
  }
};
</script>
