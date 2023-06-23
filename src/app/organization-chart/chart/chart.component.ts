import { Component, OnInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import { cData } from '../chartData';
import { ChartData } from 'src/app/interfaces/orgChart';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  root: any;
  tree: any;
  treeLayout: any;
  svg: any;
  treeData: any;
  height!: number;
  width!: number;
  margin: any = { top: 200, bottom: 90, left: 100, right: 90 };
  duration: number = 1000;
  nodeWidth: number = 5;
  nodeHeight: number = 5;
  nodeRadius: number = 5;
  horizontalSeparationBetweenNodes: number = 7;
  verticalSeparationBetweenNodes: number = 5;
  nodes!: any[];
  links: any;
  initialY!: number;
  initialX!: number;


  constructor(
    private router: Router,
  ) {

  }

  @ViewChild('chartContainer', { static: true }) chartContainer: any

  ngOnInit() {
    this.renderTreeChart()
  }

  renderTreeChart() {

    let element: any = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    if (element.offsetHeight > 500) {
      this.height = element.offsetHeight;
    } else {
      this.height = 500;
    }

    this.initialX = this.width / 2;
    this.initialY = this.height / 2;

    this.svg = d3.select(element).append('svg')
      .append("g")
      .attr('transform', 'translate(' + this.margin.left + ',' + 1000 + ')');

    this.tree = d3.tree()
      .size([this.height / 2, this.width / 2])
      .nodeSize([this.nodeWidth + this.horizontalSeparationBetweenNodes, this.nodeHeight + this.verticalSeparationBetweenNodes])
      .separation((a, b) => { return a.parent == b.parent ? 15 : 20 });

    // Assigns parent, children, height, depth
    this.root = d3.hierarchy(cData, (d) => { return d.children; });
    this.root.x0 = this.height;
    this.root.y0 = 10;

    this.updateChart(this.root);

  }

  click = (e: any, d: any) => {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.updateChart(d);
  }

  aboutNode = (event: any, d: any) => {
    this.router.navigate(['/chart/about', d.data.id]);
  }

  updateChart(source: any) {
    let i = 0;
    this.treeData = this.tree(this.root);
    this.nodes = this.treeData.descendants();
    this.links = this.treeData.descendants().slice(1);
    this.nodes.forEach((d) => { d.y = d.depth * 300 });

    let node = this.svg.selectAll('g.node')
      .data(this.nodes, (d: any) => { return d.id || (d.id = ++i); });

    let nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr('transform', (d: any) => {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
      })

    nodeEnter.append('rect')
      .on('click', this.aboutNode)
      .style('cursor', 'pointer')
      .attr('class', 'node')
      .attr('x', -50)
      .attr('y', -40)

    nodeEnter.append('text')
      .attr('y', -10)
      .attr('x', -20)
      .text((d: any) => `Name: ${d.data.name}`);

    nodeEnter.append('text')
      .attr('y', 20)
      .attr('x', -20)
      .text((d: any) => `${d.data.designation}`);

    nodeEnter.filter((d: any) => d.children || d._children)
      .append('circle')
      .attr('class', 'expand-button')
      .attr('r', 12)
      .attr('cx', 150)
      .attr('cy', 0)
      .style('cursor', 'pointer')
      .on('click', this.click);

    nodeEnter.filter((d: any) => d.children || d._children)
      .append('text')
      .attr('class', 'add')
      .attr('y', 5)
      .attr('x', 143)
      .text((d: any) => '➤')
      .style('cursor', 'pointer')
      .on('click', this.click);

    let nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
      .duration(this.duration)
      .attr('transform', (d: any) => {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    const nodeExit = node.exit().transition()
      .duration(this.duration)
      .attr('transform', (d: any) => {
        return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

    const link = this.svg.selectAll('path.link')
      .data(this.links, (d: any) => { return d.id; });

    let linkEnter = link.enter().insert('path', 'g')
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', '#3F51B5')
      .style('stroke-width', '3px')
      .attr('d', function (d: any) {
        let o = { x: source.x0, y: source.y0 };
        return diagonal(o, o);
      });

    let linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
      .duration(this.duration)
      .attr('d', (d: any) => { return diagonal(d, d.parent); });

    let linkExit = link.exit().transition()
      .duration(this.duration)
      .attr('d', function (d: any) {
        let o = { x: source.x, y: source.y };
        return diagonal(o, o);
      })
      .remove();

    this.nodes.forEach((d) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    function diagonal(s: any, d: any) {
      if (s.children && s.children.length > 1) {
        const childNode = s.children.find((child: any) => child.data.id === d.data.id);
        if (childNode) {
          let path = `M ${s.y} ${s.x}
                  L ${childNode.y} ${childNode.x}`;
          return path;
        }
      }
      let path = `M ${s.y} ${s.x}
               L ${s.y} ${d.x}
              L ${d.y} ${d.x}`
      return path;
    }
  }


}


