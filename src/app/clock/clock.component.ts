import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  private now = this.getNow();
  public options: any = {

    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false
    },

    credits: {
      enabled: false
    },

    title: {
      text: 'The Highcharts clock'
    },

    pane: {
      background: [{
        // default background
      }, {
        // reflex for supported browsers
        backgroundColor: Highcharts.SVGRenderer ? {
          radialGradient: {
            cx: 0.5,
            cy: -0.4,
            r: 1.9
          },
          stops: [
            [0.5, 'rgba(255, 255, 255, 0.2)'],
            [0.5, 'rgba(200, 200, 200, 0.2)']
          ]
        } : null
      }]
    },

    yAxis: {
      labels: {
        distance: -20
      },
      min: 0,
      max: 12,
      lineWidth: 0,
      showFirstLabel: false,

      minorTickInterval: 'auto',
      minorTickWidth: 1,
      minorTickLength: 5,
      minorTickPosition: 'inside',
      minorGridLineWidth: 0,
      minorTickColor: '#666',

      tickInterval: 1,
      tickWidth: 2,
      tickPosition: 'inside',
      tickLength: 10,
      tickColor: '#666',
      title: {
        text: 'Queue-it',
        style: {
          color: '#BBB',
          fontWeight: 'normal',
          fontSize: '8px',
          lineHeight: '10px'
        },
        y: 10
      }
    },

    tooltip: {
      formatter: function () {
        return this.series.chart.tooltipText;
      }
    },

    series: [{
      data: [{
        id: 'hour',
        y: this.now.hours,
        dial: {
          radius: '60%',
          baseWidth: 4,
          baseLength: '95%',
          rearLength: 0
        }
      }, {
        id: 'minute',
        y: this.now.minutes,
        dial: {
          baseLength: '95%',
          rearLength: 0
        }
      }, {
        id: 'second',
        y: this.now.seconds,
        dial: {
          radius: '100%',
          baseWidth: 1,
          rearLength: '20%'
        }
      }],
      animation: false,
      dataLabels: {
        enabled: false
      }
    }]
  }

  constructor() {

    Math.easeOutBounce = (pos) => {
      if ((pos) < (1 / 2.75)) {
        return (7.5625 * pos * pos);
      }
      if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
      }
      if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
      }
      return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
    };
  }

  ngOnInit(): void {

    Highcharts.chart('clock-container', this.options, (chart: any) => {
      setInterval(() => {

        let now = this.getNow();

        if (chart.axes) { // not destroyed
          let hour = chart.get('hour'),
            minute = chart.get('minute'),
            second = chart.get('second'),
            // run animation unless we're wrapping around from 59 to 0
            animation = now.seconds === 0 ?
              false : {
                easing: 'easeOutBounce'
              };

          // Cache the tooltip text
          chart.tooltipText =
            this.pad(Math.floor(now.hours), 2) + ':' +
            this.pad(Math.floor(now.minutes * 5), 2) + ':' +
            this.pad(now.seconds * 5, 2);


          hour.update(now.hours, true, animation);
          minute.update(now.minutes, true, animation);
          second.update(now.seconds, true, animation);
        }

      }, 1000);

    });
  }

  getNow() {
    let now = new Date();

    return {
      hours: now.getHours() + now.getMinutes() / 60,
      minutes: now.getMinutes() * 12 / 60 + now.getSeconds() * 12 / 3600,
      seconds: now.getSeconds() * 12 / 60
    };
  }

  pad(number, length) {
    // Create an array of the remaining length + 1 and join it with 0's
    return new Array((length || 2) + 1 - String(number).length).join('0') + number;
  }

}

declare global {
  interface Math {
    easeOutBounce(x: number): number;
  }
}
