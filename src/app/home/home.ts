import { Component } from '@angular/core';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatGridListModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
