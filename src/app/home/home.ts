import { Component } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatGridList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
