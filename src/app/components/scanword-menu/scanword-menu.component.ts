import { Component, OnInit } from '@angular/core';
import { ScanwordHttpService } from 'src/app/services/http/scanword/scanword-http.service';
import { Scanword } from 'src/app/models/scanword';


@Component({
  selector: 'app-scanword-menu',
  templateUrl: './scanword-menu.component.html',
  styleUrls: ['./scanword-menu.component.css']
})
export class ScanwordMenuComponent implements OnInit {

  scanwords:Scanword[] = []
  constructor(private scanwordHttpService:ScanwordHttpService) { }

  ngOnInit(): void {
    this.scanwordHttpService.getAllScanword().subscribe(res => {
      this.scanwords = res
    })
  }
}
