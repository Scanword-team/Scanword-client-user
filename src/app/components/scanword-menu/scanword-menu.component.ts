import { Component, OnInit, Input } from '@angular/core';
import { ScanwordHttpService } from 'src/app/services/http/scanword/scanword-http.service';
import { Scanword } from 'src/app/models/scanword';


@Component({
  selector: 'app-scanword-menu',
  templateUrl: './scanword-menu.component.html',
  styleUrls: ['./scanword-menu.component.css']
})
export class ScanwordMenuComponent implements OnInit {

  scanwords:Scanword[] = []
  stats: string[] = []
  constructor(private scanwordHttpService:ScanwordHttpService) { }

  ngOnInit(): void {
    this.scanwordHttpService.getAllScanword().subscribe(res => {
        this.scanwords = res;
        for (let i = 0; i < res.length; i++) {
            this.scanwordHttpService.getStatsById(res[i].id).subscribe(r => {
                this.stats[i] = r.resolved.toString() + "/" + r.total.toString()
            })
        }
    })
  }
}
