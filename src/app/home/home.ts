import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";
import { Sidenav } from "../components/sidenav/sidenav";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatGridListModule, MatCardModule, MatButtonModule, Header, Footer, Sidenav],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
