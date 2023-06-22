import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { chartData } from '../chartData';
import { ChartData } from 'src/app/interfaces/orgChart';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {


  constructor(
    private router: Router,


  ) {

  }

  @ViewChild('chartContainer', { static: true }) chartContainer: any

  ngOnInit() {

    this.displayChart()
  }

  displayChart() {
    const container = this.chartContainer?.nativeElement;
    const self = this;

    if (container) {
      // Create an SVG element within the container
      const svg = d3.select(container)
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
      // .style('margin-left', 100)

      // Set the width and height of the chart
      const width = container.offsetWidth - 200;
      const height = container.offsetHeight;

      // Define the tree layout
      const treeLayout = d3.tree<ChartData>().size([height, width]);

      const root = d3.hierarchy(chartData);
      root.each((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      // Create the hierarchy from the chart data
      const nodes = d3.hierarchy(chartData);

      // Generate the tree layout
      const treeData = treeLayout(nodes);

      // Generate the links between nodes
      const links = treeData.links();

      // Generate the descendants of the tree
      const descendants = treeData.descendants();

      // Create the links between nodes using SVG paths
      const link = svg.selectAll('.link')
        .data(links)
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', d => {
          return diagonal(d)
        });

      // Create the nodes as circles and add text labels
      const node = svg.selectAll('.node')
        .data(descendants)

      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', (d: any) => `translate(${d.y},${d.x})`);

      nodeEnter.append('rect')
        .on('click', aboutNode)
        .attr('x', -50)
        .attr('y', -50)
        .classed('custom-node', true)

      nodeEnter.append('text')
        .attr('y', -25)
        .attr('x', -30)
        .text((d: any) => `Name: ${d.data.name}`);

      nodeEnter.append('text')
        .attr('y', 0)
        .attr('x', -30)
        .text((d: any) => `Designation: ${d.data.designation}`);

      nodeEnter.append('text')
        .attr('y', 25)
        .attr('x', -30)
        .text((d: any) => d.data.experience ? `Experience: ${d.data.experience} years` : 'Experience: Not Given');

      nodeEnter.append('text')
        .attr('y', 50)
        .attr('x', -30)
        .text((d: any) => `Technology: ${d.data.tech} `);

      nodeEnter.filter((d: any) => d.children)
        .append('circle')
        .attr('class', 'expand-button')
        .attr('r', 10)
        .attr('cx', 150)
        .attr('cy', 0)
        .style('cursor', 'pointer')
        .on('click', toggleCollapse);

      function aboutNode(event: any, d: any) {
        self.router.navigate(['/chart/about', d.data.id]);
      }

      function toggleCollapse(d: any) {
        if (d.children) {
          // Node is expanded, so collapse it
          d._children = d.children;
          d.children = null;
        } else {
          // Node is collapsed, so expand it
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }


      function update(source: any) {
        node
          .selectAll('.expand-button')
          .style('display', (d: any) => (d.children ? 'block' : 'none'));
      }
      // function update(source: any) {
      //   const link = svg.selectAll('.link')
      //     .data(links);

      //   link.enter()
      //     .append('path')
      //     .attr('class', 'link')
      //     .join<SVGPathElement>('path')
      //     .attr('d', (d: any) => diagonal(d));

      //   link.exit().remove();

      //   const node = svg.selectAll('.node')
      //     .data(descendants, (d: any) => d.data.id);

      //   const nodeEnter = node.enter().append('g')
      //     .attr('class', 'node')
      //     .attr('transform', (d: any) => `translate(${source.y0},${source.x0})`);

      //   nodeEnter.append('rect')
      //     .on('click', aboutNode)
      //     .attr('x', -50)
      //     .attr('y', -25)
      //     .classed('custom-node', true);

      //   nodeEnter.append('text')
      //     .attr('y', '0')
      //     .attr('x', -30)
      //     .text((d: any) => `Name: ${d.data.name}`);

      //   nodeEnter.append('text')
      //     .attr('y', '1.5em')
      //     .attr('x', -30)
      //     .text((d: any) => `Designation: ${d.data.designation}`);

      //   nodeEnter.append('text')
      //     .attr('y', '3em')
      //     .attr('x', -30)
      //     .text((d: any) => d.data.experience ? `Experience: ${d.data.experience} years` : 'Experience: Not Given');

      //   nodeEnter.append('text')
      //     .attr('y', '4.5em')
      //     .attr('x', -30)
      //     .text((d: any) => `Technology: ${d.data.tech}`);

      //   nodeEnter.filter((d: any) => d.children || d._children)
      //     .append('circle')
      //     .attr('class', 'expand-button')
      //     .attr('r', 10)
      //     .attr('cx', 150)
      //     .attr('cy', 25)
      //     .style('cursor', 'pointer')
      //     .on('click', toggleCollapse);

      //   const nodeMerge = node.merge(node);

      //   nodeMerge
      //     .transition()
      //     .duration(500)
      //     .attr('transform', (d: any) => `translate(${d.y},${d.x})`);

      //   node.exit().remove();
      // }


      function diagonal(s: any) {
        return `M ${s.source.y} ${s.source.x} 
              C ${(s.source.y + s.target.y) / 2} ${s.source.x},
                ${(s.source.y + s.target.y) / 2} ${s.target.x},
                ${s.target.y} ${s.target.x}`;
      }
    }
  }

}


