import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export function ROIGraph() {      
    const data = {
        labels: [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
        datasets: [
            {
                label: 'Percentage',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                borderColor: 'rgba(255, 255, 255, 1)', // Set line color to white
                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Set fill color to semi-transparent white
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month',
                    color: 'white', // Set title color to white
                },
                ticks: {
                    color: 'white', // Set x-axis text color to white
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Percentage',
                    color: 'white', // Set title color to white
                },
                ticks: {
                    color: 'white', // Set y-axis text color to white
                    stepSize: 10, 
                },
                min: 0,
                max: 100,
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white', // Set legend text color to white
                },
            },
        },
    };

    return (
        <div className="min-h-[400px]">
            <Line data={data} options={options} />
        </div>
    );
}
