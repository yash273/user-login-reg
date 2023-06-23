import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cData } from '../chartData';
import { ChartData } from 'src/app/interfaces/orgChart';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  id!: number;
  nodeData!: ChartData | null;

  constructor(
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {

    this.route.params.subscribe((res) => {
      this.id = parseInt(res['id'], 10);
      this.nodeData = this.findNodeDataById(cData, this.id);
    });
  }

  findNodeDataById(data: ChartData, id: number): ChartData | null {
    if (data.id === id) {
      return data;
    } else if (data.children) {
      for (const child of data.children) {
        const nodeData = this.findNodeDataById(child, id);
        if (nodeData) {
          return nodeData;
        }
      }
    }
    return null;
  }

}
