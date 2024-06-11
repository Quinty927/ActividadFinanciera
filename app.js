

new Vue({
    el: '#app',
    data: {
        newEntry: {
            type: 'ingreso',
            description: '',
            value: 0,
            category: ''
        },
        entries: [],
        chart: null,
    },
    computed: {
        totalIngresos() {
            return this.entries
                .filter(entry => entry.type === 'ingreso')
                .reduce((sum, entry) => sum + parseFloat(entry.value), 0);
        },
        totalEgresos() {
            return this.entries
                .filter(entry => entry.type === 'egreso')
                .reduce((sum, entry) => sum + parseFloat(entry.value), 0);
        },
        balance() {
            return this.totalIngresos - this.totalEgresos;
        }
    },
    methods: {
        addEntry() {
            if (this.newEntry.description && this.newEntry.value && this.newEntry.category) {
                this.entries.push({ ...this.newEntry, id: Date.now() });
                this.newEntry.description = '';
                this.newEntry.value = 0;
                this.newEntry.category = '';
                this.updateChart();
            }
        },
        updateChart() {
            const ctx = document.getElementById('chart').getContext('2d');
            const chartData = {
                labels: this.entries.map(entry => entry.description),
                datasets: [{
                    label: 'Egresos',
                    data: this.entries.map(entry => entry.type === 'egreso' ? entry.value : 0),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }, {
                    label: 'Ingresos',
                    data: this.entries.map(entry => entry.type === 'ingreso' ? entry.value : 0),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            };

            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    },
    mounted() {
        this.updateChart();
    }
});



